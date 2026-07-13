import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BROLL_SCENES = [
  {
    slug: 'ninja-coding-focused',
    category: 'professional',
    tags: ['coding', 'programming', 'software_engineering', 'focused', 'tech'],
    description: 'A cinematic shot of a modern ninja aggressively typing on a glowing mechanical keyboard in a dark room.',
    // Using a reliable generic tech b-roll placeholder
    videoUrl: 'https://cdn.pixabay.com/video/2020/03/19/33890-400755948_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    durationSec: 10,
  },
  {
    slug: 'ninja-presentation-board',
    category: 'professional',
    tags: ['leadership', 'product_management', 'strategy', 'presentation', 'business'],
    description: 'Ninja standing in front of a neon glass whiteboard, pointing at a strategic chart.',
    videoUrl: 'https://cdn.pixabay.com/video/2019/04/22/22938-331623838_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
    durationSec: 10,
  },
  {
    slug: 'ninja-meditation-calm',
    category: 'general',
    tags: ['calm', 'problem_solving', 'focus', 'soft_skills'],
    description: 'A ninja meditating calmly amidst a chaotic neon city background, representing focus under pressure.',
    videoUrl: 'https://cdn.pixabay.com/video/2021/08/18/85496-590059530_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&q=80',
    durationSec: 12,
  },
  {
    slug: 'ninja-running-action',
    category: 'general',
    tags: ['agile', 'speed', 'execution', 'fast_paced', 'delivery'],
    description: 'A high-speed tracking shot of a ninja running across cyberpunk rooftops, representing agile execution and speed.',
    videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186001-876939527_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552674605-15c1e3c1520e?w=800&q=80',
    durationSec: 8,
  },
  {
    slug: 'ninja-handshake-deal',
    category: 'professional',
    tags: ['sales', 'partnership', 'teamwork', 'deal', 'closing'],
    description: 'Close up of a ninja shaking hands with a business executive, neon lighting.',
    videoUrl: 'https://cdn.pixabay.com/video/2019/01/14/20658-311452601_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=800&q=80',
    durationSec: 9,
  }
];

async function main() {
  console.log('🌱 Seeding Scene Library (B-Roll)...');
  
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
      }
    });
    console.log(`✅ Upserted scene: ${scene.slug}`);
  }

  console.log('🎉 B-Roll Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding B-Roll:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
