import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all config pairs
export async function GET() {
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
  try {
    const body = await req.json();
    const { key, value, description } = body;

    if (!key || typeof value !== 'string') {
      return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
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
