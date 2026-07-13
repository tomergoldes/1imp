import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVideoReadyEmail } from "@/lib/email-service";

/**
 * Constant-time-ish comparison to avoid trivial token length/short-circuit leaks.
 */
function tokensMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function POST(req: Request) {
  try {
    // Authenticate the webhook via the shared secret token in the callback URL.
    const expectedToken = process.env.SHOTSTACK_WEBHOOK_SECRET;
    if (!expectedToken) {
      console.error("[Shotstack Webhook] SHOTSTACK_WEBHOOK_SECRET is not configured; rejecting.");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const providedToken = new URL(req.url).searchParams.get("token") || "";
    if (!tokensMatch(providedToken, expectedToken)) {
      console.warn("[Shotstack Webhook] Rejected webhook with invalid token.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id: renderJobId, status, url, error } = body;

    if (!renderJobId) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    const project = await prisma.videoProject.findFirst({
      where: { renderJobId },
    });

    if (!project) {
      console.warn(`[Shotstack Webhook] Render Job ID ${renderJobId} not found in database.`);
      return NextResponse.json({ success: true }); // Return 200 so they stop retrying
    }

    // Idempotency: only act while the project is still RENDERING. Repeated webhook
    // deliveries (Shotstack retries) will no-op once we've transitioned state.
    if (project.status !== "RENDERING") {
      console.log(
        `[Shotstack Webhook] Project ${project.id} already in state ${project.status}; ignoring duplicate.`
      );
      return NextResponse.json({ success: true });
    }

    if (status === "done") {
      // Guard the transition atomically: updateMany with the RENDERING precondition
      // ensures only one concurrent webhook wins the completion.
      const transition = await prisma.videoProject.updateMany({
        where: { id: project.id, status: "RENDERING" },
        data: { status: "COMPLETED", videoUrl: url },
      });

      if (transition.count === 0) {
        return NextResponse.json({ success: true });
      }

      const updatedProject = await prisma.videoProject.findUnique({
        where: { id: project.id },
        include: { user: true },
      });

      console.log(`[Shotstack Webhook] Project ${project.id} completed successfully.`);

      if (updatedProject?.user?.email) {
        const videoLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://1imp.com"}/dashboard`;
        await sendVideoReadyEmail(
          updatedProject.user.email,
          updatedProject.user.name || "Candidate",
          videoLink
        );
      }
    } else if (status === "failed") {
      // Atomically transition RENDERING -> ERROR. Only the winning update refunds,
      // so repeated "failed" deliveries cannot mint unlimited credits.
      const transition = await prisma.videoProject.updateMany({
        where: { id: project.id, status: "RENDERING" },
        data: { status: "ERROR" },
      });

      if (transition.count === 0) {
        return NextResponse.json({ success: true });
      }

      console.error(
        `[Shotstack Webhook] Project ${project.id} failed to render. Error: ${error}`
      );

      // Refund the single credit consumed for this render.
      await prisma.user.update({
        where: { id: project.userId },
        data: { credits: { increment: 1 } },
      });
      console.log(
        `[Shotstack Webhook] Refunded 1 credit to user ${project.userId} due to render failure.`
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Shotstack Webhook] Processing error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
