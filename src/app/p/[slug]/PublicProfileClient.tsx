"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { CustomMail, CustomMapPin, CustomBriefcase, CustomChevronRight, ThemeIconWrapper } from "@/components/ui/CustomIcons";
import Link from "next/link";
import { WebStoryPlayer } from "@/components/WebStoryPlayer";

type ProfileProps = {
  profile: {
    slug: string;
    name: string;
    role: string;
    location: string;
    summary: string;
    skills: string[];
    experience: {
      id: string;
      role: string;
      company: string;
      date: string;
      bullets: string[];
    }[];
    videoProject: {
      videoUrl: string | null;
      scenes: any[];
      hasWatermark: boolean;
    } | null;
  };
};

export default function PublicProfileClient({ profile }: ProfileProps) {
  return (
    <div style={{ background: "#FDFDFD", minHeight: "100vh", paddingBottom: "100px", fontFamily: "var(--font-body)", color: "#100030" }}>
      
      {/* ── Main Layout (Split Desktop / Stack Mobile) ── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem", display: "flex", flexWrap: "wrap", gap: "4rem" }}>
        
        {/* LEFT COLUMN: The WebStory Player */}
        <div style={{ flex: "1 1 400px", maxWidth: "500px", margin: "0 auto" }}>
          {profile.videoProject ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ height: "100%" }}>
              <WebStoryPlayer 
                hasWatermark={profile.videoProject.hasWatermark}
                videoUrl={profile.videoProject.videoUrl}
                scenes={profile.videoProject.scenes}
              />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              style={{ width: "100%", aspectRatio: "9/16", borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 24px rgba(16,0,48,0.12)", background: "linear-gradient(135deg, #6361B8, #E8355A)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "4rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
              {profile.name.charAt(0)}
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: The Parsed CV Details */}
        <div style={{ flex: "1 1 500px" }}>
          {/* Hero Identity */}
          <section style={{ marginBottom: "3rem" }}>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>
              {profile.name}
            </motion.h1>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#555570", fontSize: "1rem", fontWeight: 500, marginBottom: "1.5rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><CustomBriefcase size={18} /> {profile.role}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><CustomMapPin size={18} /> {profile.location}</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
              style={{ padding: "1.5rem", background: "rgba(99,82,138,0.04)", borderRadius: 16, border: "1px solid rgba(99,82,138,0.08)" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6361B8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8355A" }} />
                Executive Summary
              </div>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "#100030" }}>
                {profile.summary}
              </p>
            </motion.div>
          </section>

          {/* Skills Zone */}
          {profile.skills.length > 0 && (
            <section style={{ marginBottom: "3.5rem" }}>
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                style={{ fontSize: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "1rem", letterSpacing: "-0.01em" }}>
                Skills & Expertise
              </motion.h2>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {profile.skills.map((skill, i) => (
                  <span key={i} style={{ padding: "0.4rem 0.85rem", background: "white", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 999, fontSize: "0.875rem", fontWeight: 500, color: "#444466", boxShadow: "0 2px 4px rgba(16,0,48,0.02)" }}>
                    {skill}
                  </span>
                ))}
              </motion.div>
            </section>
          )}

          {/* Experience Timeline */}
          {profile.experience.length > 0 && (
            <section style={{ marginBottom: "3rem" }}>
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                style={{ fontSize: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
                Experience
              </motion.h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {profile.experience.map((exp, i) => (
                  <motion.div key={exp.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 + i * 0.1 }}
                    style={{ position: "relative", paddingLeft: "1.5rem" }}>
                    {/* Timeline line */}
                    <div style={{ position: "absolute", left: 0, top: 6, bottom: -32, width: 2, background: i === profile.experience.length - 1 ? "transparent" : "rgba(99,82,138,0.15)" }} />
                    {/* Timeline dot */}
                    <div style={{ position: "absolute", left: -4, top: 6, width: 10, height: 10, borderRadius: "50%", background: "#6361B8", border: "2px solid white" }} />
                    
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#100030", marginBottom: "0.2rem" }}>{exp.role}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#666680", fontWeight: 500, marginBottom: "0.75rem" }}>
                      <span>{exp.company}</span>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#CCC" }} />
                      <span>{exp.date}</span>
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} style={{ fontSize: "0.95rem", color: "#444466", lineHeight: 1.6, position: "relative", paddingLeft: "1.25rem" }}>
                          <CustomChevronRight size={14} style={{ position: "absolute", left: 0, top: 4, color: "#E8355A" }} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ── Viral Footer ── */}
      <footer style={{ padding: "3rem 1.5rem", textAlign: "center", borderTop: "1px solid rgba(16,0,48,0.05)", background: "white" }}>
        <p style={{ fontSize: "0.875rem", color: "#666680", marginBottom: "0.75rem" }}>
          This Career Profile was generated with <span style={{ fontWeight: 700, color: "#100030" }}>1IMP</span>
        </p>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", padding: "0.6rem 1.25rem", background: "rgba(99,82,138,0.08)", color: "#100030", borderRadius: 999, fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
          Create your First Impression →
        </Link>
      </footer>

      {/* ── Sticky Action Bar ── */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.8, type: "spring", damping: 20 }}
        style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100, display: "flex", gap: "0.75rem", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", padding: "0.5rem", borderRadius: 999, boxShadow: "0 8px 32px rgba(16,0,48,0.15)", border: "1px solid rgba(16,0,48,0.08)" }}>
        
        <button style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.75rem 1.25rem", background: "white", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 999, fontSize: "0.9rem", fontWeight: 600, color: "#100030", cursor: "pointer", boxShadow: "0 2px 8px rgba(16,0,48,0.04)" }}>
          <ThemeIconWrapper icon={Download} size={16} color="currentColor" />
          <span className="hide-mobile">Download</span> CV
        </button>
        
        <a href={`mailto:hello@${profile.slug}.com?subject=Saw your 1IMP Profile`} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.75rem 1.75rem", background: "#100030", border: "none", borderRadius: 999, fontSize: "0.9rem", fontWeight: 600, color: "white", cursor: "pointer", textDecoration: "none", boxShadow: "0 4px 12px rgba(16,0,48,0.2)" }}>
          <CustomMail size={16} />
          Contact <span className="hide-mobile">{profile.name.split(" ")[0]}</span>
        </a>
      </motion.div>

      <style>{`
        @media(max-width: 500px) {
          .hide-mobile { display: none; }
        }
      `}</style>
    </div>
  );
}
