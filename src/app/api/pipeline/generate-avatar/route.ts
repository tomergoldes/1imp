import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { generateNinjaAvatar } from "@/lib/integrations/fal-client";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { candidateProfileId, photoUrl, preferences } = await req.json();

    if (!candidateProfileId || !photoUrl) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Ownership check: the profile must belong to the current user
    const profile = await prisma.candidateProfile.findUnique({
      where: { id: candidateProfileId },
      select: { userId: true },
    });

    if (!profile || profile.userId !== userId) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    // Call fal.ai to generate the avatar
    const avatarData = await generateNinjaAvatar(photoUrl, preferences || {
      gender: "neutral",
      glasses: false,
      ninjaColor: "#6361B8"
    });

    // Save to profile
    await prisma.candidateProfile.update({
      where: { id: candidateProfileId },
      data: { 
        avatarUrl: avatarData.imageUrl,
        avatarSeed: avatarData.seed 
      }
    });

    return NextResponse.json({
      success: true,
      avatarUrl: avatarData.imageUrl
    });
  } catch (error: any) {
    console.error("[Generate Avatar API] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate avatar" },
      { status: 500 }
    );
  }
}
