import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Helper to secure the route
async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any)?.isAdmin === true;
}

export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const prompts = await prisma.systemPrompt.findMany({
      orderBy: { id: "asc" }
    });
    return NextResponse.json({ success: true, prompts });
  } catch (error: any) {
    console.error("[Prompts API] GET error:", error);
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, content, name } = await req.json();

    if (!id || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = await prisma.systemPrompt.upsert({
      where: { id },
      update: { content, name },
      create: { id, content, name }
    });

    return NextResponse.json({ success: true, prompt });
  } catch (error: any) {
    console.error("[Prompts API] PUT error:", error);
    return NextResponse.json({ error: "Failed to update prompt" }, { status: 500 });
  }
}
