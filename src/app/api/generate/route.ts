import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const MAX_PROMPT_LENGTH = 8000;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await req.json();

    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return Response.json({ error: "A non-empty prompt is required" }, { status: 400 });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return Response.json({ error: "Prompt is too long" }, { status: 400 });
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are an expert career coach and resume writer. Rewrite the user's experience into a compelling 3-4 sentence professional summary. Do not use buzzwords. Be concrete, punchy, and highlight their impact. Write in the first person.",
      prompt: prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return Response.json({ error: "Failed to generate impression" }, { status: 500 });
  }
}
