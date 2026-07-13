/**
 * 1IMP — Candidate Brain Engine
 * 
 * Understands who the candidate is and creates their story profile.
 * Uses GPT-4o for high-quality storytelling.
 */

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getSystemPrompt } from "./prompt-helper";
import type { ParsedResume } from "./cv-parser";

export interface CandidateStoryProfile {
  core_identity: string;
  professional_strength: string;
  career_story: string;
  top_achievements: string[];
  personality: string[];
  personal_element: string | null;
  target_message: string;
}

interface CandidateBrainInput {
  parsedResume: ParsedResume;
  answers: {
    bestSkill?: string;
    proudestProject?: string;
    problemYouSolve?: string;
    colleaguesSay?: string;
    whyNextRole?: string;
    mainHobby?: string;
    energySource?: string;
    threeWords?: string;
    surprisingFact?: string;
  };
  targetRole: string | null;
  targetIndustry: string | null;
  jobDescription: string | null;
}

export const SYSTEM_PROMPT = `You are the Candidate Brain for 1IMP — an AI career storytelling engine.

Your job is to take a candidate's parsed resume data, their personal answers, and their target role, and produce a deep understanding of WHO this person is.

You are NOT writing a resume. You are NOT listing experience. You are crafting a NARRATIVE — a story that makes someone memorable in 30 seconds.

RULES:
1. "core_identity" — One sentence that captures who this person is at their professional core. Think: tagline.
2. "professional_strength" — What they uniquely bring to the table. Be specific, not generic.
3. "career_story" — 2-3 sentences telling the arc of their career. What's the thread connecting their roles?
4. "top_achievements" — 3 concrete achievements. Each should be a single impactful sentence.
5. "personality" — Exactly 3 personality traits derived from their answers and experience. Single words.
6. "personal_element" — One hobby or personal interest that makes them human and memorable. Null if not provided.
7. "target_message" — The ONE takeaway a recruiter should have after watching their 30-second video. Be compelling.

If targeting a specific role, bias everything toward that role's requirements.
If a job description is provided, align the story to what that role needs.

Respond with ONLY valid JSON matching the CandidateStoryProfile structure.`;

export async function generateCandidateStory(input: CandidateBrainInput): Promise<CandidateStoryProfile> {
  const activePrompt = await getSystemPrompt(
    "candidate-brain",
    "Candidate Brain Engine",
    SYSTEM_PROMPT
  );

  const prompt = buildPrompt(input);

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: activePrompt,
    prompt,
    temperature: 0.6,
  });

  let jsonStr = text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const profile = JSON.parse(jsonStr) as CandidateStoryProfile;
    return {
      core_identity: profile.core_identity || "",
      professional_strength: profile.professional_strength || "",
      career_story: profile.career_story || "",
      top_achievements: profile.top_achievements || [],
      personality: (profile.personality || []).slice(0, 3),
      personal_element: profile.personal_element || null,
      target_message: profile.target_message || "",
    };
  } catch (e) {
    console.error("[Candidate Brain] Failed to parse AI response:", jsonStr);
    throw new Error("Failed to generate candidate story profile.");
  }
}

function buildPrompt(input: CandidateBrainInput): string {
  const { parsedResume, answers, targetRole, targetIndustry, jobDescription } = input;

  let prompt = `## PARSED RESUME\n`;
  prompt += `Name: ${parsedResume.name}\n`;
  prompt += `Current Role: ${parsedResume.current_role || "Not specified"}\n`;
  prompt += `Years of Experience: ${parsedResume.years_of_experience || "Unknown"}\n`;
  prompt += `Industries: ${parsedResume.industries.join(", ") || "N/A"}\n`;
  prompt += `Skills: ${parsedResume.skills.join(", ") || "N/A"}\n`;
  prompt += `Tools: ${parsedResume.tools.join(", ") || "N/A"}\n`;
  prompt += `Languages: ${parsedResume.languages.join(", ") || "N/A"}\n`;
  prompt += `Summary: ${parsedResume.raw_summary}\n\n`;

  if (parsedResume.achievements.length > 0) {
    prompt += `## KEY ACHIEVEMENTS\n`;
    parsedResume.achievements.forEach((a) => {
      prompt += `- ${a.title}: ${a.impact}\n`;
    });
    prompt += `\n`;
  }

  if (parsedResume.work_history.length > 0) {
    prompt += `## WORK HISTORY\n`;
    parsedResume.work_history.forEach((w) => {
      prompt += `${w.role} at ${w.company} (${w.period})\n`;
      w.bullets.forEach((b) => {
        prompt += `  • ${b}\n`;
      });
    });
    prompt += `\n`;
  }

  prompt += `## TARGET\n`;
  prompt += `Target Role: ${targetRole || "General / Open"}\n`;
  prompt += `Target Industry: ${targetIndustry || "Not specified"}\n`;
  if (jobDescription) {
    prompt += `\nJob Description:\n${jobDescription}\n`;
  }
  prompt += `\n`;

  prompt += `## PERSONAL ANSWERS\n`;
  if (answers.bestSkill) prompt += `Best at: ${answers.bestSkill}\n`;
  if (answers.proudestProject) prompt += `Proudest project: ${answers.proudestProject}\n`;
  if (answers.problemYouSolve) prompt += `Problem they love solving: ${answers.problemYouSolve}\n`;
  if (answers.colleaguesSay) prompt += `What colleagues say: ${answers.colleaguesSay}\n`;
  if (answers.whyNextRole) prompt += `Why next role: ${answers.whyNextRole}\n`;
  if (answers.mainHobby) prompt += `Main hobby: ${answers.mainHobby}\n`;
  if (answers.energySource) prompt += `Energy source: ${answers.energySource}\n`;
  if (answers.threeWords) prompt += `Three words: ${answers.threeWords}\n`;
  if (answers.surprisingFact) prompt += `Surprising fact: ${answers.surprisingFact}\n`;

  prompt += `\nNow create the CandidateStoryProfile JSON.`;

  return prompt;
}
