/**
 * 1IMP — Highlight Ranker Engine
 * 
 * Scores every piece of candidate information and picks the best ones
 * for inclusion in a 30-second video.
 * Uses GPT-4o-mini for cost-efficient scoring.
 */

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getSystemPrompt } from "./prompt-helper";
import type { ParsedResume } from "./cv-parser";
import type { CandidateStoryProfile } from "./candidate-brain";

export interface RankedHighlight {
  fact: string;
  score: number;
  category: "achievement" | "skill" | "tool" | "personal" | "education" | "trait";
  visualizable: boolean;
}

interface HighlightRankerInput {
  parsedResume: ParsedResume;
  storyProfile: CandidateStoryProfile;
  targetRole: string | null;
}

export const SYSTEM_PROMPT = `You are a Highlight Ranker for 1IMP — an AI video creation platform.

Your job is to take a candidate's resume data and story profile, and score EVERY piece of information based on how valuable it is for a 30-second video.

SCORING CRITERIA (0-100):
1. Relevance to target role (0-30 points)
2. Uniqueness / how much it differentiates the candidate (0-25 points)
3. Visual potential — can this be shown visually in a ninja-themed animation? (0-20 points)
4. Impact / impressiveness (0-15 points)
5. Clarity — is it easy to understand quickly? (0-10 points)

CATEGORIES:
- "achievement" — Something they accomplished with measurable impact
- "skill" — A professional competency
- "tool" — A specific software or technology
- "personal" — Hobby, interest, or personality trait
- "education" — Degree, certification, or course
- "trait" — Character quality or work style

"visualizable" should be true if this highlight can be represented as a scene in a ninja-themed video (e.g., "surfing" → ninja on surfboard, "project management" → ninja organizing tasks).

RULES:
1. Include ALL highlights found in the data, not just the good ones.
2. Be ruthless with scoring. Only truly impressive, relevant, and unique facts should score above 80.
3. Generic skills like "Microsoft Office" or "teamwork" should score below 40.
4. Personal elements (hobbies, fun facts) should score 60-80 if they're interesting and visualizable.
5. Return 10-20 highlights total, sorted by score descending.

Respond with ONLY a valid JSON array of RankedHighlight objects.`;

export async function rankHighlights(input: HighlightRankerInput): Promise<RankedHighlight[]> {
  const activePrompt = await getSystemPrompt(
    "highlight-ranker",
    "Highlight Ranker Engine",
    SYSTEM_PROMPT
  );

  const prompt = buildPrompt(input);

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: activePrompt,
    prompt,
    temperature: 0.2,
  });

  let jsonStr = text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const highlights = JSON.parse(jsonStr) as RankedHighlight[];
    
    // Sort by score descending and validate
    return highlights
      .map(h => ({
        fact: h.fact || "",
        score: Math.min(100, Math.max(0, h.score || 0)),
        category: h.category || "skill",
        visualizable: h.visualizable ?? true,
      }))
      .sort((a, b) => b.score - a.score);
  } catch (e) {
    console.error("[Highlight Ranker] Failed to parse AI response:", jsonStr);
    throw new Error("Failed to rank candidate highlights.");
  }
}

/**
 * Select the top highlights for a 30-second video.
 * Budget: ~1 identity, 2 achievements, 3 skills/tools, 1 trait, 1 personal, 1 closing.
 */
export function selectTopHighlights(highlights: RankedHighlight[], maxCount: number = 6): RankedHighlight[] {
  const selected: RankedHighlight[] = [];
  const categoryBudget: Record<string, number> = {
    achievement: 2,
    skill: 2,
    tool: 2,
    personal: 1,
    trait: 1,
    education: 1,
  };

  for (const h of highlights) {
    if (selected.length >= maxCount) break;
    const budget = categoryBudget[h.category] ?? 1;
    const currentCount = selected.filter(s => s.category === h.category).length;
    if (currentCount < budget && h.score >= 40) {
      selected.push(h);
    }
  }

  // If we didn't fill enough, add the highest remaining regardless of category
  if (selected.length < maxCount) {
    for (const h of highlights) {
      if (selected.length >= maxCount) break;
      if (!selected.includes(h) && h.score >= 30) {
        selected.push(h);
      }
    }
  }

  return selected;
}

function buildPrompt(input: HighlightRankerInput): string {
  const { parsedResume, storyProfile, targetRole } = input;

  let prompt = `## TARGET ROLE: ${targetRole || "General"}\n\n`;
  prompt += `## CANDIDATE STORY\n`;
  prompt += `Core Identity: ${storyProfile.core_identity}\n`;
  prompt += `Strength: ${storyProfile.professional_strength}\n`;
  prompt += `Personality: ${storyProfile.personality.join(", ")}\n`;
  prompt += `Personal Element: ${storyProfile.personal_element || "None"}\n\n`;

  prompt += `## RESUME DATA\n`;
  prompt += `Skills: ${parsedResume.skills.join(", ")}\n`;
  prompt += `Tools: ${parsedResume.tools.join(", ")}\n`;
  prompt += `Languages: ${parsedResume.languages.join(", ")}\n\n`;

  if (parsedResume.achievements.length > 0) {
    prompt += `Achievements:\n`;
    parsedResume.achievements.forEach(a => {
      prompt += `- ${a.title}: ${a.impact}\n`;
    });
    prompt += `\n`;
  }

  if (parsedResume.education.length > 0) {
    prompt += `Education:\n`;
    parsedResume.education.forEach(e => {
      prompt += `- ${e.degree} at ${e.school}\n`;
    });
    prompt += `\n`;
  }

  if (parsedResume.work_history.length > 0) {
    prompt += `Work History Highlights:\n`;
    parsedResume.work_history.forEach(w => {
      prompt += `${w.role} at ${w.company}\n`;
    });
  }

  prompt += `\nScore and rank ALL highlights from this data.`;
  return prompt;
}
