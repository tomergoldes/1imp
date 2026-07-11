import { prisma } from "@/lib/prisma";
import { VideoPageClient } from "./VideoPageClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const video = await prisma.video.findUnique({
    where: { id: slug },
    include: { user: true }
  }).catch(() => null);

  const name = video?.user?.name || "Professional";
  const title = `${name}'s 1IMP Video Profile`;
  const description = `Watch ${name}'s AI-generated video introduction. Create your own professional first impression with 1IMP.`;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://1imp.com";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "video.other",
      url: `${baseUrl}/v/${slug}`,
      images: [{ url: `${baseUrl}/api/og?name=${encodeURIComponent(name)}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let video = await prisma.video.findUnique({
    where: { id: slug },
    include: { user: true }
  }).catch(() => null);

  if (!video) {
    video = {
      id: slug,
      userId: "mock",
      videoUrl: "",
      style: "dynamic",
      targetRole: null,
      script: null,
      status: "COMPLETED",
      hasWatermark: true,
      isDownloadable: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: null,
    } as any;
  }

  return <VideoPageClient video={video as any} />;
}
