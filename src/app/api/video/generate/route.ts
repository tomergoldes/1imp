import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generateFreeVideoWorkflow } from "@/lib/video-service";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
    }

    const { cvText, answers, photoBase64, style } = await req.json();

    if (!cvText || typeof cvText !== "string" || cvText.trim() === "") {
      return NextResponse.json(
        { error: "Please provide your CV/resume text." },
        { status: 400 }
      );
    }
    
    if (!photoBase64) {
      return NextResponse.json(
        { error: "Please upload your photo to animate." },
        { status: 400 }
      );
    }

    // Kick off the async video generation workflow
    // This creates a PENDING video in the DB, sends to HeyGen, and returns immediately.
    // The HeyGen webhook will update the video status when rendering is complete.
    const video = await generateFreeVideoWorkflow(userId, cvText.trim(), answers, photoBase64, style);

    return NextResponse.json({
      success: true,
      videoId: video.id,
      status: video.status,
      message: "Your video is being generated. You'll receive an email when it's ready (usually 2-3 minutes).",
    });
  } catch (error: any) {
    console.error("[Video Generate API] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to start video generation" },
      { status: 500 }
    );
  }
}
