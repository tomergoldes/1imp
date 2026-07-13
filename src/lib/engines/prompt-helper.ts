import { prisma } from "@/lib/prisma";

/**
 * Fetches the System Prompt for a given AI Engine from the database.
 * If the prompt doesn't exist in the database, it falls back to the hardcoded default
 * and optionally creates the record in the database for future editing.
 */
export async function getSystemPrompt(id: string, name: string, fallbackContent: string): Promise<string> {
  try {
    const dbPrompt = await prisma.systemPrompt.findUnique({
      where: { id }
    });

    if (dbPrompt) {
      return dbPrompt.content;
    }

    // Seed the database with the fallback prompt so it appears in the admin panel immediately
    await prisma.systemPrompt.create({
      data: {
        id,
        name,
        content: fallbackContent
      }
    });

    return fallbackContent;
  } catch (error) {
    console.error(`[Prompt Helper] Failed to fetch prompt for ${id}:`, error);
    // If DB fails (e.g., during build time or missing connection), just return the fallback
    return fallbackContent;
  }
}
