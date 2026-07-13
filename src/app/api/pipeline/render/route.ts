import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { renderVideoPhase } from "@/lib/engines/video-pipeline";
import { prisma } from "@/lib/prisma";

// Rendering chains several external APIs; give it the maximum serverless budget.
// NOTE: this is a stopgap. Rendering should be moved to a durable background job.
export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { videoProjectId } = await req.json();

    if (!videoProjectId || typeof videoProjectId !== "string") {
      return NextResponse.json(
        { error: "Missing videoProjectId" },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;

    // Ownership check: project must belong to the current user
    const project = await prisma.videoProject.findUnique({
      where: { id: videoProjectId },
      select: { id: true, userId: true, status: true },
    });

    if (!project || project.userId !== userId) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    // Guard against duplicate/concurrent renders of the same project.
    if (project.status === "RENDERING" || project.status === "COMPLETED") {
      return NextResponse.json(
        { error: "This video is already rendering or completed." },
        { status: 409 }
      );
    }

    // Atomically reserve one credit. updateMany with a conditional WHERE ensures
    // two concurrent requests can never both pass the credit check.
    const reservation = await prisma.user.updateMany({
      where: { id: userId, credits: { gte: 1 } },
      data: { credits: { decrement: 1 } },
    });

    if (reservation.count === 0) {
      return NextResponse.json(
        { error: "INSUFFICIENT_CREDITS" },
        { status: 402 } // 402 Payment Required
      );
    }

    try {
      // Run the Video Render pipeline phase
      const result = await renderVideoPhase(videoProjectId);

      return NextResponse.json({
        success: true,
        renderJobId: result.renderJobId,
      });
    } catch (renderError) {
      // Refund the reserved credit if the render failed to start.
      await prisma.user.update({
        where: { id: userId },
        data: { credits: { increment: 1 } },
      });
      throw renderError;
    }
  } catch (error: any) {
    console.error("[Render Video API] Error:", error);
    return NextResponse.json(
      { error: "Failed to start video render" },
      { status: 500 }
    );
  }
}
