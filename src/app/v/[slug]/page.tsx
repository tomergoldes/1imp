import { prisma } from "@/lib/prisma";
import { VideoPageClient } from "./VideoPageClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.videoProject.findUnique({
    where: { id: slug },
    include: { user: true }
  }).catch(() => null);

  const name = project?.user?.name || "Professional";
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

  let project = await prisma.videoProject.findUnique({
    where: { id: slug },
    include: { 
      user: true,
      scenes: { orderBy: { orderIndex: "asc" } }
    }
  }).catch(() => null);

  if (!project) {
    // Render a 404 or dummy
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h2>Video not found</h2>
      </div>
    );
  }

  // Format the data to match what VideoPageClient expects for a VideoProject
  return <VideoPageClient videoProject={project as any} />;
}
