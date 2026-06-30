"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    num: "01", icon: "📄",
    title: "Upload your career story",
    desc: "Drop your resume — PDF, Word, or plain text. Our AI reads every word and extracts the full picture of who you are professionally. Name, title, experience, skills, achievements. All in seconds.",
    detail: "Supports 500+ resume formats. No reformatting required.",
    accent: "#6361B8",
  },
  {
    num: "02", icon: "✦",
    title: "AI crafts your First Impression",
    desc: "Our AI writes your AI Summary — a 3-4 sentence narrative that captures the real you. Clear, compelling, and recruiter-ready. Not a list of job duties. A story of your impact.",
    detail: "Powered by GPT-4o. Editable. Regeneratable. Yours.",
    accent: "#E8355A",
  },
  {
    num: "03", icon: "🎨",
    title: "Build your Career Profile",
    desc: "In the split-screen editor, you see exactly what a recruiter will see — in real time. Refine your AI Summary. Add skills. Edit experience bullets. Choose your theme. Every change is instant.",
    detail: "Desktop + mobile preview. 12 premium themes. Autosave.",
    accent: "#6361B8",
  },
  {
    num: "04", icon: "🎬",
    title: "Record your Career Pitch (optional)",
    desc: "Add a 60-second Career Pitch — an AI-coached, teleprompter-guided video that lets your personality land before you even get to the interview. Optional, but powerful.",
    detail: "AI writes the script. You record it once. It works forever.",
    accent: "#E8355A",
  },
  {
    num: "05", icon: "🔗",
    title: "Share your Impression Link",
    desc: "Copy your personal Impression Link — 1imp.io/yourname — and send it everywhere. LinkedIn messages, job applications, email signatures, QR codes. One link. Every platform.",
    detail: "Beautiful Open Graph preview. Instant load. No account required to view.",
    accent: "#6361B8",
  },
  {
    num: "06", icon: "📊",
    title: "Know who's paying attention",
    desc: "Get real-time notifications when a recruiter opens your Career Profile. See which companies are looking. See which sections they spent time on. Turn anxiety into intelligence.",
    detail: "Company identification, time-on-page, section heatmap. (Pro)",
    accent: "#E8355A",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: "#F4F2FC", minHeight: "100vh", paddingTop: 64 }}>
        {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #100030 0%, #1E0060 100%)", padding: "6rem 1.5rem 5rem", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8355A", marginBottom: "1rem" }}>
          THE EXPERIENCE
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 680, margin: "0 auto 1.25rem" }}>
          From resume to First Impression<br />in under 3 minutes
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}
          style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.6)", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.65 }}>
          Here is exactly how 1IMP turns your career story into something recruiters actually notice.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>
          <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", padding: "0.8rem 2rem", background: "#E8355A", color: "white", borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(232,53,90,0.4)" }}>
            Create My First Impression →
          </Link>
        </motion.div>
      </section>

      {/* Steps */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 1.5rem" }}>
        {steps.map((step, i) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-60px" });
          return (
            <motion.div key={i} ref={ref}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "1.5rem", marginBottom: "3rem", alignItems: "flex-start" }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${step.accent}15`, border: `1.5px solid ${step.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                  {step.icon}
                </div>
                {i < steps.length - 1 && <div style={{ width: 2, height: 48, background: "rgba(99,82,138,0.15)", borderRadius: 1 }} />}
              </div>
              <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(99,82,138,0.12)", boxShadow: "0 2px 12px rgba(16,0,48,0.05)" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: step.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{step.num}</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "#100030", margin: "0.4rem 0 0.75rem", letterSpacing: "-0.01em" }}>{step.title}</h2>
                <p style={{ fontSize: "0.9375rem", color: "#444466", lineHeight: 1.7, marginBottom: "0.75rem" }}>{step.desc}</p>
                <p style={{ fontSize: "0.8rem", color: step.accent, fontWeight: 500 }}>→ {step.detail}</p>
              </div>
            </motion.div>
          );
        })}

        {/* CTA */}
        <div style={{ textAlign: "center", paddingTop: "2rem" }}>
          <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", padding: "0.875rem 2.25rem", background: "#100030", color: "white", borderRadius: 9999, fontSize: "1.0625rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(16,0,48,0.2)" }}>
            Start for free — no credit card →
          </Link>
          <p style={{ fontSize: "0.8125rem", color: "#9999AA", marginTop: "0.875rem" }}>Ready in under 3 minutes</p>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
