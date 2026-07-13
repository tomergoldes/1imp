import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const SLUG_REGEX = /^[a-z0-9-]{3,40}$/;

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const slug = (new URL(req.url).searchParams.get("slug") || "").toLowerCase();

  if (!SLUG_REGEX.test(slug)) {
    return NextResponse.json({ status: "invalid" });
  }

  try {
    const existing = await prisma.candidateProfile.findUnique({
      where: { slug },
      select: { userId: true },
    });
    const available = !existing || existing.userId === userId;
    return NextResponse.json({ status: available ? "available" : "taken" });
  } catch (error) {
    console.error("[Slug Check API] Error:", error);
    return NextResponse.json({ error: "Failed to check" }, { status: 500 });
  }
}
