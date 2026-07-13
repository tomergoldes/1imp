import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any)?.isAdmin === true;
}

// GET all config pairs
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const configs = await prisma.systemConfig.findMany();
    return NextResponse.json(configs);
  } catch (error) {
    console.error("Error fetching configs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST or update a config pair
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { key, value, description } = body;

    if (typeof key !== "string" || key.trim().length === 0 || typeof value !== "string") {
      return NextResponse.json({ error: "Missing or invalid key/value" }, { status: 400 });
    }

    if (key.length > 200 || value.length > 20000) {
      return NextResponse.json({ error: "Key or value too long" }, { status: 400 });
    }

    const config = await prisma.systemConfig.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error("Error updating config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
