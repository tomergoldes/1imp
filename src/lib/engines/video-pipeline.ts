/**
 * 1IMP — Video Orchestrator Pipeline
 * 
 * The master coordinator that links the AI engines (Phase 2)
 * and the external API integrations (Phase 3).
 * 
 * Separated into two distinct flows to allow for user review:
 * 1. Story Generation (CV -> Script & Storyboard)
 * 2. Video Render (Approved Script -> Final MP4)
 */

import { prisma } from "@/lib/prisma";
import { parseCV } from "./cv-parser";
import { generateCandidateStory } from "./candidate-brain";
import { rankHighlights, selectTopHighlights } from "./highlight-ranker";
import { writeScript } from "./script-writer";
import { buildStoryboard } from "./storyboard-builder";
import { mapScenesToAssets } from "./scene-mapper";
import { generateNinjaAvatar, generateAIScene } from "../integrations/fal-client";
import { generateVoiceOver } from "../integrations/elevenlabs-client";
import { composeVideo } from "../integrations/shotstack-client";

interface StoryGenerationInput {
  userId: string;
  cvText: string;
  targetRole: string | null;
  targetIndustry: string | null;
  jobDescription: string | null;
  answers: any;
  photoUrl: string | null;
  tone: string;
  ninjaColor: string;
}

/**
 * FLOW 1: STORY GENERATION
 * Takes raw inputs and generates the script and storyboard.
 * STOPS here so the user can review and edit before rendering.
 */
export async function generateStoryPhase(input: StoryGenerationInput) {
  console.log(`[Pipeline] Starting Phase 1: Story Generation for user ${input.userId}`);
  
  // Sanitize inputs to prevent PostgreSQL null byte errors (0x00)
  const sanitizedCvText = input.cvText?.replace(/\0/g, '') || "";

  // 1. Parse CV
  console.log(`[Pipeline] Parsing CV...`);
  const parsedResume = await parseCV(sanitizedCvText);
  
  // 2. Candidate Brain
  console.log(`[Pipeline] Generating Story Profile...`);
  const storyProfile = await generateCandidateStory({
    parsedResume,
    answers: input.answers || {},
    targetRole: input.targetRole,
    targetIndustry: input.targetIndustry,
    jobDescription: input.jobDescription
  });
  
  // 3. Highlight Ranker
  console.log(`[Pipeline] Ranking Highlights...`);
  const allHighlights = await rankHighlights({
    parsedResume,
    storyProfile,
    targetRole: input.targetRole
  });
  const topHighlights = selectTopHighlights(allHighlights, 6);

  // 4. Script Writer
  console.log(`[Pipeline] Writing Script...`);
  const script = await writeScript({
    storyProfile,
    highlights: topHighlights,
    candidateName: parsedResume.name,
    tone: input.tone,
    targetRole: input.targetRole
  });

  // 5. Storyboard Builder
  console.log(`[Pipeline] Building Storyboard...`);
  const storyboard = await buildStoryboard({
    scriptSegments: script.segments
  });

  // Save to Database
  console.log(`[Pipeline] Saving to Database...`);
  const candidateProfile = await prisma.candidateProfile.create({
    data: {
      userId: input.userId,
      targetRole: input.targetRole,
      targetIndustry: input.targetIndustry,
      jobDescription: input.jobDescription,
      rawCvText: sanitizedCvText,
      parsedResume: parsedResume as any,
      storyProfile: storyProfile as any,
      highlights: topHighlights as any,
      answers: input.answers,
      photoUrl: input.photoUrl,
      tone: input.tone,
      ninjaColor: input.ninjaColor
    }
  });

  const videoProject = await prisma.videoProject.create({
    data: {
      candidateProfileId: candidateProfile.id,
      userId: input.userId,
      script: script.fullText,
      storyboard: storyboard as any,
      status: "SCRIPT_READY",
      hasWatermark: true,
      isDownloadable: false
    }
  });

  // Save scenes
  await Promise.all(storyboard.map(scene => 
    prisma.videoScene.create({
      data: {
        videoProjectId: videoProject.id,
        orderIndex: scene.orderIndex,
        sceneType: scene.sceneType,
        startSec: scene.startSec,
        endSec: scene.endSec,
        voiceoverText: scene.voiceoverText,
        onScreenText: scene.onScreenText,
        visualAssets: scene.visualAssets as any,
        sourceType: "library" // placeholder, determined in Phase 2
      }
    })
  ));

  return { candidateProfile, videoProject };
}

/**
 * FLOW 2: VIDEO RENDER
 * Takes an approved script/storyboard and renders the final video.
 * Involves expensive API calls (Voice, Avatar, Video Gen, Comp).
 */
export async function renderVideoPhase(videoProjectId: string) {
  console.log(`[Pipeline] Starting Phase 2: Video Render for project ${videoProjectId}`);
  
  const project = await prisma.videoProject.findUnique({
    where: { id: videoProjectId },
    include: { candidateProfile: true, scenes: { orderBy: { orderIndex: 'asc' } } }
  });

  if (!project) throw new Error("Video Project not found");
  if (project.status === "RENDERING" || project.status === "COMPLETED") {
    throw new Error("Video is already rendering or completed");
  }

  // Update status
  await prisma.videoProject.update({
    where: { id: project.id },
    data: { status: "RENDERING" }
  });

  try {
    const profile = project.candidateProfile;
    const storyboard = project.storyboard as any[]; // Assumed to match StoryboardScene[]

    // Rough per-render cost accumulator (USD) for unit-economics visibility.
    let estimatedCost = 0;

    // 1. Generate Avatar (if not already done). Non-fatal: the avatar is not part
    // of the Shotstack timeline, so a failure here should not abort the render.
    let avatarUrl = profile.avatarUrl;
    if (!avatarUrl && profile.photoUrl) {
      try {
        console.log(`[Pipeline] Generating Ninja Avatar...`);
        const avatarData = await generateNinjaAvatar(profile.photoUrl, {
          gender: "neutral", // Could be inferred or asked
          glasses: false,
          ninjaColor: profile.ninjaColor
        });
        avatarUrl = avatarData.imageUrl;
        estimatedCost += 0.1; // approx fal avatar cost

        await prisma.candidateProfile.update({
          where: { id: profile.id },
          data: { avatarUrl, avatarSeed: avatarData.seed }
        });
      } catch (avatarError) {
        console.warn("[Pipeline] Avatar generation failed; continuing without avatar.", avatarError);
      }
    }

    // 2. Generate Voice-over
    console.log(`[Pipeline] Generating Voice-over...`);
    const voiceOverUrl = await generateVoiceOver(project.script || "", profile.tone);
    estimatedCost += 0.15; // approx ElevenLabs cost
    await prisma.videoProject.update({
      where: { id: project.id },
      data: { voiceOverUrl }
    });

    // 3. Map & Generate Scenes
    console.log(`[Pipeline] Mapping Scenes...`);
    const mappedScenes = await mapScenesToAssets(storyboard, profile.id);

    for (let i = 0; i < mappedScenes.length; i++) {
      const scene = mappedScenes[i];
      if (scene.sourceType === "generated" && scene.generationPrompt && avatarUrl) {
        console.log(`[Pipeline] Generating custom scene ${i}...`);
        scene.sourceUrl = await generateAIScene(scene.generationPrompt, avatarUrl, scene.endSec - scene.startSec);
        estimatedCost += 0.5; // approx fal video-gen cost per scene
      }

      // Update DB with final source URL
      const dbScene = project.scenes.find(s => s.orderIndex === scene.orderIndex);
      if (dbScene && scene.sourceUrl) {
        await prisma.videoScene.update({
          where: { id: dbScene.id },
          data: { sourceType: scene.sourceType, sourceUrl: scene.sourceUrl }
        });
      }
    }

    // Safety: never send scenes with a null source URL to the compositor.
    const composableScenes = mappedScenes.filter((s) => !!s.sourceUrl);
    if (composableScenes.length === 0) {
      throw new Error("No renderable scenes were produced for this project.");
    }

    // 4. Compose Video
    console.log(`[Pipeline] Composing final video...`);
    const renderJobId = await composeVideo(composableScenes, voiceOverUrl, avatarUrl, project.hasWatermark);
    estimatedCost += 0.2; // approx Shotstack render cost

    await prisma.videoProject.update({
      where: { id: project.id },
      data: { renderJobId, renderCost: Math.round(estimatedCost * 100) / 100 }
    });

    // Note: A background task or webhook would normally poll Shotstack
    // For now, in dev we assume it returns quickly if mocked
    if (process.env.NODE_ENV === "development" && renderJobId.startsWith("mock-")) {
      setTimeout(async () => {
        await prisma.videoProject.update({
          where: { id: project.id },
          data: { 
            status: "COMPLETED", 
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" 
          }
        });
        console.log(`[Pipeline] Mock render completed for ${project.id}`);
      }, 5000);
    }

    return { success: true, renderJobId };
  } catch (error) {
    console.error("[Pipeline] Render failed:", error);
    await prisma.videoProject.update({
      where: { id: project.id },
      data: { status: "ERROR" }
    });
    throw error;
  }
}
