import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { VideoStudioClient } from "./VideoStudioClient";

export default async function VideoStudioPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  // Get the user's primary profile
  const profile = await prisma.profile.findFirst({
    where: { userId: (session.user as any).id }
  });

  if (!profile) {
    redirect("/editor"); // Must have a profile before making a video
  }

  return (
    <div style={{ padding: "4rem 2rem", minHeight: "100vh", background: "#F8F8FA" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", marginBottom: "3rem", textAlign: "center" }}>
        <div style={{ 
          display: "inline-block", padding: "0.5rem 1rem", background: "rgba(232,53,90,0.1)", 
          color: "#E8355A", borderRadius: 100, fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
          marginBottom: "1rem"
        }}>
          AI Video Studio
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", color: "#100030", margin: 0, letterSpacing: "-0.02em" }}>
          Bring your profile to life.
        </h1>
        <p style={{ color: "#555570", fontSize: "1.125rem", marginTop: "0.5rem" }}>
          Generate a compelling script and a professional avatar video in minutes.
        </p>
      </div>

      <VideoStudioClient profile={profile} />
    </div>
  );
}
