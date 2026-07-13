import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVideoReadyEmail } from "@/lib/email-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Shotstack sends standard webhook payloads.
    // Example: { id: "abcd-1234", status: "done", url: "https://...", error: null }
    // However, our callback URL doesn't inherently know WHICH videoProjectId this belongs to
    // unless we look it up by the renderJobId in our database.

    const { id: renderJobId, status, url, error } = body;

    if (!renderJobId) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    // Find the corresponding VideoProject
    const project = await prisma.videoProject.findFirst({
      where: { renderJobId }
    });

    if (!project) {
      console.warn(`[Shotstack Webhook] Render Job ID ${renderJobId} not found in database.`);
      return NextResponse.json({ success: true }); // Return 200 so they stop retrying
    }

    if (status === "done") {
      const updatedProject = await prisma.videoProject.update({
        where: { id: project.id },
        data: {
          status: "COMPLETED",
          videoUrl: url
        },
        include: { user: true }
      });
      console.log(`[Shotstack Webhook] Project ${project.id} completed successfully.`);
      
      // Send email notification
      if (updatedProject.user?.email) {
        const videoLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://1imp.com'}/dashboard`;
        await sendVideoReadyEmail(updatedProject.user.email, updatedProject.user.name || "Candidate", videoLink);
      }
      
    } else if (status === "failed") {
      const updatedProject = await prisma.videoProject.update({
        where: { id: project.id },
        data: {
          status: "ERROR"
        },
        include: { user: true }
      });
      console.error(`[Shotstack Webhook] Project ${project.id} failed to render. Error: ${error}`);
      
      // Auto-refund credit if they paid for it (assuming 1 credit per render)
      if (updatedProject.user) {
        await prisma.user.update({
          where: { id: updatedProject.userId },
          data: { credits: { increment: 1 } }
        });
        console.log(`[Shotstack Webhook] Refunded 1 credit to user ${updatedProject.userId} due to render failure.`);
      }
      
    } else {
      // Still rendering or queued, usually webhooks are only sent on completion/failure
      // but if we receive an intermediate state, just ignore it.
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Shotstack Webhook] Processing error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
