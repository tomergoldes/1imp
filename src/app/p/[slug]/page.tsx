import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PublicProfileClient from "./PublicProfileClient";

export default async function PublicProfilePage({ params }: { params: { slug: string } }) {
  const profile = await prisma.profile.findUnique({
    where: { slug: params.slug },
    include: {
      user: {
        include: {
          videos: {
            where: { status: "COMPLETED" },
            orderBy: { createdAt: "desc" },
            take: 1
          }
        }
      }
    }
  });

  if (!profile || !profile.isPublic) {
    notFound();
  }

  // Format data for client component
  const clientProfile = {
    slug: profile.slug,
    name: profile.fullName,
    role: profile.title,
    location: profile.location || "Remote",
    summary: profile.summary || "",
    skills: ["Product Strategy", "Agile Methodologies", "User Research", "Go-to-Market"], // Mock skills for now since we don't have a skills table yet
    experience: [ // Mock experience since we didn't model this yet to save time
      {
        id: "1", role: profile.title, company: "Current Company", date: "2021 - Present",
        bullets: ["Leading core platform team.", "Increased conversion by 24%."]
      }
    ],
    videoUrl: profile.user.videos[0]?.videoUrl || null
  };

  return <PublicProfileClient profile={clientProfile} />;
}
