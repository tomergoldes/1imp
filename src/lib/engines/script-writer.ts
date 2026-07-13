/**
 * 1IMP — Script Writer Engine
 * 
 * Writes a 60-80 word voice-over script structured into 6 segments.
 * Uses GPT-4o for high-quality creative writing.
 */

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getSystemPrompt } from "./prompt-helper";
import type { CandidateStoryProfile } from "./candidate-brain";
import type { RankedHighlight } from "./highlight-ranker";

export interface ScriptSegment {
  id: string;
  label: string;
  text: string;
  durationSec: number;
}

export interface GeneratedScript {
  fullText: string;
  segments: ScriptSegment[];
  wordCount: number;
  estimatedDurationSec: number;
}

type TonePreset = "Professional" | "Bold" | "Funny" | "Creative" | "Minimal";

interface ScriptWriterInput {
  storyProfile: CandidateStoryProfile;
  highlights: RankedHighlight[];
  candidateName: string;
  tone: TonePreset | string;
  targetRole: string | null;
}

function getToneGuidance(tone: string): string {
  switch (tone) {
    case "Bold":
      return "Write with confidence and swagger. Short punchy sentences. Make it sound like a movie trailer. Use strong action verbs.";
    case "Funny":
      return "Add subtle humor and wit. Don't be corny — be clever. Make the listener smile. Self-aware is good.";
    case "Creative":
      return "Use metaphors and vivid language. Be poetic but not pretentious. Paint mental images. Surprise the listener.";
    case "Minimal":
      return "Be extremely concise. Every word must earn its place. Zen-like clarity. No filler. Short sentences.";
    case "Professional":
    default:
      return "Be polished and articulate. Warm but authoritative. Clear and structured. The listener should feel they're hearing from someone competent and trustworthy.";
  }
}

export const SYSTEM_PROMPT = `You are the Script Writer for 1IMP — an AI career storytelling engine that creates 30-second ninja-themed videos.

Your job is to write a voice-over script that will be spoken over animated ninja scenes. The script must be EXACTLY 60-80 words. NOT more, NOT less.

The script has 6 segments, each corresponding to a video scene:

1. "hook" (3 sec, ~10 words) — Introduce the candidate with impact. Use their first name. Make it punchy.
2. "identity" (5 sec, ~15 words) — What they do and where they're heading professionally.
3. "achievements" (7 sec, ~20 words) — Their 2 strongest achievements or experiences. Be specific.
4. "skills" (6 sec, ~15 words) — Tools, technologies, or competencies they bring.
5. "personal" (5 sec, ~10 words) — One human detail: hobby, passion, or fun fact.
6. "close" (4 sec, ~10 words) — Strong ending that makes the listener want to connect.

CRITICAL RULES:
1. Write in THIRD PERSON (he/she/they), not first person.
2. Do NOT use clichés like "passionate about", "results-driven", "team player".
3. Every sentence must add NEW information. No repetition.
4. The script is for voice-over — it must sound natural when spoken aloud.
5. Keep it conversational, not robotic.
6. The script will play over animated ninja scenes, so avoid describing visuals — focus on the story.

Respond with ONLY valid JSON matching the GeneratedScript structure:
{
  "fullText": "The complete script as one string",
  "segments": [
    { "id": "hook", "label": "Hook", "text": "...", "durationSec": 3 },
    { "id": "identity", "label": "Identity", "text": "...", "durationSec": 5 },
    { "id": "achievements", "label": "Achievements", "text": "...", "durationSec": 7 },
    { "id": "skills", "label": "Skills & Tools", "text": "...", "durationSec": 6 },
    { "id": "personal", "label": "Personal", "text": "...", "durationSec": 5 },
    { "id": "close", "label": "Closing", "text": "...", "durationSec": 4 }
  ],
  "wordCount": 70,
  "estimatedDurationSec": 30
}`;

export async function writeScript(input: ScriptWriterInput): Promise<GeneratedScript> {
  const activePrompt = await getSystemPrompt(
    "script-writer",
    "Script Writer Engine",
    SYSTEM_PROMPT
  );

  const prompt = buildPrompt(input);

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: activePrompt,
    prompt,
    temperature: 0.7,
  });

  let jsonStr = text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const script = JSON.parse(jsonStr) as GeneratedScript;
    
    // Calculate actual word count
    const actualWordCount = script.fullText.split(/\s+/).filter(Boolean).length;
    
    return {
      fullText: script.fullText,
      segments: script.segments || [],
      wordCount: actualWordCount,
      estimatedDurationSec: script.segments?.reduce((sum, s) => sum + s.durationSec, 0) || 30,
    };
  } catch (e) {
    console.error("[Script Writer] Failed to parse AI response:", jsonStr);
    throw new Error("Failed to generate video script.");
  }
}

function buildPrompt(input: ScriptWriterInput): string {
  const { storyProfile, highlights, candidateName, tone, targetRole } = input;
  const firstName = candidateName.split(" ")[0];

  let prompt = `## CANDIDATE: ${candidateName}\n`;
  prompt += `First name to use: ${firstName}\n`;
  prompt += `Target role: ${targetRole || "Open"}\n\n`;

  prompt += `## TONE\n${getToneGuidance(tone)}\n\n`;

  prompt += `## STORY PROFILE\n`;
  prompt += `Core Identity: ${storyProfile.core_identity}\n`;
  prompt += `Strength: ${storyProfile.professional_strength}\n`;
  prompt += `Career Story: ${storyProfile.career_story}\n`;
  prompt += `Personality: ${storyProfile.personality.join(", ")}\n`;
  prompt += `Personal Element: ${storyProfile.personal_element || "None provided"}\n`;
  prompt += `Target Message: ${storyProfile.target_message}\n\n`;

  prompt += `## SELECTED HIGHLIGHTS (use these in the script)\n`;
  highlights.forEach((h, i) => {
    prompt += `${i + 1}. [${h.category}] ${h.fact} (score: ${h.score})\n`;
  });

  prompt += `\nNow write the 60-80 word script with 6 segments.`;
  return prompt;
}
