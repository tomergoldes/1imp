import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PublicProfileClient from "./PublicProfileClient";

export default async function PublicProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: { slug },
    include: {
      user: true,
      videoProjects: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          scenes: {
            orderBy: { orderIndex: "asc" }
          }
        }
      }
    }
  });

  if (!candidateProfile || !candidateProfile.isPublic) {
    notFound();
  }

  // Parse the stored JSON safely
  const parsedResume = candidateProfile.parsedResume as any || {};
  const latestProject = candidateProfile.videoProjects[0];

  // Format data for client component
  const clientProfile = {
    slug: candidateProfile.slug as string,
    name: parsedResume.name || candidateProfile.user.name || "Candidate",
    role: candidateProfile.targetRole || parsedResume.current_role || "Professional",
    location: parsedResume.location || "",
    summary: parsedResume.raw_summary || "",
    skills: parsedResume.skills || [],
    experience: (parsedResume.work_history || []).map((work: any, i: number) => ({
      id: String(i),
      role: work.role,
      company: work.company,
      date: work.period,
      bullets: work.bullets || []
    })),
    // Pass the VideoProject data to render the WebStoryPlayer
    videoProject: latestProject ? {
      videoUrl: latestProject.videoUrl,
      scenes: latestProject.scenes,
      hasWatermark: latestProject.hasWatermark
    } : null
  };

  return <PublicProfileClient profile={clientProfile} />;
}
