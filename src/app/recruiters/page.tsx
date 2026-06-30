"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hierarchy = [
  { rank: "1", item: "The Hook", time: "0–3 sec", reason: "Photo, Name, Title, and Location. Instant human connection." },
  { rank: "2", item: "Experience Summary", time: "3–7 sec", reason: "\"What do they do?\" — answered visually and concisely." },
  { rank: "3", item: "Key Highlights", time: "7–12 sec", reason: "Biggest achievements. Quantified and highlighted." },
  { rank: "4", item: "Call to Action", time: "12–15 sec", reason: "Direct contact info and next steps to reach out." },
];

const recruiterBenefits = [
  { icon: "⚡", title: "Understand a candidate in 15 seconds", desc: "A Web Story replaces the first 30 seconds of a phone screen. You know who they are before you speak." },
  { icon: "📱", title: "Mobile-first viewing", desc: "Watch candidate stories on your phone while commuting. Just tap to skip or go back." },
  { icon: "💾", title: "Save and shortlist", desc: "Bookmark stories you love. Share the link with hiring managers. Build shortlists." },
  { icon: "🔗", title: "Request a Video Story", desc: "If a candidate sends a PDF, reply with a 1IMP invite. They'll generate a video for you in 60 seconds." },
  { icon: "📊", title: "Team collaboration", desc: "Share videos in Slack. Everyone gets it immediately without reading a doc." },
  { icon: "📥", title: "Download PDF anyway", desc: "Every video comes with the original PDF attached if your ATS requires it." },
];

export default function RecruitersPage() {
  const hierarchyRef = useRef(null);
  const hierarchyInView = useInView(hierarchyRef, { once: true, margin: "-60px" });

  return (
    <>
      <Navbar />
      <div style={{ background: "#F4F2FC", minHeight: "100vh", paddingTop: 64 }}>
        {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #100030 0%, #1A0050 100%)", padding: "6rem 1.5rem 5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "rgba(99,97,184,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(99,97,184,0.2)", border: "1px solid rgba(99,97,184,0.4)", borderRadius: 999, padding: "0.35rem 0.875rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#A09DE0", letterSpacing: "0.1em", textTransform: "uppercase" }}>FOR RECRUITERS</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 760, margin: "0 auto 1.25rem" }}>
            Stop reading 300 PDFs.<br />Start watching 15-second stories.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}
            style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto 1rem", lineHeight: 1.65 }}>
            1IMP gives you everything you need to evaluate a candidate in 15 seconds using an auto-playing visual story format.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
            style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.35)", maxWidth: 480, margin: "0 auto 2.5rem" }}>
            Hook. Experience. Highlights. Contact. In exactly that order.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
            <Link href="/" style={{ padding: "0.8rem 2rem", background: "#6361B8", color: "white", borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(99,97,184,0.4)" }}>
              Request a demo →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Speed principle */}
      <section style={{ background: "white", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6361B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>THE PHILOSOPHY</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#100030", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "1rem" }}>
              Designed for speed, not patience.
            </h2>
            <p style={{ fontSize: "1rem", color: "#555570", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              We never force recruiters to watch hundreds of videos. Information is ordered by importance. You reach the decision you need — in seconds.
            </p>
          </div>

          {/* Information hierarchy */}
          <div ref={hierarchyRef} style={{ background: "#F4F2FC", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(99,82,138,0.12)" }}>
            <div style={{ padding: "1.25rem 1.75rem", background: "#100030", display: "flex", gap: "2rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", width: 28 }}>#</span>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", flex: 1 }}>SECTION</span>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", width: 90 }}>TIME</span>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", flex: 1 }}>WHY</span>
            </div>
            {hierarchy.map((row, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={hierarchyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                style={{ display: "flex", gap: "2rem", padding: "1rem 1.75rem", borderBottom: i < hierarchy.length - 1 ? "1px solid rgba(99,82,138,0.1)" : "none", alignItems: "center", background: i % 2 === 0 ? "white" : "#F8F7FD" }}
              >
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < 3 ? "rgba(232,53,90,0.12)" : "rgba(99,97,184,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.8rem", color: i < 3 ? "#E8355A" : "#6361B8", flexShrink: 0 }}>{row.rank}</div>
                <div style={{ flex: 1, fontWeight: 600, fontSize: "0.9rem", color: "#100030" }}>{row.item}</div>
                <div style={{ width: 90, fontSize: "0.8125rem", color: "#9999AA", fontWeight: 500 }}>{row.time}</div>
                <div style={{ flex: 1, fontSize: "0.8125rem", color: "#555570", lineHeight: 1.5 }}>{row.reason}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter benefits grid */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6361B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>FOR YOUR WORKFLOW</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#100030", letterSpacing: "-0.02em" }}>
            Built around how you actually hire
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="rec-grid">
          {recruiterBenefits.map((b, i) => (
            <div key={i} style={{ background: "white", borderRadius: 16, padding: "1.75rem", border: "1px solid rgba(99,82,138,0.12)" }}>
              <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{b.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", color: "#100030", marginBottom: "0.625rem", lineHeight: 1.3 }}>{b.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#555570", lineHeight: 1.65 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#100030", padding: "5rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "white", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
          The candidates you want<br />are already here.
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", lineHeight: 1.6 }}>Free to view. No account required to discover.</p>
        <Link href="/" style={{ display: "inline-flex", padding: "0.875rem 2.25rem", background: "#6361B8", color: "white", borderRadius: 9999, fontSize: "1.0625rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(99,97,184,0.4)" }}>
          Get early access →
        </Link>
      </section>

      <style>{`
        @media(max-width: 900px) { .rec-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
    <Footer />
    </>
  );
}
