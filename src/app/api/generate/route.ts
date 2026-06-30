import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: "You are an expert career coach and resume writer. Rewrite the user's experience into a compelling 3-4 sentence professional summary. Do not use buzzwords. Be concrete, punchy, and highlight their impact. Write in the first person.",
      prompt: prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return Response.json({ error: "Failed to generate impression" }, { status: 500 });
  }
}
