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

// When true, allow falling back to on-the-fly AI scene generation (fal.ai).
// Off by default because fal.ai is not implemented for production; keeping this
// off guarantees every scene resolves to a real library URL.
const AI_SCENE_GENERATION_ENABLED = process.env.ENABLE_AI_SCENE_GENERATION === "true";

export async function mapScenesToAssets(
  storyboard: StoryboardScene[],
  candidateProfileId: string
): Promise<MappedScene[]> {
  const mappedScenes: MappedScene[] = [];

  // Pre-fetch all library scenes to map them quickly.
  const libraryScenes = await prisma.sceneLibrary.findMany();
  const bySlug = new Map(libraryScenes.map((ls) => [ls.slug, ls]));
  const defaultScene = bySlug.get("default_scene") || libraryScenes[0] || null;

  for (const scene of storyboard) {
    // 1. Direct match by sceneType (slugs are kept in sync with the storyboard).
    const matchingLibraryScene = bySlug.get(scene.sceneType);

    if (matchingLibraryScene) {
      mappedScenes.push({
        ...scene,
        sourceType: "library",
        sourceUrl: matchingLibraryScene.videoUrl,
      });
      continue;
    }

    // 2. Optionally generate via fal.ai (only when explicitly enabled).
    if (AI_SCENE_GENERATION_ENABLED) {
      let prompt = `A cinematic 3D animation of a ninja. `;
      if (scene.sceneType === "hobby_custom") {
        prompt += `The ninja is engaging in a hobby related to: ${scene.voiceoverText}. `;
      } else {
        prompt += `The ninja is performing an action suitable for the concept: ${
          scene.onScreenText || scene.sceneType.replace(/_/g, " ")
        }. `;
      }
      prompt += `High quality, 4k, smooth animation, Pixar style.`;

      mappedScenes.push({
        ...scene,
        sourceType: "generated",
        sourceUrl: null, // Will be filled after generation
        generationPrompt: prompt,
      });
      continue;
    }

    // 3. Safety net: fall back to a default library scene so every scene has a
    // usable URL and the composition step never receives a null source.
    if (defaultScene) {
      mappedScenes.push({
        ...scene,
        sourceType: "library",
        sourceUrl: defaultScene.videoUrl,
      });
      continue;
    }

    // 4. No library at all — surface a clear error rather than composing nulls.
    throw new Error(
      "No scene library entries found. Run the b-roll seed script before rendering."
    );
  }

  return mappedScenes;
}
