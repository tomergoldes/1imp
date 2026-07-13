import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { checkRenderStatus } from "@/lib/integrations/shotstack-client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { id: videoProjectId } = await params;
    const project = await prisma.videoProject.findUnique({
      where: { id: videoProjectId },
      select: { id: true, userId: true, status: true, renderJobId: true, videoUrl: true }
    });

    if (!project || project.userId !== userId) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    // If it's still rendering and we have a job ID, we can optionally poll Shotstack
    if (project.status === "RENDERING" && project.renderJobId && !project.renderJobId.startsWith("mock-")) {
      const renderStatus = await checkRenderStatus(project.renderJobId);
      
      if (renderStatus.status === "done" && renderStatus.url) {
        await prisma.videoProject.update({
          where: { id: project.id },
          data: { status: "COMPLETED", videoUrl: renderStatus.url }
        });
        project.status = "COMPLETED";
        project.videoUrl = renderStatus.url;
      } else if (renderStatus.status === "failed") {
        await prisma.videoProject.update({
          where: { id: project.id },
          data: { status: "ERROR" }
        });
        project.status = "ERROR";
      }
    }

    return NextResponse.json({
      id: project.id,
      status: project.status,
      videoUrl: project.videoUrl
    });
  } catch (error: any) {
    console.error("[Pipeline Status API] Error:", error);
    return NextResponse.json(
      { error: "Failed to get status" },
      { status: 500 }
    );
  }
}
