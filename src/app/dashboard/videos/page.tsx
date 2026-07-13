import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { VideoCard } from "./VideoCard";
import Link from "next/link";
import { Video, Plus } from "lucide-react";

export default async function VideosPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch all videos for this user, ordered by newest first
  const videos = await prisma.videoProject.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ padding: "4rem 2rem", minHeight: "100vh", background: "#F8F8FA" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", color: "#100030", margin: 0, letterSpacing: "-0.02em" }}>
              My Videos
            </h1>
            <p style={{ color: "#555570", fontSize: "1.125rem", margin: "0.5rem 0 0 0" }}>
              Manage and share your AI-generated introductions.
            </p>
          </div>
          
          <Link href="/create" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #E8355A 0%, #6361B8 100%)", color: "white",
            border: "none", borderRadius: 12, fontSize: "1rem", fontWeight: 600, textDecoration: "none",
            boxShadow: "0 4px 14px rgba(232,53,90,0.25)"
          }}>
            <Plus size={18} /> Generate New
          </Link>
        </div>

        {videos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 2rem", background: "white", borderRadius: 24, border: "1px dashed rgba(16,0,48,0.15)" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(99,97,184,0.1)", color: "#6361B8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <Video size={36} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", marginBottom: "0.5rem", fontWeight: 700 }}>No videos yet</h2>
            <p style={{ color: "#555570", marginBottom: "2rem" }}>You haven&apos;t generated any AI videos yet.</p>
            <Link href="/create" style={{ padding: "0.75rem 1.5rem", background: "#100030", color: "white", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>
              Create a Video
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
