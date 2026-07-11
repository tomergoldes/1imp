"use client";

import { motion } from "framer-motion";
import { Copy, Eye, MousePointerClick, ArrowUpRight, ExternalLink, PenTool, Video, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DashboardClientProps {
  userName: string;
  userEmail: string;
  latestVideoId: string | null;
  latestVideoStatus: string | null;
  isPremium: boolean;
  totalVideos: number;
  completedVideos: number;
  profileViews: number;
  profileDownloads: number;
}

export default function DashboardClient({
  userName,
  latestVideoId,
  latestVideoStatus,
  isPremium,
  totalVideos,
  completedVideos,
  profileViews,
  profileDownloads,
}: DashboardClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (latestVideoId) {
      navigator.clipboard.writeText(`${window.location.origin}/v/${latestVideoId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const getVideoStatusBadge = () => {
    if (!latestVideoId) return null;
    if (latestVideoStatus === "PENDING") {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.875rem", background: "rgba(250,187,5,0.12)", borderRadius: 9999, color: "#FABB05", fontSize: "0.8125rem", fontWeight: 600 }}>
          <Clock size={14} />
          Generating your video... (~2 min)
        </div>
      );
    }
    if (latestVideoStatus === "COMPLETED" && isPremium) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.875rem", background: "rgba(52,168,83,0.12)", borderRadius: 9999, color: "#34A853", fontSize: "0.8125rem", fontWeight: 600 }}>
          <CheckCircle size={14} />
          Premium — Unlocked
        </div>
      );
    }
    if (latestVideoStatus === "COMPLETED") {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.875rem", background: "rgba(99,97,184,0.12)", borderRadius: 9999, color: "#6361B8", fontSize: "0.8125rem", fontWeight: 600 }}>
          <Video size={14} />
          Free Preview Ready
        </div>
      );
    }
    if (latestVideoStatus === "FAILED") {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.875rem", background: "rgba(232,53,90,0.12)", borderRadius: 9999, color: "#E8355A", fontSize: "0.8125rem", fontWeight: 600 }}>
          <AlertCircle size={14} />
          Generation Failed
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <motion.div variants={containerVariants} initial="hidden" animate="show">

        {/* Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "#100030", letterSpacing: "-0.02em" }}>
            Welcome back, {userName.split(" ")[0]}.
          </h1>
          <p style={{ color: "#555570", fontSize: "1rem" }}>Here&apos;s how your first impression is performing.</p>
        </motion.div>

        {/* Video Status Banner */}
        {latestVideoId ? (
          <motion.div variants={itemVariants} style={{
            background: "white", padding: "1.5rem", borderRadius: 16,
            border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 4px 12px rgba(16,0,48,0.02)",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
            marginBottom: "2rem"
          }}>
            <div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#6361B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.6rem" }}>
                Your Latest Video
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                {getVideoStatusBadge()}
                {latestVideoStatus === "COMPLETED" && (
                  <Link href={`/v/${latestVideoId}`} target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#9999AA", fontSize: "0.875rem", textDecoration: "none" }}>
                    <ExternalLink size={16} />
                    View Video
                  </Link>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              {latestVideoStatus === "COMPLETED" && (
                <button
                  onClick={handleCopy}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.6rem 1rem", background: "rgba(99,97,184,0.1)", color: "#6361B8",
                    border: "none", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
                    transition: "all 150ms"
                  }}>
                  <Copy size={16} />
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              )}
              {latestVideoStatus === "PENDING" ? (
                <button disabled style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.6rem 1rem", background: "#ccc", color: "white",
                  border: "none", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600, cursor: "not-allowed"
                }}>
                  <Clock size={16} />
                  Generating...
                </button>
              ) : (
                <Link href="/onboarding" style={{
                  display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none",
                  padding: "0.6rem 1rem", background: "#100030", color: "white",
                  border: "none", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600,
                }}>
                  <PenTool size={16} />
                  New Video
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          /* No video yet — call to action */
          <motion.div variants={itemVariants} style={{
            background: "linear-gradient(135deg, #100030 0%, #1A004A 100%)", borderRadius: 16, padding: "2.5rem",
            marginBottom: "2rem", textAlign: "center", color: "white",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎬</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.75rem" }}>
              Create Your First Video
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem", maxWidth: 420, margin: "0 auto 1.5rem" }}>
              Upload your resume and let our AI generate a professional video introduction in minutes.
            </p>
            <Link href="/onboarding" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.75rem 2rem", background: "#E8355A", color: "white",
              borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(232,53,90,0.4)",
            }}>
              Get Started →
            </Link>
          </motion.div>
        )}

        {/* Analytics Grid */}
        <motion.div variants={itemVariants} style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem"
        }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: 16, border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 4px 12px rgba(16,0,48,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(99,97,184,0.1)", color: "#6361B8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Eye size={20} />
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#34A853", fontSize: "0.8125rem", fontWeight: 600 }}>
                <ArrowUpRight size={14} /> Live
              </span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#100030", lineHeight: 1 }}>
              {profileViews}
            </div>
            <div style={{ color: "#555570", fontSize: "0.875rem", marginTop: "0.4rem" }}>Profile Views</div>
          </div>

          <div style={{ background: "white", padding: "1.5rem", borderRadius: 16, border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 4px 12px rgba(16,0,48,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(232,53,90,0.1)", color: "#E8355A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MousePointerClick size={20} />
              </div>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#100030", lineHeight: 1 }}>
              {profileDownloads}
            </div>
            <div style={{ color: "#555570", fontSize: "0.875rem", marginTop: "0.4rem" }}>Downloads</div>
          </div>

          <div style={{ background: "white", padding: "1.5rem", borderRadius: 16, border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 4px 12px rgba(16,0,48,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(52,168,83,0.1)", color: "#34A853", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Video size={20} />
              </div>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#100030", lineHeight: 1 }}>
              {completedVideos}/{totalVideos}
            </div>
            <div style={{ color: "#555570", fontSize: "0.875rem", marginTop: "0.4rem" }}>Videos Ready</div>
          </div>
        </motion.div>

        {/* Upgrade CTA — only for free users with a completed video */}
        {latestVideoStatus === "COMPLETED" && !isPremium && (
          <motion.div variants={itemVariants} style={{
            background: "linear-gradient(135deg, #100030 0%, #1A004A 100%)", borderRadius: 16, padding: "2rem", color: "white",
            display: "flex", flexDirection: "column", gap: "1rem", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(232,53,90,0.15)", filter: "blur(40px)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E8355A", fontWeight: 700, fontSize: "0.8125rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#E8355A" }} />
              Unlock Premium
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem" }}>Remove watermark &amp; download HD</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 480, lineHeight: 1.6, fontSize: "0.9375rem" }}>
              One-time payment of $9.99. Get a clean, shareable video for life.
            </p>
            <Link href={`/v/${latestVideoId}`} style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-start",
              padding: "0.6rem 1.25rem", background: "#E8355A", color: "white", borderRadius: 8,
              fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none", marginTop: "0.5rem"
            }}>
              Upgrade to Premium — $9.99
            </Link>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
