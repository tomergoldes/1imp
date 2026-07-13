import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;

  // Fetch the user's latest video project
  const latestVideo = await prisma.videoProject.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  // Fetch analytics
  const analytics = await prisma.analytics.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  // Fetch total videos
  const totalVideos = await prisma.videoProject.count({ where: { userId } });
  const completedVideos = await prisma.videoProject.count({ where: { userId, status: "COMPLETED" } });
  const isPremium = latestVideo ? !latestVideo.hasWatermark : false;

  return (
    <DashboardClient
      userName={session.user.name || "there"}
      userEmail={session.user.email || ""}
      latestVideoId={latestVideo?.id || null}
      latestVideoStatus={latestVideo?.status || null}
      isPremium={isPremium}
      totalVideos={totalVideos}
      completedVideos={completedVideos}
      profileViews={analytics?.views || 0}
      profileDownloads={analytics?.downloads || 0}
    />
  );
}
