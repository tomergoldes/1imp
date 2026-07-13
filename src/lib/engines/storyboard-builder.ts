/**
 * 1IMP — Storyboard Builder Engine
 * 
 * Maps the 6 script segments to specific scene types with visual directions.
 * Uses GPT-4o-mini for fast, structural generation.
 */

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getSystemPrompt } from "./prompt-helper";
import type { ScriptSegment } from "./script-writer";

export interface StoryboardScene {
  orderIndex: number;
  segmentId: string;
  startSec: number;
  endSec: number;
  sceneType: string;
  voiceoverText: string;
  onScreenText: string;
  visualAssets: string[];
}

interface StoryboardBuilderInput {
  scriptSegments: ScriptSegment[];
}

const AVAILABLE_SCENE_TYPES = [
  "hero_entrance",      // Ninja dropping in, dramatic intro
  "profile_split",      // Split screen: ninja on left, text on right
  "laptop_typing",      // Ninja typing furiously on a laptop
  "target_locked",      // Ninja looking through spyglass/scope
  "action_combat",      // Ninja doing martial arts / slashing (for achievements)
  "tools_juggling",     // Ninja juggling various tools/icons
  "meditation",         // Ninja meditating (for traits/soft skills)
  "scroll_reveal",      // Ninja unrolling a scroll with text
  "shuriken_throw",     // Throwing shurikens that hit targets (bullet points)
  "smoke_bomb",         // Ninja disappearing/appearing in smoke
  "hobby_custom",       // Generic scene for custom hobby generation
  "hero_exit"           // Dramatic jump away or bow
];

const SYSTEM_PROMPT = `You are the Storyboard Director for 1IMP's ninja-themed career videos.

You will receive a 6-segment voice-over script. Your job is to map each segment to a specific scene type and define the on-screen text.

AVAILABLE SCENE TYPES:
${AVAILABLE_SCENE_TYPES.map(t => `- ${t}`).join('\n')}

RULES:
1. "sceneType" MUST be exactly one of the available types. No exceptions.
2. The "hook" segment usually pairs well with "hero_entrance" or "smoke_bomb".
3. The "close" segment usually pairs well with "hero_exit".
4. "onScreenText" should be 2-5 words MAX. It reinforces the voice-over, it doesn't repeat it.
5. "visualAssets" is a list of icons or logos needed (e.g., ["React", "AWS", "Figma"]). Max 3. Leave empty if none.
6. Return exactly one scene per script segment (6 total).

Respond with ONLY a valid JSON array of StoryboardScene objects (omitting startSec/endSec/orderIndex/segmentId, you just provide sceneType, onScreenText, and visualAssets).
Format:
[
  { "segmentId": "hook", "sceneType": "hero_entrance", "onScreenText": "Tomer Goldstein", "visualAssets": [] }
]`;

export async function buildStoryboard(input: StoryboardBuilderInput): Promise<StoryboardScene[]> {
  const activePrompt = await getSystemPrompt(
    "storyboard-builder",
    "Storyboard Builder Engine",
    SYSTEM_PROMPT
  );

  const { scriptSegments } = input;
  
  let prompt = `## SCRIPT SEGMENTS\n`;
  scriptSegments.forEach(s => {
    prompt += `[${s.id}] (${s.durationSec}s): "${s.text}"\n`;
  });
  prompt += `\nMap these to scenes.`;

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: activePrompt,
    prompt,
    temperature: 0.1,
  });

  let jsonStr = text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const aiScenes = JSON.parse(jsonStr) as Partial<StoryboardScene>[];
    
    let currentStartTime = 0;
    const storyboard: StoryboardScene[] = scriptSegments.map((segment, index) => {
      // Find the matching AI scene by segmentId, or fallback to index
      const aiScene = aiScenes.find(s => s.segmentId === segment.id) || aiScenes[index] || {};
      
      const scene: StoryboardScene = {
        orderIndex: index,
        segmentId: segment.id,
        startSec: currentStartTime,
        endSec: currentStartTime + segment.durationSec,
        sceneType: aiScene.sceneType || "profile_split",
        voiceoverText: segment.text,
        onScreenText: aiScene.onScreenText || "",
        visualAssets: aiScene.visualAssets || [],
      };
      
      currentStartTime += segment.durationSec;
      return scene;
    });

    return storyboard;
  } catch (e) {
    console.error("[Storyboard Builder] Failed to parse AI response:", jsonStr);
    throw new Error("Failed to build storyboard.");
  }
}
