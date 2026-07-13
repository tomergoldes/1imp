import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const SLUG_REGEX = /^[a-z0-9-]{3,40}$/;
const MAX_NAME_LENGTH = 100;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });

    const latestProfile = await prisma.candidateProfile.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { slug: true, isPublic: true },
    });

    return NextResponse.json({
      name: user?.name || "",
      email: user?.email || "",
      slug: latestProfile?.slug || null,
      isPublic: latestProfile?.isPublic ?? false,
    });
  } catch (error) {
    console.error("[Profile API] GET error:", error);
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  try {
    const body = await req.json();
    const { name, slug, isPublic } = body;

    if (name != null) {
      if (typeof name !== "string" || name.trim().length === 0 || name.length > MAX_NAME_LENGTH) {
        return NextResponse.json({ error: "Invalid name" }, { status: 400 });
      }
      await prisma.user.update({ where: { id: userId }, data: { name: name.trim() } });
    }

    if (slug != null || isPublic != null) {
      const latestProfile = await prisma.candidateProfile.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: { id: true },
      });

      if (!latestProfile) {
        return NextResponse.json(
          { error: "Create a video profile before setting a public URL." },
          { status: 400 }
        );
      }

      if (slug != null) {
        const normalized = String(slug).toLowerCase();
        if (!SLUG_REGEX.test(normalized)) {
          return NextResponse.json(
            { error: "URL must be 3-40 characters: lowercase letters, numbers, or hyphens." },
            { status: 400 }
          );
        }
        const existing = await prisma.candidateProfile.findUnique({ where: { slug: normalized } });
        if (existing && existing.id !== latestProfile.id) {
          return NextResponse.json({ error: "This URL is already taken." }, { status: 409 });
        }
        await prisma.candidateProfile.update({
          where: { id: latestProfile.id },
          data: { slug: normalized },
        });
      }

      if (isPublic != null) {
        await prisma.candidateProfile.update({
          where: { id: latestProfile.id },
          data: { isPublic: Boolean(isPublic) },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Profile API] PATCH error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
