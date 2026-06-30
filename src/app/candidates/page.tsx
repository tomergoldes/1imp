"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  { icon: "🎯", title: "Stand out from 300 applicants", desc: "When a job posts, 200-400 people apply with a PDF. Your Video Story gives recruiters an instant reason to choose you." },
  { icon: "✦", title: "Visuals do the talking", desc: "No more wondering if the recruiter \"got\" you. A Web Story is a recruiter-ready narrative — sharp, visual, and fast." },
  { icon: "📊", title: "Track your views", desc: "Stop guessing. Get notified when a recruiter opens your video. See their company. Turn anxiety into intelligence." },
  { icon: "🔗", title: "One link. Every channel.", desc: "Your Video Link works in LinkedIn messages, cold emails, job applications, and QR codes. One link that works everywhere." },
  { icon: "🎬", title: "60 seconds to generate", desc: "Drop your resume, pick a vibe, and let AI do the rest. No video editing skills required." },
  { icon: "📈", title: "3x more callbacks", desc: "Candidates who use video stories get significantly higher response rates from hiring managers and recruiters." },
];

const useCases = [
  { persona: "Active job seeker", label: "Send your Video Link with every application", color: "#F0EEFB" },
  { persona: "Career changer", label: "Tell the story of your pivot visually, before the interview", color: "#FEF0F3" },
  { persona: "Recent graduate", label: "Turn a limited resume into a compelling Web Story", color: "#F0EEFB" },
  { persona: "Executive", label: "A premium video presentation that matches your seniority", color: "#FEF0F3" },
  { persona: "Freelancer", label: "Send clients a Video Profile instead of a boring rate card", color: "#F0EEFB" },
  { persona: "Passive seeker", label: "Keep a live video that speaks for you — even when you're not looking", color: "#FEF0F3" },
];

export default function CandidatesPage() {
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-60px" });

  return (
    <>
      <Navbar />
      <div style={{ background: "white", minHeight: "100vh", paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "65vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 32, margin: "0 24px" }}>

        {/* Background illustration */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/forcan.png"
            alt="Candidates Hero"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          {/* Overlay to ensure text readability */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(10,0,40,0.72) 0%, rgba(26,0,80,0.55) 50%, rgba(10,0,40,0.30) 100%)" }} />
        </div>

        {/* Hero text content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "6rem 1.5rem 5rem", maxWidth: 860, width: "100%" }}>
          <div style={{ position: "absolute", top: -80, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(99,97,184,0.15)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(232,53,90,0.1)", pointerEvents: "none" }} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(232,53,90,0.15)", border: "1px solid rgba(232,53,90,0.3)", borderRadius: 999, padding: "0.35rem 0.875rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#E8355A", letterSpacing: "0.1em", textTransform: "uppercase" }}>FOR CANDIDATES</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 720, margin: "0 auto 1.25rem" }}>
            You&apos;re not losing opportunities<br />because you lack talent.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}
            style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.8)", maxWidth: 520, margin: "0 auto 1rem", lineHeight: 1.65 }}>
            You&apos;re losing them because recruiters skim your PDF for 7 seconds.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
            style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.65 }}>
            1IMP turns your resume into an auto-playing Video Story that makes recruiters stop, watch, and respond.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/create" style={{ padding: "0.8rem 2rem", background: "#E8355A", color: "white", borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(232,53,90,0.4)" }}>
              Generate My Video — Free →
            </Link>
            <Link href="/" style={{ padding: "0.8rem 1.75rem", background: "rgba(255,255,255,0.12)", color: "white", borderRadius: 9999, fontSize: "1rem", fontWeight: 500, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(6px)" }}>
              Learn More
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }}
            style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", marginTop: "1.25rem" }}>
            Free forever &middot; No account required &middot; Ready in 60 seconds
          </motion.p>
        </div>
      </section>

      {/* Benefits grid */}
      <section ref={benefitsRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6361B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>WHY 1IMP</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#100030", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Everything you need to get noticed
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="cands-grid">
          {benefits.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ background: "white", borderRadius: 16, padding: "1.75rem", border: "1px solid rgba(99,82,138,0.12)", boxShadow: "0 2px 12px rgba(16,0,48,0.05)" }}
            >
              <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{b.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", color: "#100030", marginBottom: "0.625rem", lineHeight: 1.3 }}>{b.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#555570", lineHeight: 1.65 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section style={{ background: "white", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#E8355A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>WHO IT&apos;S FOR</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#100030", letterSpacing: "-0.02em" }}>
              Built for every stage of your career
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }} className="use-cases-grid">
            {useCases.map((uc, i) => (
              <div key={i} style={{ background: uc.color, borderRadius: 14, padding: "1.25rem 1.5rem", border: "1px solid rgba(99,82,138,0.1)" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6361B8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{uc.persona}</p>
                <p style={{ fontSize: "0.9375rem", color: "#100030", fontWeight: 500, lineHeight: 1.45 }}>{uc.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#100030", padding: "5rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "white", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
          Your next interview starts<br />with a viral video.
        </h2>
        <Link href="/create" style={{ display: "inline-flex", alignItems: "center", padding: "0.875rem 2.25rem", background: "#E8355A", color: "white", borderRadius: 9999, fontSize: "1.0625rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(232,53,90,0.4)" }}>
          Generate My Video →
        </Link>
      </section>

      <style>{`
        @media(max-width: 900px) { .cands-grid { grid-template-columns: 1fr !important; } .use-cases-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
    <Footer />
    </>
  );
}
