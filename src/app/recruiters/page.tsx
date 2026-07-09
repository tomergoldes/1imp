"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Smartphone, Bookmark, Link2, Users, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hierarchy = [
  { rank: "1", item: "The Hook", time: "0–3 sec", reason: "Photo, Name, Title, and Location. Instant human connection.", color: "#F0EEFB" },
  { rank: "2", item: "Experience Summary", time: "3–7 sec", reason: "\"What do they do?\" — answered visually and concisely.", color: "#FEF0F3" },
  { rank: "3", item: "Key Highlights", time: "7–12 sec", reason: "Biggest achievements. Quantified and highlighted.", color: "#F0EEFB" },
  { rank: "4", item: "Call to Action", time: "12–15 sec", reason: "Direct contact info and next steps to reach out.", color: "#FEF0F3" },
];

const recruiterBenefits = [
  { icon: <Image src="/3d-icons/icon_lightning_1783329191783.png" width={48} height={48} alt="Fast" style={{ mixBlendMode: "multiply", transform: "scale(1.2)" }} />, title: "Understand a candidate in 15 seconds", desc: "A Web Story replaces the first 30 seconds of a phone screen. You know who they are before you speak." },
  { icon: <Image src="/3d-icons/icon_smartphone_1783329283744.png" width={48} height={48} alt="Mobile" style={{ mixBlendMode: "multiply", transform: "scale(1.2)" }} />, title: "Mobile-first viewing", desc: "Watch candidate stories on your phone while commuting. Just tap to skip or go back." },
  { icon: <Image src="/3d-icons/icon_bookmark_1783329323869.png" width={48} height={48} alt="Save" style={{ mixBlendMode: "multiply", transform: "scale(1.2)" }} />, title: "Save and shortlist", desc: "Bookmark stories you love. Share the link with hiring managers. Build shortlists." },
  { icon: <Image src="/3d-icons/icon_camera_1783329168872.png" width={48} height={48} alt="Video" style={{ mixBlendMode: "multiply", transform: "scale(1.2)" }} />, title: "Request a Video Story", desc: "If a candidate sends a PDF, reply with a 1IMP invite. They'll generate a video for you in 60 seconds." },
  { icon: <Image src="/3d-icons/icon_users_1783329332600.png" width={48} height={48} alt="Team" style={{ mixBlendMode: "multiply", transform: "scale(1.2)" }} />, title: "Team collaboration", desc: "Share videos in Slack. Everyone gets it immediately without reading a doc." },
  { icon: <Image src="/3d-icons/icon_download_arrow_1783329349256.png" width={48} height={48} alt="Download" style={{ mixBlendMode: "multiply", transform: "scale(1.2)" }} />, title: "Download PDF anyway", desc: "Every video comes with the original PDF attached if your ATS requires it." },
];

export default function RecruitersPage() {
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
              alt="Recruiters Hero"
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
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(99,97,184,0.2)", border: "1px solid rgba(99,97,184,0.4)", borderRadius: 999, padding: "0.35rem 0.875rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#A09DE0", letterSpacing: "0.1em", textTransform: "uppercase" }}>FOR RECRUITERS</span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 760, margin: "0 auto 1.25rem" }}>
              Stop reading 300 PDFs.<br />Start watching 15-second stories.
            </motion.h1>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}
              style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.8)", maxWidth: 560, margin: "0 auto 1rem", lineHeight: 1.65 }}>
              1IMP gives you everything you need to evaluate a candidate in 15 seconds using an auto-playing visual story format.
            </motion.p>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
              style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.65 }}>
              Hook. Experience. Highlights. Contact. In exactly that order.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ padding: "0.8rem 2rem", background: "#6361B8", color: "white", borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(99,97,184,0.4)" }}>
                Request a demo →
              </Link>
              <Link href="/" style={{ padding: "0.8rem 1.75rem", background: "rgba(255,255,255,0.12)", color: "white", borderRadius: 9999, fontSize: "1rem", fontWeight: 500, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(6px)" }}>
                Learn More
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Benefits grid */}
        <section ref={benefitsRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6361B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>FOR YOUR WORKFLOW</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#100030", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Built around how you actually hire
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="rec-grid">
            {recruiterBenefits.map((b, i) => (
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

        {/* Hierarchy Section (Adapted into the Use Cases layout) */}
        <section style={{ background: "white", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#E8355A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>THE PHILOSOPHY</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#100030", letterSpacing: "-0.02em" }}>
                Designed for speed, not patience.
              </h2>
              <p style={{ fontSize: "1rem", color: "#555570", maxWidth: 540, margin: "1rem auto 0", lineHeight: 1.7 }}>
                We never force recruiters to watch hundreds of videos. Information is ordered by importance. You reach the decision you need — in seconds.
              </p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }} className="use-cases-grid">
              {hierarchy.map((h, i) => (
                <div key={i} style={{ background: h.color, borderRadius: 14, padding: "1.25rem 1.5rem", border: "1px solid rgba(99,82,138,0.1)", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 800, color: "#6361B8", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                      #{h.rank} &middot; {h.item}
                    </p>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "white", background: "#100030", padding: "0.2rem 0.5rem", borderRadius: 999 }}>
                      {h.time}
                    </div>
                  </div>
                  <p style={{ fontSize: "0.9375rem", color: "#100030", fontWeight: 500, lineHeight: 1.45, marginTop: "0.2rem" }}>{h.reason}</p>
                </div>
              ))}
            </div>
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
          @media(max-width: 900px) { .rec-grid { grid-template-columns: 1fr !important; } .use-cases-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
