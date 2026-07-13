import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { parseCV } from "@/lib/engines/cv-parser";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cvText } = await req.json();

    if (!cvText || typeof cvText !== "string" || cvText.trim() === "") {
      return NextResponse.json(
        { error: "Please provide your CV/resume text." },
        { status: 400 }
      );
    }

    // Call the engine to extract structured data
    const parsedResume = await parseCV(cvText.trim());

    return NextResponse.json({
      success: true,
      parsedResume
    });
  } catch (error: any) {
    console.error("[Parse CV API] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse CV" },
      { status: 500 }
    );
  }
}
