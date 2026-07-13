/**
 * 1IMP — Shotstack Integration
 * 
 * Composes the final video from all the individual assets:
 * - Voice-over audio
 * - Scene video clips
 * - On-screen text
 * - Ninja avatar overlays
 * - Background music
 */

import type { MappedScene } from "../engines/scene-mapper";

export interface ShotstackRenderStatus {
  id: string;
  status: "queued" | "processing" | "done" | "failed";
  url: string | null;
  error?: string;
}

/**
 * Sends the composition JSON to Shotstack to render the final video.
 * @param scenes The mapped scenes with source URLs
 * @param voiceOverUrl The audio track for the voice-over
 * @param avatarUrl The generated ninja avatar
 * @param hasWatermark Whether to include the 1IMP watermark
 * @returns The Shotstack render job ID
 */
export async function composeVideo(
  scenes: MappedScene[],
  voiceOverUrl: string,
  avatarUrl: string | null,
  hasWatermark: boolean = true
): Promise<string> {
  const apiKey = process.env.SHOTSTACK_API_KEY;
  
  if (!apiKey || process.env.NODE_ENV === "development") {
    console.log("[Shotstack Client] Mocking video composition render job");
    return "mock-render-job-" + Date.now();
  }

  try {
    // Determine API URL based on environment (Shotstack provides a v1 staging and production API)
    const apiUrl = process.env.NODE_ENV === "production" 
      ? "https://api.shotstack.io/edit/v1/render"
      : "https://api.shotstack.io/stage/v1/render";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        timeline: {
          soundtrack: {
            src: "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/music/freepd/epic.mp3",
            effect: "fadeOut"
          },
          tracks: [
            // Track 1: Voiceover
            {
              clips: [
                {
                  asset: { type: "audio", src: voiceOverUrl },
                  start: 0,
                  length: "auto"
                }
              ]
            },
            // Track 2: Text Overlay
            {
               clips: scenes.filter(s => s.onScreenText).map(s => ({
                 asset: { 
                   type: "html", 
                   html: `<div style="font-family: 'Inter', sans-serif; font-size: 64px; color: #ffffff; font-weight: 800; text-align: center; text-shadow: 0px 4px 12px rgba(0,0,0,0.8);">${s.onScreenText}</div>`,
                   css: "body { display: flex; align-items: flex-end; justify-content: center; padding-bottom: 20%; height: 100%; width: 100%; }",
                   width: 1080,
                   height: 1920
                 },
                 start: s.startSec,
                 length: s.endSec - s.startSec
               }))
            },
            // Track 3: B-roll Video Scenes
            {
               clips: scenes.map(s => ({
                 asset: { type: "video", src: s.sourceUrl! },
                 start: s.startSec,
                 length: s.endSec - s.startSec
               }))
            },
            // Track 4: Watermark (if enabled)
            hasWatermark ? {
              clips: [
                {
                  asset: {
                    type: "html",
                    html: `<div style="font-family: 'Inter', sans-serif; font-size: 24px; color: rgba(255,255,255,0.7); font-weight: 800; letter-spacing: 2px;">MADE WITH 1IMP</div>`,
                    css: "body { display: flex; align-items: flex-start; justify-content: flex-start; padding: 40px; }",
                    width: 1080,
                    height: 1920
                  },
                  start: 0,
                  length: scenes[scenes.length - 1].endSec
                }
              ]
            } : { clips: [] }
          ]
        },
        output: {
          format: "mp4",
          resolution: "1080", // 1080x1920 portrait
          aspectRatio: "9:16"
        },
        callback: `${process.env.NEXT_PUBLIC_APP_URL || 'https://1imp.com'}/api/webhooks/shotstack`
      })
    });
    
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Shotstack API Error: ${err}`);
    }

    const data = await response.json();
    return data.response.id;
  } catch (error) {
    console.error("[Shotstack Client] Error composing video:", error);
    throw new Error("Failed to start video composition");
  }
}

/**
 * Polls the status of a render job.
 */
export async function checkRenderStatus(renderId: string): Promise<ShotstackRenderStatus> {
  if (renderId.startsWith("mock-render-job-")) {
    // Simulate a successful render after a delay
    return {
      id: renderId,
      status: "done",
      url: "https://www.w3schools.com/html/mov_bbb.mp4"
    };
  }

  const apiKey = process.env.SHOTSTACK_API_KEY;
  if (!apiKey) throw new Error("Missing Shotstack API Key");

  try {
    const apiUrl = process.env.NODE_ENV === "production" 
      ? `https://api.shotstack.io/edit/v1/render/${renderId}`
      : `https://api.shotstack.io/stage/v1/render/${renderId}`;

    const response = await fetch(apiUrl, {
      headers: { "x-api-key": apiKey }
    });

    if (!response.ok) {
      throw new Error(`Shotstack poll failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      id: renderId,
      status: data.response.status, // "queued", "fetching", "rendering", "saving", "done", "failed"
      url: data.response.url || null,
      error: data.response.error
    };
  } catch (error) {
    console.error("[Shotstack Client] Error checking status:", error);
    throw new Error("Failed to check render status");
  }
}
