/**
 * 1IMP — Scene Mapper Engine
 * 
 * Maps storyboard scenes to actual video assets (either from the DB library
 * or flagging for on-the-fly AI generation).
 */

import { prisma } from "@/lib/prisma";
import type { StoryboardScene } from "./storyboard-builder";

export interface MappedScene extends StoryboardScene {
  sourceType: "library" | "generated";
  sourceUrl: string | null;
  // If generated, what's the prompt to send to fal.ai?
  generationPrompt?: string; 
}

export async function mapScenesToAssets(
  storyboard: StoryboardScene[],
  candidateProfileId: string
): Promise<MappedScene[]> {
  const mappedScenes: MappedScene[] = [];
  
  // Pre-fetch all library scenes to map them quickly
  const libraryScenes = await prisma.sceneLibrary.findMany();

  for (const scene of storyboard) {
    // 1. Try to find a direct match by sceneType
    const matchingLibraryScene = libraryScenes.find(
      (ls) => ls.slug === scene.sceneType
    );

    if (matchingLibraryScene) {
      mappedScenes.push({
        ...scene,
        sourceType: "library",
        sourceUrl: matchingLibraryScene.videoUrl,
      });
      continue;
    }

    // 2. Fallback to generation if not found in library
    // We build a specific prompt for the video generation model (e.g. Kling via fal.ai)
    let prompt = `A cinematic 3D animation of a ninja. `;
    
    if (scene.sceneType === "hobby_custom") {
      prompt += `The ninja is engaging in a hobby related to: ${scene.voiceoverText}. `;
    } else {
      prompt += `The ninja is performing an action suitable for the concept: ${scene.onScreenText || scene.sceneType.replace('_', ' ')}. `;
    }
    
    prompt += `High quality, 4k, smooth animation, Pixar style.`;

    mappedScenes.push({
      ...scene,
      sourceType: "generated",
      sourceUrl: null, // Will be filled after generation
      generationPrompt: prompt,
    });
  }

  return mappedScenes;
}
