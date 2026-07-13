import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { prisma } from "@/lib/prisma";
import { sendVideoReadyEmail } from "./email-service";
import { generateStoryPhase } from "./engines/video-pipeline";
/**
 * Generate a script using the new Master Prompt
 */
export async function generateScriptFromContext(cvText: string, answers: any, style: string): Promise<string> {
  const systemPrompt = `You are an elite, highly professional scriptwriter for AI-generated video introductions.
Your task is to take the user's CV, their goals, target audience, and preferred tone, and craft a phenomenal 30-45 second video script.
This script will be spoken by an AI avatar.

INSTRUCTIONS:
1. Identify the most impressive and relevant achievements from the CV (e.g., metrics, prestigious companies, major skills).
2. Align the message with the user's Goal: "${answers.goal || 'General introduction'}"
3. Speak directly to the Target Audience: "${answers.audience || 'Professionals'}"
4. Adopt the exact Tone requested: "${answers.tone || 'Professional & Formal'}"
5. The Visual Style chosen is: "${style || 'Modern'}". Reflect this vibe if possible.
6. Make it punchy, engaging, and "WOW" the listener from the first second. 
7. DO NOT include camera directions or action notes—ONLY the exact words the avatar should speak.
`;

  const { text } = await generateText({
    model: openai("gpt-4o"), // Using a highly capable model for the Master Prompt
    system: systemPrompt,
    prompt: `Here is the user's CV/Resume text:\n\n${cvText}\n\nCraft the master script now!`,
  });
  
  return text;
}

/**
 * Upload Base64 Photo to HeyGen Talking Photo API
 */
export async function uploadPhotoToHeyGen(photoBase64: string): Promise<string | null> {
  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) return null;

  try {
    const formData = new FormData();
    const blob = await fetch(photoBase64).then(r => r.blob());
    formData.append("file", blob, "photo.jpg");
    formData.append("background_is_off", "false");

    const uploadRes = await fetch("https://api.heygen.com/v1/talking_photo", {
      method: "POST",
      headers: { "x-api-key": apiKey },
      body: formData
    });
    
    if (uploadRes.ok) {
       const data = await uploadRes.json();
       if (data.code === 100 && data.data?.talking_photo_id) {
          console.log("Successfully uploaded talking photo to HeyGen:", data.data.talking_photo_id);
          return data.data.talking_photo_id;
       }
    }
    const err = await uploadRes.text();
    console.warn("HeyGen talking_photo upload failed, falling back to standard avatar:", err);
    return null;
  } catch (e) {
    console.error("Failed to upload photo to HeyGen:", e);
    return null;
  }
}

/**
 * Dispatch video generation to HeyGen API.
 */
export async function dispatchHeyGenVideo(script: string, videoId: string, talkingPhotoId: string | null): Promise<string> {
  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) throw new Error("Missing HEYGEN_API_KEY");

  const voiceConfig = await prisma.systemConfig.findUnique({ where: { key: "HEYGEN_VOICE_ID" }});
  const voiceId = voiceConfig?.value || "1bd001e7e50f421d891986aad5158bc8";

  // If we successfully uploaded a talking photo, use it. Otherwise fallback to standard avatar.
  const characterPayload = talkingPhotoId ? {
    type: "talking_photo",
    talking_photo_id: talkingPhotoId
  } : {
    type: "avatar",
    avatar_id: "Anna_public_3_20240108",
    avatar_style: "normal"
  };

  const res = await fetch("https://api.heygen.com/v2/video/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey
    },
    body: JSON.stringify({
      video_inputs: [
        {
          character: characterPayload,
          voice: {
            type: "text",
            input_text: script,
            voice_id: voiceId
          }
        }
      ],
      dimension: {
        width: 1280,
        height: 720
      },
      callback_id: videoId 
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("HeyGen API Error:", errText);
    throw new Error(`HeyGen API failed: ${res.status}`);
  }

  const data = await res.json();
  if (data.code !== 100) {
    throw new Error(`HeyGen API error: ${data.message}`);
  }

  return data.data.video_id;
}

/**
 * Workflow to generate the free watermarked video
 */
export async function generateFreeVideoWorkflow(userId: string, cvText: string, answers: any, photoBase64: string, style: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    // 1. Generate Script using Master Prompt
    const script = await generateScriptFromContext(cvText, answers, style);
    
    // 2. Upload photo to HeyGen
    const talkingPhotoId = await uploadPhotoToHeyGen(photoBase64);

    // 3. Create Video Record in DB as PENDING
    const video = await prisma.video.create({
      data: {
        userId,
        script,
        status: "PENDING",
        hasWatermark: true,
        isDownloadable: false,
      }
    });

    // 4. Dispatch to HeyGen
    let heygenVideoId = `mock-heygen-id-${Date.now()}`;
    try {
      heygenVideoId = await dispatchHeyGenVideo(script, video.id, talkingPhotoId);
    } catch (err) {
      console.warn("HeyGen API call failed (using mock ID for local testing):", err);
    }

    // 5. Update DB with HeyGen ID
    await prisma.video.update({
      where: { id: video.id },
      data: { heygenId: heygenVideoId }
    });

    if (process.env.NODE_ENV === "development") {
      if (process.env.HEYGEN_API_KEY && !heygenVideoId.startsWith("mock-")) {
        console.log(`[HeyGen] Started polling for video ${heygenVideoId}`);
        const pollInterval = setInterval(async () => {
          try {
            const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${heygenVideoId}`, {
              headers: { "X-Api-Key": process.env.HEYGEN_API_KEY! }
            });
            const data = await res.json();
            if (data.code === 100 && data.data.status === "completed") {
              clearInterval(pollInterval);
              await prisma.video.update({
                where: { id: video.id },
                data: { status: "COMPLETED", videoUrl: data.data.video_url || data.data.video_url_unwatermarked }
              });
              console.log(`[HeyGen] Polling finished, video ${video.id} completed!`);
            } else if (data.code === 100 && data.data.status === "failed") {
              clearInterval(pollInterval);
              await prisma.video.update({ where: { id: video.id }, data: { status: "ERROR" } });
              console.log(`[HeyGen] Polling finished, video ${video.id} failed.`);
            }
          } catch (e) {
            console.error("[HeyGen] Polling error:", e);
          }
        }, 10000); 
      } else {
        setTimeout(async () => {
          try {
            await prisma.video.update({
              where: { id: video.id },
              data: { 
                status: "COMPLETED", 
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" 
              }
            });
            console.log(`[Mock Webhook] Video ${video.id} completed!`);
          } catch (e) {
            console.error("[Mock Webhook] failed", e);
          }
        }, 3000);
      }
    }

    return video;
  } catch (error) {
    console.error("Failed in free video workflow", error);
    throw error;
  }
}

/**
 * NEW WORKFLOW: Generates a complete Candidate Story Video
 * This triggers Phase 1 of the new pipeline (Story Generation).
 */
export async function generateStoryVideoWorkflow(
  userId: string,
  cvText: string,
  answers: any,
  photoUrl: string | null,
  targetRole: string | null,
  targetIndustry: string | null,
  tone: string = "Professional",
  ninjaColor: string = "#6361B8"
) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    // Start Phase 1 (Parsing, Brain, Script, Storyboard)
    const result = await generateStoryPhase({
      userId,
      cvText,
      targetRole,
      targetIndustry,
      jobDescription: null,
      answers,
      photoUrl,
      tone,
      ninjaColor
    });

    return result;
  } catch (error) {
    console.error("Failed in Story Video workflow", error);
    throw error;
  }
}
