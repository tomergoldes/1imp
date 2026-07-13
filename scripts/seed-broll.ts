import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Reusable b-roll video sources (generic placeholders until bespoke ninja assets exist).
const VIDEO = {
  coding: 'https://cdn.pixabay.com/video/2020/03/19/33890-400755948_large.mp4',
  presentation: 'https://cdn.pixabay.com/video/2019/04/22/22938-331623838_large.mp4',
  meditation: 'https://cdn.pixabay.com/video/2021/08/18/85496-590059530_large.mp4',
  running: 'https://cdn.pixabay.com/video/2023/10/22/186001-876939527_large.mp4',
  handshake: 'https://cdn.pixabay.com/video/2019/01/14/20658-311452601_large.mp4',
};

const THUMB = {
  coding: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
  presentation: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
  meditation: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&q=80',
  running: 'https://images.unsplash.com/photo-1552674605-15c1e3c1520e?w=800&q=80',
  handshake: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=800&q=80',
};

/**
 * IMPORTANT: `slug` MUST match the storyboard scene types produced by
 * `storyboard-builder.ts` (AVAILABLE_SCENE_TYPES). The scene-mapper looks up
 * library scenes by `slug === sceneType`, so these have to stay in sync,
 * otherwise every scene falls through to (expensive) AI generation.
 */
const BROLL_SCENES = [
  { slug: 'hero_entrance', category: 'general', tags: ['intro', 'dramatic'], description: 'Ninja dropping in for a dramatic intro.', videoUrl: VIDEO.running, thumbnailUrl: THUMB.running, durationSec: 8 },
  { slug: 'profile_split', category: 'professional', tags: ['profile', 'identity'], description: 'Split-screen ninja profile reveal.', videoUrl: VIDEO.presentation, thumbnailUrl: THUMB.presentation, durationSec: 10 },
  { slug: 'laptop_typing', category: 'professional', tags: ['coding', 'tech', 'focus'], description: 'Ninja typing furiously on a glowing keyboard.', videoUrl: VIDEO.coding, thumbnailUrl: THUMB.coding, durationSec: 10 },
  { slug: 'target_locked', category: 'professional', tags: ['strategy', 'focus'], description: 'Ninja locking onto a target through a scope.', videoUrl: VIDEO.presentation, thumbnailUrl: THUMB.presentation, durationSec: 8 },
  { slug: 'action_combat', category: 'general', tags: ['achievement', 'action'], description: 'Ninja performing martial arts for achievements.', videoUrl: VIDEO.running, thumbnailUrl: THUMB.running, durationSec: 8 },
  { slug: 'tools_juggling', category: 'professional', tags: ['skills', 'tools', 'stack'], description: 'Ninja juggling various tools and tech icons.', videoUrl: VIDEO.coding, thumbnailUrl: THUMB.coding, durationSec: 9 },
  { slug: 'meditation', category: 'general', tags: ['soft_skills', 'calm', 'focus'], description: 'Ninja meditating under pressure.', videoUrl: VIDEO.meditation, thumbnailUrl: THUMB.meditation, durationSec: 12 },
  { slug: 'scroll_reveal', category: 'general', tags: ['reveal', 'text'], description: 'Ninja unrolling a scroll to reveal text.', videoUrl: VIDEO.presentation, thumbnailUrl: THUMB.presentation, durationSec: 9 },
  { slug: 'shuriken_throw', category: 'general', tags: ['bullet_points', 'impact'], description: 'Ninja throwing shurikens that hit targets.', videoUrl: VIDEO.running, thumbnailUrl: THUMB.running, durationSec: 8 },
  { slug: 'smoke_bomb', category: 'general', tags: ['transition', 'reveal'], description: 'Ninja appearing/disappearing in smoke.', videoUrl: VIDEO.meditation, thumbnailUrl: THUMB.meditation, durationSec: 6 },
  { slug: 'hobby_custom', category: 'general', tags: ['hobby', 'personal'], description: 'Generic personal/hobby scene.', videoUrl: VIDEO.handshake, thumbnailUrl: THUMB.handshake, durationSec: 8 },
  { slug: 'hero_exit', category: 'general', tags: ['close', 'outro'], description: 'Ninja dramatic exit or bow.', videoUrl: VIDEO.handshake, thumbnailUrl: THUMB.handshake, durationSec: 6 },
  // Safety-net default used by the scene-mapper when no specific match is found.
  { slug: 'default_scene', category: 'general', tags: ['default'], description: 'Neutral fallback b-roll.', videoUrl: VIDEO.presentation, thumbnailUrl: THUMB.presentation, durationSec: 8 },
];

async function main() {
  console.log('Seeding Scene Library (B-Roll)...');

  for (const scene of BROLL_SCENES) {
    await prisma.sceneLibrary.upsert({
      where: { slug: scene.slug },
      update: {
        category: scene.category,
        tags: scene.tags,
        description: scene.description,
        videoUrl: scene.videoUrl,
        thumbnailUrl: scene.thumbnailUrl,
        durationSec: scene.durationSec,
      },
      create: {
        slug: scene.slug,
        category: scene.category,
        tags: scene.tags,
        description: scene.description,
        videoUrl: scene.videoUrl,
        thumbnailUrl: scene.thumbnailUrl,
        durationSec: scene.durationSec,
      },
    });
    console.log(`Upserted scene: ${scene.slug}`);
  }

  console.log('B-Roll Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding B-Roll:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
