import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { renderVideoPhase } from "@/lib/engines/video-pipeline";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { videoProjectId } = await req.json();

    if (!videoProjectId) {
      return NextResponse.json(
        { error: "Missing videoProjectId" },
        { status: 400 }
      );
    }

    // Check user credits
    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.credits < 1) {
      return NextResponse.json(
        { error: "INSUFFICIENT_CREDITS" },
        { status: 402 } // 402 Payment Required
      );
    }

    // Run the Video Render pipeline phase
    const result = await renderVideoPhase(videoProjectId);

    // Deduct 1 credit
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: user.credits - 1 }
    });

    return NextResponse.json({
      success: true,
      renderJobId: result.renderJobId
    });
  } catch (error: any) {
    console.error("[Render Video API] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to start video render" },
      { status: 500 }
    );
  }
}
