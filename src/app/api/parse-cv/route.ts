import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_EXTRACTED_CHARS = 100_000;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "application/octet-stream", // some browsers send this for .txt
]);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty" }, { status: 400 });
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 10 MB." },
        { status: 413 }
      );
    }

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isText =
      file.type.startsWith("text/") ||
      file.name.toLowerCase().endsWith(".txt") ||
      ALLOWED_TYPES.has(file.type);

    if (!isPdf && !isText) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or plain text file." },
        { status: 415 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    if (isPdf) {
      const parser = new PDFParse({ data: buffer });
      try {
        const result = await parser.getText();
        extractedText = result.text;
      } finally {
        await parser.destroy();
      }
    } else {
      extractedText = buffer.toString("utf-8");
    }

    extractedText = extractedText.slice(0, MAX_EXTRACTED_CHARS);

    return NextResponse.json({ success: true, text: extractedText });
  } catch (error: any) {
    console.error("Failed to parse file:", error);
    return NextResponse.json(
      { error: "Failed to read document text. Please try pasting it manually." },
      { status: 500 }
    );
  }
}
