import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generateStoryPhase } from "@/lib/engines/video-pipeline";

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

    const { cvText, answers, photoUrl, tone, ninjaColor, targetRole, targetIndustry } = await req.json();

    if (!cvText || typeof cvText !== "string" || cvText.trim() === "") {
      return NextResponse.json(
        { error: "Please provide your CV/resume text." },
        { status: 400 }
      );
    }

    // Run the Story Generation pipeline phase
    const result = await generateStoryPhase({
      userId,
      cvText,
      answers: answers || {},
      photoUrl: photoUrl || null,
      tone: tone || "Professional",
      ninjaColor: ninjaColor || "#6361B8",
      targetRole: targetRole || null,
      targetIndustry: targetIndustry || null,
      jobDescription: null
    });

    return NextResponse.json({
      success: true,
      candidateProfileId: result.candidateProfile.id,
      videoProjectId: result.videoProject.id,
      storyProfile: result.candidateProfile.storyProfile,
      highlights: result.candidateProfile.highlights,
      script: result.videoProject.script,
      storyboard: result.videoProject.storyboard
    });
  } catch (error: any) {
    console.error("[Generate Story API] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate story. Please try again." },
      { status: 500 }
    );
  }
}
