/**
 * 1IMP — CV Parser Engine
 * 
 * Extracts structured data from raw CV/resume text.
 * Uses GPT-4o-mini for cost-efficient extraction.
 */

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getSystemPrompt } from "./prompt-helper";

export interface ParsedResume {
  name: string;
  current_role: string | null;
  years_of_experience: number | null;
  industries: string[];
  skills: string[];
  tools: string[];
  achievements: Array<{ title: string; impact: string }>;
  education: Array<{ degree: string; school: string; year?: string }>;
  languages: string[];
  work_history: Array<{
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }>;
  raw_summary: string;
}

export const SYSTEM_PROMPT = `You are an expert resume parser. Your job is to extract structured data from a raw resume/CV text.

CRITICAL RULES:
1. Extract ONLY information that is explicitly stated in the text. Never invent data.
2. For "achievements", focus on outcomes with measurable impact (numbers, percentages, results). If no measurable impact exists, describe the responsibility clearly.
3. For "skills", extract both hard skills (programming languages, tools, methodologies) and soft skills (leadership, communication).
4. For "tools", list specific software, platforms, and technologies mentioned.
5. For "years_of_experience", calculate from the earliest work start date to the latest. If unclear, estimate based on roles listed.
6. "raw_summary" should be a 2-3 sentence summary of who this person is professionally — in your own words, not copied from the CV.

Respond with ONLY valid JSON matching this exact structure:
{
  "name": "string",
  "current_role": "string or null",
  "years_of_experience": number or null,
  "industries": ["string"],
  "skills": ["string"],
  "tools": ["string"],
  "achievements": [{"title": "string", "impact": "string"}],
  "education": [{"degree": "string", "school": "string", "year": "string or omit"}],
  "languages": ["string"],
  "work_history": [{"role": "string", "company": "string", "period": "string", "bullets": ["string"]}],
  "raw_summary": "string"
}`;

export async function parseCV(cvText: string): Promise<ParsedResume> {
  const activePrompt = await getSystemPrompt(
    "cv-parser",
    "CV Parser Engine",
    SYSTEM_PROMPT
  );

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: activePrompt,
    prompt: `Parse the following resume/CV text and extract structured data:\n\n${cvText}`,
    temperature: 0.1, // Low temperature for consistent extraction
  });

  // Extract JSON from the response (handle markdown code blocks)
  let jsonStr = text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const parsed = JSON.parse(jsonStr) as ParsedResume;
    
    // Validate required fields with defaults
    return {
      name: parsed.name || "Unknown",
      current_role: parsed.current_role || null,
      years_of_experience: parsed.years_of_experience || null,
      industries: parsed.industries || [],
      skills: parsed.skills || [],
      tools: parsed.tools || [],
      achievements: parsed.achievements || [],
      education: parsed.education || [],
      languages: parsed.languages || [],
      work_history: parsed.work_history || [],
      raw_summary: parsed.raw_summary || "",
    };
  } catch (e) {
    console.error("[CV Parser] Failed to parse AI response as JSON:", jsonStr);
    throw new Error("Failed to parse CV data. The AI response was not valid JSON.");
  }
}
