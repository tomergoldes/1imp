"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function generateAIScript(profileData: { fullName: string; title: string; summary?: string | null }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  const prompt = `
    You are an expert scriptwriter for professional introduction videos.
    Write a 30-second video script for ${profileData.fullName}, whose title is "${profileData.title}".
    ${profileData.summary ? `Additional info: ${profileData.summary}` : ""}
    
    The script should be professional, energetic, and engaging.
    It should start with a strong hook, introduce who they are, their core value, and end with a call to action.
    Make it sound natural for spoken dialogue.
    Do not include stage directions, just the spoken text.
  `;

  let scriptText = "";

  try {
    // Attempt real OpenAI generation
    if (process.env.OPENAI_API_KEY) {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        prompt,
      });
      scriptText = text;
    } else {
      // Fallback to Mock
      throw new Error("No OpenAI API key");
    }
  } catch (error) {
    console.log("Falling back to mock script generation:", error);
    // 3-second delay to simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 3000));
    scriptText = `Hi, I'm ${profileData.fullName}, a ${profileData.title}. \n\nI specialize in bringing ideas to life and solving complex problems. Over the years, I've developed a deep passion for creating impact and delivering excellence.\n\nLet's connect and see how we can build something amazing together!`;
  }

  return { success: true, script: scriptText };
}

export async function renderVideo(script: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  // Create PENDING video record
  const video = await prisma.video.create({
    data: {
      userId: (session.user as any).id,
      videoUrl: "", // Will be updated when complete
      script,
      status: "PENDING",
      style: "professional"
    }
  });

  // Trigger background rendering process
  // In a real app, this would push to a queue (e.g. Inngest / SQS) which calls HeyGen
  // Here, we simulate a webhook completing the rendering after 8 seconds
  setTimeout(async () => {
    try {
      await prisma.video.update({
        where: { id: video.id },
        data: {
          status: "COMPLETED",
          // Mock avatar video for demonstration
          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        }
      });
      console.log(`Video ${video.id} completed rendering.`);
    } catch (e) {
      console.error("Failed to update video completion", e);
    }
  }, 8000);

  return { success: true, videoId: video.id };
}
