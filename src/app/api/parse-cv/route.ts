import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      const data = await pdfParse(buffer);
      extractedText = data.text;
    } else {
      // Fallback for plain text files
      extractedText = buffer.toString("utf-8");
    }

    return NextResponse.json({ success: true, text: extractedText });
  } catch (error: any) {
    console.error("Failed to parse file:", error);
    return NextResponse.json(
      { error: "Failed to read document text. Please try pasting it manually." },
      { status: 500 }
    );
  }
}
