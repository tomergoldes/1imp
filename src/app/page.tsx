"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { CustomArrowRight, CustomChevronLeft, CustomChevronRight, CustomCheck, ThemeIconWrapper } from "@/components/ui/CustomIcons";
import { Sparkles, Target, Share2, Link2, Search, TrendingDown, FileText, Mail, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const fv = (delay = 0): any => ({
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] } },
});

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ══════════════════════════════════════════════════════════════════════════
   HERO — exact Voyantis: rounded card, flowers illustration, coral + outline btns
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "20vh", overflow: "visible", zIndex: 20 }}>

          {/* Background image */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, overflow: "hidden" }}>
            <Image
              src="/MAIN.png"
              alt="Main Hero Background"
              fill
              style={{ objectFit: "cover", objectPosition: "bottom center" }}
              priority
            />
          </div>

          {/* Hero text content — sits above the background image */}
          <div style={{ textAlign: "center", padding: "3.5rem 2rem 2rem", position: "relative", zIndex: 10, maxWidth: 900, width: "100%" }}>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#6361B8", marginBottom: "1.1rem", fontFamily: "var(--font-body)",
              }}
            >
              AI VIDEO GENERATOR FOR CAREERS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 500,
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.15,
                letterSpacing: "-0.03em", color: "#100030", marginBottom: "1.25rem",
              }}
            >
              Turn your boring PDF resume<br />into a viral video in 60 seconds.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              style={{
                fontSize: "1rem", color: "#555570", lineHeight: 1.65,
                fontFamily: "var(--font-body)", maxWidth: 520, margin: "0 auto 1.75rem",
              }}
            >
              Recruiters don't read PDFs, they watch stories. Upload your resume and let our AI generate a stunning Web Story you can send directly to hiring managers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
              style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              {/* Coral primary */}
              <Link href="/create" style={{
                display: "inline-flex", alignItems: "center", padding: "0.75rem 1.75rem",
                background: "#FF3B6B", color: "white", borderRadius: 9999,
                border: "1.5px solid #100030",
                fontSize: "1rem", fontWeight: 600, textDecoration: "none",
                fontFamily: "var(--font-body)", 
                boxShadow: "inset 0px -3.5px 0px rgba(0,0,0,0.22)",
                transition: "all 160ms",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.05)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                Generate Your Video
              </Link>

              {/* Outline secondary */}
              <Link href="#how-it-works" style={{
                display: "inline-flex", alignItems: "center", padding: "0.75rem 1.75rem",
                background: "white", color: "#100030", borderRadius: 9999,
                border: "1px solid #6361B8", fontSize: "1rem", fontWeight: 500,
                textDecoration: "none", fontFamily: "var(--font-body)", transition: "all 160ms",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f4f4f8"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "white"; }}
              >
                Watch Demo
              </Link>
            </motion.div>
          </div>

    </section>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   CHALLENGE — sticky left headline + 3 scrolling cards on right
   Exact Voyantis "THE CHALLENGE" section
   ══════════════════════════════════════════════════════════════════════════ */
const challengeCards = [
  {
    icon: <Image src="/3d-icons/icon_chain_link_1783329003940.png" width={48} height={48} alt="Gap" style={{ mixBlendMode: "multiply", transform: "scale(1.2)" }} />, title: "The Gap",
    bold: "Recruiters have a 7-second window to notice each candidate.",
    rest: " But for most professionals, their true value won't be clear in that moment.",
  },
  {
    icon: <Image src="/3d-icons/icon_magnifying_glass_1783329011658.png" width={48} height={48} alt="Search" style={{ mixBlendMode: "multiply", transform: "scale(1.2)" }} />, title: "The Stand-In",
    bold: "So teams fall back on PDFs and keyword matching.",
    rest: " But that only tells hiring teams to find more people who applied, not more people worth hiring.",
  },
  {
    icon: <Image src="/3d-icons/icon_chart_down_1783329019359.png" width={48} height={48} alt="Result" style={{ mixBlendMode: "multiply", transform: "scale(1.2)" }} />, title: "The Result",
    bold: "Hiring keeps running, but the best candidates quietly get passed over.",
    rest: " By the time someone notices, the damage is months in the making.",
  },
];

function ChallengeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="challenge" style={{
      background: "linear-gradient(180deg, #ECEEF8 0%, #E4E0F4 60%, #DDD8F0 100%)",
      padding: "6rem 0 7rem",
      position: "relative",
      overflow: "hidden", 
      zIndex: 20,
      borderTopLeftRadius: 48,
      borderTopRightRadius: 48
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* CENTERED HEADER */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <motion.p variants={fv(0)} animate={inView ? "visible" : "hidden"} style={{
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#E8355A", marginBottom: "1rem",
          }}>
            THE CHALLENGE
          </motion.p>
          <motion.h2 variants={fv(0.08)} animate={inView ? "visible" : "hidden"} style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#100030",
            lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 800, margin: "0 auto"
          }}>
            Stop blending into a pile of 500 identical PDFs
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="challenge-layout">

          {/* LEFT: Beautiful Video Frame Mockup */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 }} style={{ position: "relative", width: "100%", maxWidth: 320, margin: "0 auto" }}>
             <div style={{ 
               background: "white", borderRadius: 32, padding: "12px", 
               boxShadow: "0 32px 64px rgba(16,0,48,0.12)", 
               border: "1px solid rgba(99,82,138,0.15)",
               transform: "rotate(-2deg)", transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
               width: "100%"
             }} onMouseEnter={e => e.currentTarget.style.transform = "rotate(0deg) scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = "rotate(-2deg) scale(1)"}>
               <div style={{ background: "#100030", borderRadius: 20, overflow: "hidden", position: "relative", aspectRatio: "9/16", width: "100%" }}>
                 {/* Clean generic video placeholder */}
                 <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #2A1F45 0%, #100030 100%)" }} />
                 <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 30%, rgba(99,97,184,0.4) 0%, transparent 60%)" }} />
                 
                 {/* Play button */}
                 <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 80, height: 80, borderRadius: "50%", background: "rgba(232,53,90,0.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 32px rgba(232,53,90,0.4)", transition: "transform 200ms" }} onMouseEnter={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}>
                   <div style={{ width: 0, height: 0, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: "22px solid white", marginLeft: 6 }} />
                 </div>
               </div>
             </div>
             
             {/* Decorative glows behind frame */}
             <div style={{ position: "absolute", top: -30, right: -30, width: 200, height: 200, borderRadius: "50%", background: "rgba(232,53,90,0.15)", filter: "blur(40px)", zIndex: -1, pointerEvents: "none" }} />
             <div style={{ position: "absolute", bottom: -30, left: -40, width: 250, height: 250, borderRadius: "50%", background: "rgba(99,97,184,0.15)", filter: "blur(40px)", zIndex: -1, pointerEvents: "none" }} />
          </motion.div>

          {/* RIGHT: stacked cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", paddingTop: "0.5rem" }}>
            {challengeCards.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "white",
                  border: "1px solid rgba(99,82,138,0.18)", borderRadius: 16,
                  padding: "1.5rem", boxShadow: "0 2px 16px rgba(16,0,48,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{
                    width: 56, height: 56,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, overflow: "visible",
                  }}>
                    {card.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#100030", marginBottom: "0.5rem" }}>
                      {card.title}
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#444466", lineHeight: 1.65 }}>
                      <em style={{ fontStyle: "italic", fontWeight: 600, color: "#6361B8" }}>{card.bold}</em>
                      {card.rest}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .challenge-layout{ grid-template-columns:1fr!important; gap:2rem!important; } }`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS (4-tab section) — exact Voyantis "01 Predict / 02 Signal..."
   ══════════════════════════════════════════════════════════════════════════ */
const tabs = [
  {
    num: "01", title: "Drop Resume",
    desc: "Paste your resume or LinkedIn profile. Our AI extracts the most impressive signals and ignores the fluff.",
    detail: "Supports PDF, Word, and plain text. Parses 500+ resume formats.",
  },
  {
    num: "02", title: "Human Touch",
    desc: "Upload 1-2 professional photos and choose your video vibe (Dynamic Tech, Corporate Clean, Creative Bold).",
    detail: "Videos with faces get 3x more recruiter engagement.",
  },
  {
    num: "03", title: "AI Generation",
    desc: "Sit back while our AI writes the script, generates the animations, and produces a stunning Web Story in 60 seconds.",
    detail: "Powered by advanced language models and Framer Motion.",
  },
  {
    num: "04", title: "Share Story",
    desc: "Send your 1IMP link to recruiters. They watch your story exactly like an Instagram Story, directly in their browser.",
    detail: "No app required. Works perfectly on mobile and desktop.",
  },
];

function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActive(0);
    else if (latest < 0.5) setActive(1);
    else if (latest < 0.75) setActive(2);
    else setActive(3);
  });

  const magicX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const magicScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const magicRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  // The dark chart card at the top (like Voyantis flow diagram)
  return (
    <section id="how-it-works" ref={ref} style={{ background: "#F4F2FC", padding: "6rem 0", position: "relative", overflow: "visible", zIndex: 25 }}>
      {/* Vector Cloud Divider pointing UP into the previous section */}
      <div style={{ position: "absolute", top: "-50px", left: 0, right: 0, height: "50px", zIndex: 10, width: "100%", overflow: "hidden" }}>
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
          
          {/* Layer 1: Darkest accent (shadow/back) - connects to #DDD8F0 */}
          <path fill="#E4E0F4" d="
            M0,50 L0,35
            C30,20 60,15 90,25
            C120,5 170,0 220,15
            C260,0 320,-5 380,10
            C420,-10 490,-5 550,15
            C590,0 660,-5 720,10
            C760,-5 820,0 880,15
            C920,0 980,-10 1040,5
            C1080,-5 1140,-5 1200,10
            C1250,-5 1310,0 1370,15
            C1400,5 1420,15 1440,25
            L1440,50 Z
          " transform="translate(-10, -5)" />

          {/* Layer 2: Mid-tone (middle) */}
          <path fill="#EBE9F6" d="
            M0,50 L0,35
            C30,20 60,15 90,25
            C120,5 170,0 220,15
            C260,0 320,-5 380,10
            C420,-10 490,-5 550,15
            C590,0 660,-5 720,10
            C760,-5 820,0 880,15
            C920,0 980,-10 1040,5
            C1080,-5 1140,-5 1200,10
            C1250,-5 1310,0 1370,15
            C1400,5 1420,15 1440,25
            L1440,50 Z
          " transform="translate(10, -2)" />

          {/* Layer 3: Foreground (Matches #F4F2FC HowItWorksSection background) */}
          <path fill="#F4F2FC" d="
            M0,50 L0,35
            C30,20 60,15 90,25
            C120,5 170,0 220,15
            C260,0 320,-5 380,10
            C420,-10 490,-5 550,15
            C590,0 660,-5 720,10
            C760,-5 820,0 880,15
            C920,0 980,-10 1040,5
            C1080,-5 1140,-5 1200,10
            C1250,-5 1310,0 1370,15
            C1400,5 1420,15 1440,25
            L1440,50 Z
          " />
        </svg>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* SECTION TITLE */}
        <div style={{ textAlign: "center", marginBottom: "4rem", marginTop: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#100030", letterSpacing: "-0.02em" }}>
            How it works
          </h2>
        </div>

        {/* TABS ROW */}
        <div ref={scrollContainerRef} className="scroll-jack-container">
          <div className="scroll-jack-sticky">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", alignItems: "flex-start" }} className="tabs-grid">
              {tabs.map((tab, i) => {
            const isActive = active === i;
            return (
              <motion.div 
                key={i} 
                onClick={() => setActive(i)}
                initial={{ opacity: 1, y: 0 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                style={{
                  background: isActive ? "white" : "#EBE9F5",
                  borderRadius: 12,
                  padding: "1.5rem",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 10px 40px rgba(16,0,48,0.06)" : "none",
                  transition: "all 200ms",
                  display: "flex", flexDirection: "column",
                  border: isActive ? "1px solid rgba(16,0,48,0.04)" : "1px solid transparent",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: isActive ? "#6361B8" : "#9B97C8", marginBottom: "1rem" }}>
                  {tab.num}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: isActive ? "#100030" : "#9B97C8", marginBottom: isActive ? "1rem" : 0 }}>
                  {tab.title}
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                      <p style={{ fontSize: "0.85rem", color: "#555570", lineHeight: 1.6, marginBottom: "1rem", marginTop: "1rem" }}>{tab.desc}</p>
                      <p style={{ fontSize: "0.75rem", color: "#9B97C8", lineHeight: 1.5 }}>{tab.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
            </div>
            
            {/* Scroll-Linked Magic Animation */}
            <motion.div style={{ x: magicX, scale: magicScale, rotate: magicRotate, marginTop: "4rem", display: "flex", justifyContent: "center", width: "100%" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: 1000, height: 400 }}>
                 <Image src="/images/scroll-magic-2.png" fill style={{ objectFit: "contain", mixBlendMode: "multiply" }} alt="Magic scroll animation" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* FEATURES ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="features-grid">
          {[
            {
              icon: (
                <Image src="/3d-icons/icon_sparkles_1783329034405.png" width={44} height={44} alt="AI" style={{ mixBlendMode: "multiply", transform: "scale(1.3)" }} />
              ),
              subtitle: "AI-POWERED", subtitleColor: "#6361B8",
              title: "Your story, written brilliantly",
              text: "Drop your resume and watch our AI craft a professional summary that sounds exactly like you — only sharper. Every bullet rewritten for impact. Every skill surfaced for relevance.",
              topBg: "#ECECF6", checkColor: "#6361B8",
              bullets: ["Professional summary in seconds", "Achievement bullets rewritten for impact", "Skills automatically ranked by relevance"]
            },
            {
              icon: (
                <Image src="/3d-icons/icon_target_1783329042315.png" width={44} height={44} alt="Analytics" style={{ mixBlendMode: "multiply", transform: "scale(1.3)" }} />
              ),
              subtitle: "ANALYTICS", subtitleColor: "#E8355A",
              title: "See who's interested, before they call",
              text: "Get real-time notifications when someone views your impression. Know which companies are looking, how long they spent, and which sections grabbed their attention.",
              topBg: "#FDE8EA", checkColor: "#E8355A",
              bullets: ["Real-time view notifications", "Company identification (Pro)", "Section engagement heatmap"]
            },
            {
              icon: (
                <Image src="/3d-icons/icon_megaphone_1783329051654.png" width={44} height={44} alt="Share" style={{ mixBlendMode: "multiply", transform: "scale(1.3)" }} />
              ),
              subtitle: "SHARE ANYWHERE", subtitleColor: "#100030",
              title: "One link. Every platform. Instant wow.",
              text: "Your personalized 1IMP link works everywhere — LinkedIn messages, email signatures, job applications, QR codes. Beautiful Open Graph previews make every share count.",
              topBg: "#E8EAF2", checkColor: "#100030",
              bullets: ["Custom yourname.1imp.io URL", "Beautiful Open Graph previews", "QR code + one-click copy"]
            }
          ].map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 1, y: 0 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.55 }}
              style={{ borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 10px 40px rgba(16,0,48,0.04)", border: "1px solid rgba(16,0,48,0.05)" }}
            >
              <div style={{ background: feat.topBg, padding: "2.5rem 2rem 2.5rem" }}>
                <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  {feat.icon}
                </div>
                <div style={{ fontSize: "0.65rem", fontWeight: 800, color: feat.subtitleColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
                  {feat.subtitle}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "#100030", marginBottom: "1rem", lineHeight: 1.25 }}>
                  {feat.title}
                </div>
                <p style={{ fontSize: "0.9rem", color: "#555570", lineHeight: 1.6, margin: 0 }}>
                  {feat.text}
                </p>
              </div>
              <div style={{ background: "white", padding: "2rem", flexGrow: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {feat.bullets.map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <CustomCheck size={18} color="white" accentColor={feat.checkColor} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "0.85rem", color: "#444466", fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <style>{`
          .scroll-jack-container {
            height: 300vh;
            position: relative;
            margin-bottom: 6rem;
          }
          .scroll-jack-sticky {
            position: sticky;
            top: 20vh;
          }
          @media(max-width: 1024px) {
            .tabs-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .features-grid { grid-template-columns: 1fr !important; }
            .scroll-jack-container { height: auto; }
            .scroll-jack-sticky { position: relative; top: 0; }
          }
          @media(max-width: 600px) {
            .tabs-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

const LeavesSVG = ({ theme }: { theme: string }) => {
  const svgStyle = { width: "185%", height: "185%", position: "absolute" as const, bottom: -45, left: "-42.5%", overflow: "visible" };

  if (theme === "orange-grass") {
    return (
      <svg viewBox="0 0 380 290" preserveAspectRatio="xMidYMax meet" style={svgStyle}>
        <defs>
          <linearGradient id="st1" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#7A3525"/><stop offset="100%" stopColor="#DF8F5B"/></linearGradient>
          <linearGradient id="st2" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#5E180E"/><stop offset="100%" stopColor="#C47040"/></linearGradient>
          <linearGradient id="st3" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#9C4428"/><stop offset="100%" stopColor="#F5B27A"/></linearGradient>
          <linearGradient id="st4" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#4A1005"/><stop offset="100%" stopColor="#A85830"/></linearGradient>
        </defs>

        {/* Straight sticks radiating from a central bottom point (going further down to overflow!) */}
        <g strokeLinecap="round">
          {/* Far Left */}
          <line x1="190" y1="360" x2="60" y2="100" stroke="url(#st4)" strokeWidth="16" />
          <line x1="190" y1="360" x2="80" y2="150" stroke="url(#st2)" strokeWidth="12" />
          
          {/* Mid Left */}
          <line x1="190" y1="360" x2="110" y2="80" stroke="url(#st3)" strokeWidth="15" />
          <line x1="190" y1="360" x2="140" y2="50" stroke="url(#st1)" strokeWidth="18" />
          
          {/* Center */}
          <line x1="190" y1="360" x2="185" y2="30" stroke="url(#st3)" strokeWidth="14" />
          <line x1="190" y1="360" x2="210" y2="60" stroke="url(#st1)" strokeWidth="12" />

          {/* Mid Right */}
          <line x1="190" y1="360" x2="240" y2="70" stroke="url(#st2)" strokeWidth="16" />
          <line x1="190" y1="360" x2="280" y2="90" stroke="url(#st3)" strokeWidth="14" />
          
          {/* Far Right */}
          <line x1="190" y1="360" x2="310" y2="130" stroke="url(#st1)" strokeWidth="12" />
          <line x1="190" y1="360" x2="330" y2="100" stroke="url(#st4)" strokeWidth="18" />
        </g>
      </svg>
    );
  }

  if (theme === "green") {
    return (
      <svg viewBox="0 0 380 290" preserveAspectRatio="xMidYMax meet" style={svgStyle}>
        <defs>
          <linearGradient id="gr1" x1="0.4" y1="1" x2="0.6" y2="0"><stop offset="0%" stopColor="#0B3045"/><stop offset="100%" stopColor="#4AA09A"/></linearGradient>
          <linearGradient id="gr2" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#124855"/><stop offset="100%" stopColor="#6CD0BA"/></linearGradient>
          <linearGradient id="gr3" x1="0.6" y1="1" x2="0.4" y2="0"><stop offset="0%" stopColor="#0F3A4B"/><stop offset="100%" stopColor="#58B2A6"/></linearGradient>
          <linearGradient id="gr4" x1="0.3" y1="1" x2="0.7" y2="0"><stop offset="0%" stopColor="#17505C"/><stop offset="100%" stopColor="#7AE5CD"/></linearGradient>
          <linearGradient id="gr5" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#08253A"/><stop offset="100%" stopColor="#3C8A85"/></linearGradient>
        </defs>

        {/* Back-left wide drooping leaf */}
        <path d="M 190 285 C 170 265 110 230 40 200 C 55 185 120 220 165 268 Z" fill="url(#gr1)" />
        <line x1="190" y1="285" x2="60" y2="198" stroke="rgba(100,220,200,0.35)" strokeWidth="2" />

        {/* Back-right wide drooping leaf */}
        <path d="M 190 285 C 210 265 270 230 340 200 C 325 185 260 220 215 268 Z" fill="url(#gr1)" />
        <line x1="190" y1="285" x2="320" y2="198" stroke="rgba(100,220,200,0.35)" strokeWidth="2" />

        {/* Left leaf */}
        <path d="M 188 288 C 165 260 110 210 60 145 C 80 140 128 196 168 272 Z" fill="url(#gr2)" />
        <line x1="188" y1="288" x2="78" y2="148" stroke="rgba(150,240,220,0.4)" strokeWidth="2" />

        {/* Right leaf */}
        <path d="M 192 288 C 215 260 270 210 320 145 C 300 140 252 196 212 272 Z" fill="url(#gr3)" />
        <line x1="192" y1="288" x2="302" y2="148" stroke="rgba(120,230,210,0.4)" strokeWidth="2" />

        {/* Center-left leaf */}
        <path d="M 188 290 C 172 258 142 195 118 110 C 136 108 160 180 180 278 Z" fill="url(#gr3)" />
        <line x1="186" y1="290" x2="122" y2="112" stroke="rgba(120,230,210,0.45)" strokeWidth="2" />

        {/* Center-right leaf */}
        <path d="M 192 290 C 208 258 238 195 262 110 C 244 108 220 180 200 278 Z" fill="url(#gr4)" />
        <line x1="194" y1="290" x2="258" y2="112" stroke="rgba(160,255,230,0.45)" strokeWidth="2" />

        {/* Front center leaf */}
        <path d="M 190 290 C 180 255 168 190 160 100 C 172 96 188 175 192 285 Z" fill="url(#gr2)" />
        <line x1="190" y1="290" x2="163" y2="102" stroke="rgba(150,240,220,0.5)" strokeWidth="2" />
      </svg>
    );
  }

  if (theme === "orange") {
    return (
      <svg viewBox="0 0 380 290" preserveAspectRatio="xMidYMax meet" style={svgStyle}>
        <defs>
          <linearGradient id="or1" x1="0.4" y1="1" x2="0.6" y2="0"><stop offset="0%" stopColor="#8B3010"/><stop offset="100%" stopColor="#E8956A"/></linearGradient>
          <linearGradient id="or2" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#B8451C"/><stop offset="100%" stopColor="#F5B88A"/></linearGradient>
          <linearGradient id="or3" x1="0.6" y1="1" x2="0.4" y2="0"><stop offset="0%" stopColor="#D16030"/><stop offset="100%" stopColor="#FAD0A0"/></linearGradient>
          <linearGradient id="or4" x1="0.3" y1="1" x2="0.7" y2="0"><stop offset="0%" stopColor="#E8855C"/><stop offset="100%" stopColor="#FCDDB8"/></linearGradient>
          <linearGradient id="or5" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#C07040"/><stop offset="100%" stopColor="#FAEACF"/></linearGradient>
        </defs>

        {/* Back-left wide drooping leaf */}
        <path d="M 190 285 C 170 265 110 230 40 200 C 55 185 120 220 165 268 Z" fill="url(#or1)" />
        <line x1="190" y1="285" x2="60" y2="198" stroke="rgba(255,200,160,0.35)" strokeWidth="2" />

        {/* Back-right wide drooping leaf */}
        <path d="M 190 285 C 210 265 270 230 340 200 C 325 185 260 220 215 268 Z" fill="url(#or1)" />
        <line x1="190" y1="285" x2="320" y2="198" stroke="rgba(255,200,160,0.35)" strokeWidth="2" />

        {/* Left leaf */}
        <path d="M 188 288 C 165 260 110 210 60 145 C 80 140 128 196 168 272 Z" fill="url(#or2)" />
        <line x1="188" y1="288" x2="78" y2="148" stroke="rgba(255,210,170,0.4)" strokeWidth="2" />

        {/* Right leaf */}
        <path d="M 192 288 C 215 260 270 210 320 145 C 300 140 252 196 212 272 Z" fill="url(#or3)" />
        <line x1="192" y1="288" x2="302" y2="148" stroke="rgba(255,210,170,0.4)" strokeWidth="2" />

        {/* Center-left leaf */}
        <path d="M 188 290 C 172 258 142 195 118 110 C 136 108 160 180 180 278 Z" fill="url(#or3)" />
        <line x1="186" y1="290" x2="122" y2="112" stroke="rgba(255,215,175,0.45)" strokeWidth="2" />

        {/* Center-right leaf */}
        <path d="M 192 290 C 208 258 238 195 262 110 C 244 108 220 180 200 278 Z" fill="url(#or4)" />
        <line x1="194" y1="290" x2="258" y2="112" stroke="rgba(255,215,175,0.45)" strokeWidth="2" />

        {/* Front center leaf */}
        <path d="M 190 290 C 180 255 168 190 160 100 C 172 96 188 175 192 285 Z" fill="url(#or2)" />
        <line x1="190" y1="290" x2="163" y2="102" stroke="rgba(255,220,185,0.5)" strokeWidth="2" />
      </svg>
    );
  }

  // BLUE SHARP (Shippo)
  if (theme === "blue-sharp") {
    return (
      <svg viewBox="0 0 380 290" preserveAspectRatio="xMidYMax meet" style={svgStyle}>
        <defs>
          <linearGradient id="bl1" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#25387A"/><stop offset="100%" stopColor="#8DA3FF"/></linearGradient>
          <linearGradient id="bl2" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#1A2859"/><stop offset="100%" stopColor="#6C83E5"/></linearGradient>
          <linearGradient id="bl3" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#31448C"/><stop offset="100%" stopColor="#A2B6FF"/></linearGradient>
          <linearGradient id="bl4" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#131D42"/><stop offset="100%" stopColor="#5B70CB"/></linearGradient>
          <linearGradient id="bl5" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#0A0F26"/><stop offset="100%" stopColor="#4A5CB5"/></linearGradient>
        </defs>

        {/* Far-left blade */}
        <path d="M 185 290 C 175 268 148 212 100 128 C 104 124 110 122 114 125 C 158 212 178 270 188 290 Z" fill="url(#bl5)" />
        <line x1="187" y1="290" x2="107" y2="126" stroke="rgba(180,200,255,0.35)" strokeWidth="1.5" />

        {/* Left-2 blade */}
        <path d="M 186 290 C 178 268 158 208 136 115 C 140 112 145 111 148 113 C 168 208 181 270 189 290 Z" fill="url(#bl3)" />
        <line x1="187" y1="290" x2="142" y2="113" stroke="rgba(180,200,255,0.35)" strokeWidth="1.5" />

        {/* Left-3 blade */}
        <path d="M 187 290 C 182 268 168 206 158 108 C 162 106 167 105 169 107 C 177 206 185 269 190 290 Z" fill="url(#bl1)" />
        <line x1="187" y1="290" x2="164" y2="107" stroke="rgba(190,210,255,0.4)" strokeWidth="1.5" />

        {/* Left-4 blade — near vertical */}
        <path d="M 188 290 C 184 268 179 202 176 95 C 180 93 184 93 185 95 C 187 202 189 269 191 290 Z" fill="url(#bl2)" />
        <line x1="188" y1="290" x2="181" y2="95" stroke="rgba(195,215,255,0.45)" strokeWidth="1.5" />

        {/* Center blade — tallest */}
        <path d="M 190 290 C 188 264 187 195 187 70 C 190 68 193 68 193 70 C 193 195 192 264 192 290 Z" fill="url(#bl1)" />
        <line x1="190" y1="290" x2="190" y2="70" stroke="rgba(200,220,255,0.55)" strokeWidth="2" />

        {/* Right-1 blade — near vertical */}
        <path d="M 192 290 C 196 268 201 202 204 95 C 205 93 209 93 210 95 C 208 202 201 269 194 290 Z" fill="url(#bl2)" />
        <line x1="193" y1="290" x2="207" y2="95" stroke="rgba(195,215,255,0.45)" strokeWidth="1.5" />

        {/* Right-2 blade */}
        <path d="M 193 290 C 199 268 212 206 222 108 C 224 106 229 105 231 107 C 220 206 205 269 196 290 Z" fill="url(#bl1)" />
        <line x1="194" y1="290" x2="227" y2="107" stroke="rgba(190,210,255,0.4)" strokeWidth="1.5" />

        {/* Right-3 blade */}
        <path d="M 194 290 C 202 268 222 208 244 115 C 248 112 253 111 255 113 C 232 208 208 270 197 290 Z" fill="url(#bl3)" />
        <line x1="195" y1="290" x2="251" y2="113" stroke="rgba(180,200,255,0.35)" strokeWidth="1.5" />

        {/* Far-right blade */}
        <path d="M 195 290 C 206 268 232 212 280 128 C 284 124 290 122 293 125 C 246 212 215 270 198 290 Z" fill="url(#bl5)" />
        <line x1="196" y1="290" x2="287" y2="126" stroke="rgba(180,200,255,0.35)" strokeWidth="1.5" />
      </svg>
    );
  }

  if (theme === "orange-flower") {
    return (
      <svg viewBox="0 0 380 290" preserveAspectRatio="xMidYMax meet" style={svgStyle}>
        <defs>
          <linearGradient id="fl1" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#8B3010"/><stop offset="100%" stopColor="#E8956A"/></linearGradient>
          <linearGradient id="fl2" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#B8451C"/><stop offset="100%" stopColor="#F5B88A"/></linearGradient>
          <linearGradient id="fl3" x1="0.6" y1="1" x2="0.4" y2="0"><stop offset="0%" stopColor="#D16030"/><stop offset="100%" stopColor="#FAD0A0"/></linearGradient>
          <linearGradient id="fl4" x1="0.3" y1="1" x2="0.7" y2="0"><stop offset="0%" stopColor="#E8855C"/><stop offset="100%" stopColor="#FCDDB8"/></linearGradient>
          <linearGradient id="fl5" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#C07040"/><stop offset="100%" stopColor="#FAEACF"/></linearGradient>
        </defs>

        {/* Far-left drooping petal */}
        <path d="M 190 290 C 160 260 90 200 40 140 C 60 130 110 200 170 280 Z" fill="url(#fl1)" />
        <line x1="190" y1="290" x2="45" y2="138" stroke="rgba(255,200,160,0.35)" strokeWidth="2" />

        {/* Far-right drooping petal */}
        <path d="M 190 290 C 220 260 290 200 340 140 C 320 130 270 200 210 280 Z" fill="url(#fl1)" />
        <line x1="190" y1="290" x2="335" y2="138" stroke="rgba(255,200,160,0.35)" strokeWidth="2" />

        {/* Mid-left curved petal */}
        <path d="M 190 290 C 170 250 110 160 80 80 C 100 85 140 170 180 280 Z" fill="url(#fl2)" />
        <line x1="190" y1="290" x2="85" y2="82" stroke="rgba(255,210,170,0.4)" strokeWidth="2" />

        {/* Mid-right curved petal */}
        <path d="M 190 290 C 210 250 270 160 300 80 C 280 85 240 170 200 280 Z" fill="url(#fl3)" />
        <line x1="190" y1="290" x2="295" y2="82" stroke="rgba(255,210,170,0.4)" strokeWidth="2" />

        {/* Inner-left tall petal */}
        <path d="M 190 290 C 180 240 150 130 130 40 C 145 45 165 140 185 285 Z" fill="url(#fl3)" />
        <line x1="190" y1="290" x2="135" y2="43" stroke="rgba(255,215,175,0.45)" strokeWidth="2" />

        {/* Inner-right tall petal */}
        <path d="M 190 290 C 200 240 230 130 250 40 C 235 45 215 140 195 285 Z" fill="url(#fl4)" />
        <line x1="190" y1="290" x2="245" y2="43" stroke="rgba(255,215,175,0.45)" strokeWidth="2" />

        {/* Central bud / main petal */}
        <path d="M 185 290 C 170 230 160 120 190 50 C 220 120 210 230 195 290 Z" fill="url(#fl5)" />
        <line x1="190" y1="290" x2="190" y2="50" stroke="rgba(255,240,200,0.6)" strokeWidth="2" />
      </svg>
    );
  }

  return null;
};

const stories = [
  {
    brand: "PDF Resume", textBg: "#FEF4ED", borderColor: "#884230", labelColor: "#E86F3E", statBg: "#FFF3EC", statColor: "#C43B0E", Icon: FileText,
    bgGradient: "linear-gradient(180deg, #EBA282 0%, #4D1A39 100%)", foldColor: "#B55A3D",
    stat1: "0%", stat1Label: "personality shown",
    stat2: "10%", stat2Label: "callback rate",
    headline: "Why 90% of PDF Resumes get ignored by ATS and recruiters",
    tagline: "The Old Way",
    desc: "A standard PDF is static, lacks personality, and gets lost in the pile of thousands of identical applications. Time for an upgrade.",
    theme: "orange-flower",
  },
  {
    brand: "Cover Letter", textBg: "#F0F4FF", borderColor: "#6C7EE5", labelColor: "#5C6CD1", statBg: "#E3EAFA", statColor: "#2D3B8E", Icon: Mail,
    bgGradient: "linear-gradient(180deg, #91A8FC 0%, #202D73 100%)", foldColor: "#6173D1",
    stat1: "6s", stat1Label: "avg reading time",
    stat2: "90%", stat2Label: "are ignored",
    headline: "No one reads your 500-word cover letter anymore",
    tagline: "The Old Way",
    desc: "Recruiters spend 6 seconds per application. A long wall of text is the fastest way to get skipped by hiring managers.",
    theme: "blue-sharp",
  },
  {
    brand: "1IMP Video", textBg: "#E4F6F5", borderColor: "#428B83", labelColor: "#4E9A92", statBg: "#E4F6F5", statColor: "#133B5C", Icon: Video,
    bgGradient: "linear-gradient(180deg, #6CD0BA 0%, #133B5C 100%)", foldColor: "#67A69C",
    stat1: "2x", stat1Label: "more interviews",
    stat2: "100%", stat2Label: "stand-out rate",
    headline: "How candidates double their interview rate using 1IMP Video",
    tagline: "The New Standard",
    desc: "Let your personality shine. Generate an AI video pitch that hooks recruiters instantly and lands you the interview.",
    theme: "green",
  },
];

function SuccessStoriesSection() {
  const [active, setActive] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#FDFDFD", padding: "7rem 0 6rem", position: "relative", zIndex: 20 }}>
      {/* Vector Cloud Divider pointing DOWN from the previous section */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50px", zIndex: 10, width: "100%", overflow: "hidden", transform: "rotate(180deg)" }}>
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
          
          {/* Layer 1: Darkest accent (shadow/back) */}
          <path fill="#E4E0F4" d="
            M0,50 L0,35
            C30,20 60,15 90,25
            C120,5 170,0 220,15
            C260,0 320,-5 380,10
            C420,-10 490,-5 550,15
            C590,0 660,-5 720,10
            C760,-5 820,0 880,15
            C920,0 980,-10 1040,5
            C1080,-5 1140,-5 1200,10
            C1250,-5 1310,0 1370,15
            C1400,5 1420,15 1440,25
            L1440,50 Z
          " transform="translate(-10, -5)" />

          {/* Layer 2: Mid-tone (middle) */}
          <path fill="#EBE9F6" d="
            M0,50 L0,35
            C30,20 60,15 90,25
            C120,5 170,0 220,15
            C260,0 320,-5 380,10
            C420,-10 490,-5 550,15
            C590,0 660,-5 720,10
            C760,-5 820,0 880,15
            C920,0 980,-10 1040,5
            C1080,-5 1140,-5 1200,10
            C1250,-5 1310,0 1370,15
            C1400,5 1420,15 1440,25
            L1440,50 Z
          " transform="translate(10, -2)" />

          {/* Layer 3: Foreground (Matches #F4F2FC) */}
          <path fill="#F4F2FC" d="
            M0,50 L0,35
            C30,20 60,15 90,25
            C120,5 170,0 220,15
            C260,0 320,-5 380,10
            C420,-10 490,-5 550,15
            C590,0 660,-5 720,10
            C760,-5 820,0 880,15
            C920,0 980,-10 1040,5
            C1080,-5 1140,-5 1200,10
            C1250,-5 1310,0 1370,15
            C1400,5 1420,15 1440,25
            L1440,50 Z
          " />
        </svg>
      </div>
      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.h2 {...fv(0)} animate={inView ? "visible" : "hidden"} style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#100030",
          textAlign: "center", letterSpacing: "-0.02em", lineHeight: 1.2,
          margin: "0 auto 4.5rem", maxWidth: 640,
        }}>
          See how candidates are winning with 1IMP
        </motion.h2>

        {/* ── 3-CARD ROW ── */}
        <div style={{
          display: "flex", gap: 32, alignItems: "flex-start",
          justifyContent: "center",
        }}>
          {stories.map((story, i) => {
            const isActive = i === active;
            return (
              <div key={i} style={{ display: "flex", position: "relative" }}>
                
                {/* ── LEFT COLUMN (Always visible) ── */}
                <motion.div
                  onClick={() => setActive(i)}
                  style={{
                    width: 320,
                    borderRadius: 20,
                    background: story.textBg,
                    border: `1px solid ${story.borderColor}`,
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 2,
                    position: "relative",
                    cursor: isActive ? "default" : "pointer",
                    boxShadow: isActive ? "12px 12px 40px rgba(0,0,0,0.06)" : "none",
                    transform: isActive ? "translateY(-10px)" : "translateY(0px)",
                    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)"
                  }}
                >
                  {/* Padded Illustration Area */}
                  <div style={{
                    padding: "14px 14px 0 14px", // slightly more padding for larger card
                  }}>
                    <div style={{
                      height: 290,
                      position: "relative",
                      borderRadius: 14, // rounded on all 4 sides!
                      background: story.bgGradient,
                    }}>
                      {/* Grain Texture */}
                      <div style={{
                        position: "absolute", inset: 0, zIndex: 1,
                        opacity: 0.15, pointerEvents: "none", mixBlendMode: "overlay",
                        borderRadius: "14px", overflow: "hidden",
                      }}>
                        <svg width="100%" height="100%">
                          <filter id="noise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                          </filter>
                          <rect width="100%" height="100%" filter="url(#noise)" />
                        </svg>
                      </div>

                      {/* Leaves SVG - positioned absolutely within the 250px box */}
                      {/* Notice NO overflow:hidden on the parent, so these will spill out */}
                      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
                        <LeavesSVG theme={story.theme} />
                      </div>

                      {/* Brand badge */}
                      <div style={{
                        position: "absolute", inset: 0, zIndex: 3,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <div style={{
                          background: "white",
                          borderRadius: 10,
                          padding: "0.6rem 1.4rem",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {story.Icon && <story.Icon size={22} color={story.borderColor} strokeWidth={2.5} />}
                            <span style={{ fontSize: "1rem", fontWeight: 700, color: story.borderColor, letterSpacing: "-0.02em" }}>
                              {story.brand}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tagline + headline */}
                  <div style={{ padding: "1.4rem 1.4rem" }}>
                    <div style={{
                      fontSize: "0.8rem", color: story.labelColor, fontWeight: 600,
                      marginBottom: "0.4rem"
                    }}>
                      {story.tagline}
                    </div>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontWeight: 500,
                      fontSize: "1.2rem", color: "#060320",
                      lineHeight: 1.25, margin: 0, letterSpacing: "-0.04em"
                    }}>
                      {story.headline}
                    </p>
                  </div>

                  {/* Ribbon Fold - Active Card Only */}
                  {isActive && (
                    <svg
                      style={{
                        position: "absolute",
                        right: -1, // flush with right edge of the left card
                        bottom: -15, // hangs 15px below the bottom edge
                        width: 20, // exactly the size of the border radius
                        height: 35, // 20px to cover the radius + 15px hanging below
                        zIndex: -1,
                        overflow: "visible",
                      }}
                      viewBox="0 0 20 35"
                    >
                      {/* 
                        M 20 0: Top-Right, meets straight border
                        L 20 33: Go down right edge, stop just before the tip
                        Q 20 35 18 33.5: Rounded bottom tip (perfectly tangent to the diagonal)
                        L 0 20: Diagonal up to meet card's bottom edge exactly where curve starts
                      */}
                      <path 
                        d="M 20 0 L 20 33 Q 20 35 18 33.5 L 0 20 Z" 
                        fill={story.foldColor} 
                        stroke={story.borderColor}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </motion.div>

                {/* ── RIGHT PANEL (Only when active) ── */}
                <motion.div
                  initial={false}
                  animate={{ 
                    width: isActive ? 300 : 0, 
                    opacity: isActive ? 1 : 0, 
                    marginLeft: isActive ? -20 : 0 
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    overflow: "hidden",
                    zIndex: 1,
                    marginTop: 40,
                    marginBottom: -20, // push bottom down slightly if needed
                    flexShrink: 0,
                    display: "flex", // FIX: allows inner div to stretch to full flex height
                  }}
                >
                  <div style={{
                    width: 300,
                    flex: 1, // FIX: stretches to fill motion.div
                    background: "white",
                    borderRadius: 20,
                    border: `1px solid ${story.borderColor}`,
                    padding: "2rem 1.5rem 1.5rem 2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxShadow: "8px 8px 24px rgba(0,0,0,0.04)"
                  }}>
                    {/* Description text */}
                    <p style={{
                      fontSize: "0.85rem", color: "#555570",
                      lineHeight: 1.6, marginBottom: "1.5rem",
                    }}>
                      {story.desc}
                    </p>

                    {/* Stat boxes */}
                    <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
                      {[
                        { val: story.stat1, label: story.stat1Label },
                        { val: story.stat2, label: story.stat2Label },
                      ].map((s, si) => (
                        <div key={si} style={{
                          flex: 1, background: story.statBg,
                          borderRadius: 12, padding: "1rem 0.8rem",
                        }}>
                          <div style={{
                            fontFamily: "var(--font-display)", fontWeight: 800,
                            fontSize: "1.8rem", color: story.statColor,
                            lineHeight: 1, marginBottom: "0.4rem",
                          }}>
                            {s.val}
                          </div>
                          <div style={{
                            fontSize: "0.7rem", color: story.statColor,
                            lineHeight: 1.3, fontWeight: 600, opacity: 0.9,
                          }}>
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA button */}
                    <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
                      <button style={{
                        display: "inline-flex", alignItems: "center", gap: "0.4rem",
                        padding: "0.6rem 1.2rem",
                        background: "#100030", color: "white",
                        borderRadius: 9999, border: "none", cursor: "pointer",
                        fontSize: "0.85rem", fontWeight: 700,
                        transition: "transform 140ms",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "translateX(3px)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}
                      >
                        Case Study <CustomArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

        {/* Navigation dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "4rem" }}>
          <button onClick={() => setActive(Math.max(0, active - 1))} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "#E8ECF5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#100030" }}>
            <CustomChevronLeft size={16} />
          </button>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: 8, height: 8,
                  borderRadius: 99,
                  background: i === active ? "#100030" : "#D0D4E0",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 250ms cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </div>
          <button onClick={() => setActive(Math.min(stories.length - 1, active + 1))} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "#E8ECF5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#100030" }}>
            <CustomChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   COMPARISON TABLE — exact Voyantis "What teams discover vs What's ready"
   Sticky left category column, two content columns
   ══════════════════════════════════════════════════════════════════════════ */
const compareRows = [
  {
    cat: "PREDICTION",
    left: "Most tools are built for listing info, not real-time recruiter activation. Having one isn't enough.",
    right: "Profiles are purpose-built for activation and auto-update as your career, skills, and goals continuously evolve.",
  },
  {
    cat: "SIGNAL ENGINEERING",
    left: "Without signal engineering, raw PDFs get treated as ground truth — and small formatting errors get amplified.",
    right: "Autonomous signal engineering encodes, times, and calibrates your profile for how each recruiter actually reads.",
  },
  {
    cat: "PLATFORM OPTIMIZATION",
    left: "Each platform (LinkedIn, job boards) has its own requirements, timing logic, and learning behavior — and they change without notice.",
    right: "Separate profile variants deploy per platform, each tuned to that platform's algorithm and updated automatically as platforms evolve.",
  },
  {
    cat: "CANDIDATE QUALITY",
    left: "Without continuous optimization, your profile quietly drifts toward attracting the wrong opportunities.",
    right: "Continuous debiasing runs in the background, keeping your profile pointed toward the roles that will actually drive your career.",
  },
  {
    cat: "OPERATIONAL COST",
    left: "Getting this right requires weeks of manual work, constant updating, and a permanent maintenance commitment.",
    right: "Your career stays focused on growing while 1IMP handles the impression layer.",
  },
];

function ComparisonSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{
      background: "linear-gradient(180deg, #E8E4F4 0%, #DDD8F0 100%)",
      padding: "6rem 0",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div {...fv(0)} animate={inView ? "visible" : "hidden"} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#E8355A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>THE DIFFERENCE</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#100030", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Why the best candidates choose 1IMP
          </h2>
        </motion.div>

        <motion.div {...fv(0.15)} animate={inView ? "visible" : "hidden"}
          style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(99,82,138,0.18)", boxShadow: "0 4px 24px rgba(16,0,48,0.08)" }}
        >
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr" }} className="compare-grid">
            <div style={{ background: "rgba(255,255,255,0.5)", padding: "1rem 1.25rem", borderRight: "1px solid rgba(99,82,138,0.12)" }} />
            <div style={{ background: "rgba(255,255,255,0.7)", padding: "1rem 1.5rem", borderRight: "1px solid rgba(99,82,138,0.12)" }}>
              <div style={{ fontSize: "0.68rem", color: "#888", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "0.25rem", textTransform: "uppercase" }}>BUILDING WITHOUT 1IMP</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", color: "#100030" }}>What candidates discover</div>
            </div>
            <div style={{ background: "#100030", padding: "1rem 1.5rem" }}>
              <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "0.25rem", textTransform: "uppercase" }}>1IMP AI PLATFORM</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", color: "white" }}>What&apos;s ready when you are</div>
            </div>
          </div>

          {compareRows.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", borderTop: "1px solid rgba(99,82,138,0.12)" }} className="compare-grid">
              <div style={{ background: "rgba(255,255,255,0.4)", padding: "1.25rem 1.25rem", borderRight: "1px solid rgba(99,82,138,0.12)", display: "flex", alignItems: "center" }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#6361B8", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.4 }}>{row.cat}</div>
              </div>
              <div style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)", padding: "1.25rem 1.5rem", borderRight: "1px solid rgba(99,82,138,0.12)" }}>
                <p style={{ fontSize: "0.875rem", color: "#444466", lineHeight: 1.65 }}>{row.left}</p>
              </div>
              <div style={{ background: i % 2 === 0 ? "rgba(16,0,48,0.97)" : "rgba(16,0,48,0.93)", padding: "1.25rem 1.5rem" }}>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>{row.right}</p>
              </div>
            </div>
          ))}
        </motion.div>
        <style>{`@media(max-width:768px){ .compare-grid{ grid-template-columns:1fr!important; } }`}</style>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BOTTOM CTA — white rounded card with coral CTA, botanical background
   Exactly like Voyantis "Start acquiring tomorrow's most valuable customers"
   ══════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{
      background: "linear-gradient(180deg, #DDD8F0 0%, #CCC5E8 50%, #B8AFDC 100%)",
      padding: "6rem 0 0", overflow: "hidden", position: "relative",
    }}>
      {/* Botanical plants/grasses at the bottom */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", paddingBottom: "4rem" }}>
        {/* The white card */}
        <motion.div {...fv(0)} animate={inView ? "visible" : "hidden"}
          style={{
            background: "white", borderRadius: 20,
            boxShadow: "0 8px 48px rgba(16,0,48,0.12)",
            padding: "4rem 2rem", textAlign: "center",
            position: "relative", zIndex: 2,
          }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#100030",
            lineHeight: 1.15, letterSpacing: "-0.02em",
            marginBottom: "1.5rem", maxWidth: 600, margin: "0 auto 1.5rem",
          }}>
            Ready to stop getting ignored by recruiters?
          </h2>
          <Link href="/create" style={{
            display: "inline-flex", alignItems: "center", padding: "0.8rem 2rem",
            background: "#E8355A", color: "white", borderRadius: 9999,
            fontSize: "1rem", fontWeight: 600, textDecoration: "none",
            fontFamily: "var(--font-body)", boxShadow: "0 2px 16px rgba(232,53,90,0.3)",
          }}>
            Generate Your Video — It&apos;s Free
          </Link>
          <p style={{ fontSize: "0.8125rem", color: "#9999AA", marginTop: "1rem" }}>
            No account required · Ready in 60 seconds
          </p>
        </motion.div>
      </div>

      {/* Premium Unified Our Story Section */}
      <div id="our-story" style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1.5rem 6rem", position: "relative", zIndex: 10 }}>
        <div style={{
          background: "linear-gradient(135deg, #100030 0%, #0A001C 100%)",
          borderRadius: 32,
          padding: "4rem",
          boxShadow: "0 24px 64px rgba(16,0,48,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem"
        }}>
          {/* Subtle background glow */}
          <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "rgba(232,53,90,0.15)", filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, background: "rgba(99,97,184,0.15)", filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
          
          {/* Header */}
          <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#E8355A", marginBottom: "1rem" }}>OUR STORY</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "white", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "2rem" }}>
              It started with a resume<br />that was never opened.
            </h2>
            <div style={{ height: 1, width: 100, background: "rgba(255,255,255,0.1)", margin: "0 auto" }} />
          </div>

          {/* Story Columns */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", position: "relative", zIndex: 2, alignItems: "start" }}>
            <div>
               <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>
                 We watched talented candidates get ignored in piles of 400+ PDFs. They weren't losing opportunities due to lack of talent—they were losing because they didn't get noticed.
               </p>
            </div>
            <div>
               <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>
                 Instead of a resume, one candidate sent a 2-minute video intro. The recruiter responded in 4 hours. That's when we realized: personality and energy matter more than bullet points.
               </p>
            </div>
          </div>
          
          {/* Mission Box */}
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "2rem", border: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 2, textAlign: "center", marginTop: "0.5rem" }}>
             <p style={{ fontSize: "1.125rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "white", letterSpacing: "-0.01em", margin: 0 }}>
               Our Mission: To replace <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>&ldquo;Send me your resume&rdquo;</span> with <span style={{ color: "#E8355A" }}>&ldquo;Send me your impression.&rdquo;</span>
             </p>
          </div>
        </div>
      </div>

      {/* WOW Landscape Transition to Footer */}
      <div style={{ position: "relative", height: "250px", width: "100%", overflow: "hidden", marginTop: "-30px", zIndex: 1 }}>
        <svg viewBox="0 0 1440 250" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
          
          <defs>
            <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9C91C6" stopOpacity="0" />
              <stop offset="100%" stopColor="#9C91C6" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#FFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hill1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A59BCE" />
              <stop offset="100%" stopColor="#8D81BC" />
            </linearGradient>
            <linearGradient id="hill2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7B6BA6" />
              <stop offset="100%" stopColor="#5D4B8C" />
            </linearGradient>
            <linearGradient id="hill3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#463673" />
              <stop offset="100%" stopColor="#281A4A" />
            </linearGradient>
            <mask id="moonMask">
              <rect width="1440" height="250" fill="white" />
              <circle cx="1185" cy="55" r="30" fill="black" />
            </mask>
          </defs>

          {/* Sky background to fix the straight line transition */}
          <rect x="0" y="0" width="1440" height="250" fill="url(#skyGradient)" />

          {/* Moon Glow */}
          <circle cx="1165" cy="70" r="100" fill="url(#moonGlow)" />
          {/* Crescent Moon */}
          <circle cx="1165" cy="70" r="30" fill="#FFF" mask="url(#moonMask)" opacity="0.95" />

          {/* Magical Sparkle Stars (4-point paths) */}
          <g fill="#FFF">
            <path d="M150,32 Q150,40 158,40 Q150,40 150,48 Q150,40 142,40 Q150,40 150,32 Z" opacity="0.6"/>
            <path d="M300,74 Q300,80 306,80 Q300,80 300,86 Q300,80 294,80 Q300,80 300,74 Z" opacity="0.8"/>
            <path d="M450,40 Q450,50 460,50 Q450,50 450,60 Q450,50 440,50 Q450,50 450,40 Z" opacity="0.5"/>
            <path d="M650,85 Q650,90 655,90 Q650,90 650,95 Q650,90 645,90 Q650,90 650,85 Z" opacity="0.9"/>
            <path d="M850,33 Q850,40 857,40 Q850,40 850,47 Q850,40 843,40 Q850,40 850,33 Z" opacity="0.7"/>
            <path d="M1000,94 Q1000,100 1006,100 Q1000,100 1000,106 Q1000,100 994,100 Q1000,100 1000,94 Z" opacity="0.6"/>
            <path d="M1350,42 Q1350,50 1358,50 Q1350,50 1350,58 Q1350,50 1342,50 Q1350,50 1350,42 Z" opacity="0.8"/>
            
            {/* Tiny distant stars */}
            <circle cx="220" cy="60" r="1.5" opacity="0.8" />
            <circle cx="550" cy="30" r="1" opacity="0.5" />
            <circle cx="750" cy="70" r="2" opacity="0.4" />
            <circle cx="1100" cy="40" r="1.5" opacity="0.9" />
            <circle cx="1250" cy="80" r="1" opacity="0.6" />
          </g>

          {/* Layer 1: Back Hills */}
          <path fill="url(#hill1)" d="
            M0,120 
            C240,80 480,180 720,130 
            C960,80 1200,60 1440,110 
            L1440,250 L0,250 Z
          " />
          
          {/* Layer 2: Middle Hills */}
          <path fill="url(#hill2)" d="
            M0,160 
            C300,100 500,210 800,150 
            C1100,90 1300,170 1440,140 
            L1440,250 L0,250 Z
          " />

          {/* Layer 3: Foreground Hills */}
          <path fill="url(#hill3)" d="
            M0,200 
            C350,140 600,230 900,180 
            C1200,130 1350,210 1440,190 
            L1440,250 L0,250 Z
          " />

          {/* Layer 4: Base / Footer Connector */}
          <path fill="#09051E" d="
            M0,230 
            C400,190 800,240 1440,210 
            L1440,250 L0,250 Z
          " />
          <rect x="0" y="248" width="1440" height="5" fill="#09051E" />
        </svg>
      </div>

    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FEATURE SHOWCASE — 3-card grid: AI Summary, Analytics, Share
   ══════════════════════════════════════════════════════════════════════════ */
const features = [
  {
    icon: "✦",
    tag: "AI-POWERED",
    title: "Your story, written brilliantly",
    desc: "Drop your resume and watch our AI craft a professional summary that sounds exactly like you — only sharper. Every bullet rewritten for impact. Every skill surfaced for relevance.",
    accent: "#6361B8",
    bg: "linear-gradient(135deg, #F0EEFB 0%, #E4E0F4 100%)",
    highlights: ["Professional summary in seconds", "Achievement bullets rewritten for impact", "Skills automatically ranked by relevance"],
  },
  {
    icon: "◎",
    tag: "ANALYTICS",
    title: "See who's interested, before they call",
    desc: "Get real-time notifications when someone views your impression. Know which companies are looking, how long they spent, and which sections grabbed their attention.",
    accent: "#E8355A",
    bg: "linear-gradient(135deg, #FEF0F3 0%, #FDDCE3 100%)",
    highlights: ["Real-time view notifications", "Company identification (Pro)", "Section engagement heatmap"],
  },
  {
    icon: "⌁",
    tag: "SHARE ANYWHERE",
    title: "One link. Every platform. Instant wow.",
    desc: "Your personalized 1IMP link works everywhere — LinkedIn messages, email signatures, job applications, QR codes. Beautiful Open Graph previews make every share count.",
    accent: "#100030",
    bg: "linear-gradient(135deg, #ECEEF8 0%, #E0E4F4 100%)",
    highlights: ["Custom yourname.1imp.io URL", "Beautiful Open Graph previews", "QR code + one-click copy"],
  },
];

function FeatureShowcaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#F4F2FC", padding: "6rem 0", position: "relative", overflow: "visible", zIndex: 25 }}>
      {/* Vector Cloud Divider pointing DOWN from the previous section */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50px", zIndex: 10, width: "100%", overflow: "hidden", transform: "rotate(180deg)" }}>
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
          
          {/* Layer 1: Darkest accent (shadow/back) */}
          <path fill="#E4E0F4" d="
            M0,50 L0,35
            C30,20 60,15 90,25
            C120,5 170,0 220,15
            C260,0 320,-5 380,10
            C420,-10 490,-5 550,15
            C590,0 660,-5 720,10
            C760,-5 820,0 880,15
            C920,0 980,-10 1040,5
            C1080,-5 1140,-5 1200,10
            C1250,-5 1310,0 1370,15
            C1400,5 1420,15 1440,25
            L1440,50 Z
          " transform="translate(-10, -5)" />

          {/* Layer 2: Mid-tone (middle) */}
          <path fill="#EBE9F6" d="
            M0,50 L0,35
            C30,20 60,15 90,25
            C120,5 170,0 220,15
            C260,0 320,-5 380,10
            C420,-10 490,-5 550,15
            C590,0 660,-5 720,10
            C760,-5 820,0 880,15
            C920,0 980,-10 1040,5
            C1080,-5 1140,-5 1200,10
            C1250,-5 1310,0 1370,15
            C1400,5 1420,15 1440,25
            L1440,50 Z
          " transform="translate(10, -2)" />

          {/* Layer 3: Foreground (Matches #FDFDFD SuccessStoriesSection background) */}
          <path fill="#FDFDFD" d="
            M0,50 L0,35
            C30,20 60,15 90,25
            C120,5 170,0 220,15
            C260,0 320,-5 380,10
            C420,-10 490,-5 550,15
            C590,0 660,-5 720,10
            C760,-5 820,0 880,15
            C920,0 980,-10 1040,5
            C1080,-5 1140,-5 1200,10
            C1250,-5 1310,0 1370,15
            C1400,5 1420,15 1440,25
            L1440,50 Z
          " />
        </svg>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div {...fv(0)} animate={inView ? "visible" : "hidden"} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6361B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>THE PLATFORM</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#100030", letterSpacing: "-0.02em", lineHeight: 1.15, maxWidth: 560, margin: "0 auto" }}>
            Everything you need to get noticed
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="features-grid">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 + 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(99,82,138,0.15)", boxShadow: "0 4px 24px rgba(16,0,48,0.07)", background: "white" }}
            >
              {/* Top colored area */}
              <div style={{ background: feat.bg, padding: "2rem 2rem 1.5rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem", boxShadow: "0 2px 12px rgba(16,0,48,0.1)" }}>
                  {feat.icon}
                </div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, color: feat.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{feat.tag}</p>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem", color: "#100030", lineHeight: 1.3, marginBottom: "0.875rem" }}>{feat.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#555570", lineHeight: 1.65 }}>{feat.desc}</p>
              </div>

              {/* Highlights */}
              <div style={{ padding: "1.25rem 2rem 1.75rem", borderTop: "1px solid rgba(99,82,138,0.12)" }}>
                {feat.highlights.map((h, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: feat.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "white", fontSize: "0.6rem", fontWeight: 900 }}>✓</span>
                    </div>
                    <span style={{ fontSize: "0.875rem", color: "#444466" }}>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .features-grid{ grid-template-columns:1fr!important; } }`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PRICING — Free vs Pro vs Career Pack
   ══════════════════════════════════════════════════════════════════════════ */
const plans = [
  {
    name: "Basic",
    price: "$0",
    period: "",
    desc: "Perfect for your current job search.",
    cta: "Generate Video",
    ctaHref: "/create",
    dark: false,
    features: [
      "1 AI Video Story",
      "Basic Video Themes",
      "Standard Video Rendering",
      "Shareable Web Link",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    desc: "For ambitious candidates actively interviewing.",
    cta: "Upgrade to Pro",
    ctaHref: "/create",
    dark: true,
    badge: "MOST POPULAR",
    features: [
      "Unlimited AI Generation",
      "Premium Video Themes",
      "View Analytics & Tracking",
      "Remove 1IMP Branding",
    ],
  },
  {
    name: "Career Pack",
    price: "$39",
    period: "once",
    desc: "A one-time boost for multiple applications.",
    cta: "Get Career Pack",
    ctaHref: "/create",
    dark: false,
    features: [
      "3 Custom Video Stories",
      "AI Cover Letter Generator",
      "LinkedIn Profile Audit",
      "Lifetime access to your stories",
    ],
  },
];

function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="pricing" style={{ background: "#F4F2FC", padding: "6rem 0 8rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div variants={fv(0)} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "#100030", letterSpacing: "0.02em", lineHeight: 1.15, maxWidth: 1200, margin: "0 auto 1.5rem", wordSpacing: "0.1em" }}>
            Simple pricing. Infinite reach.
          </h2>
          <p style={{ fontSize: "1rem", color: "#555570", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
            Generate your first viral Video Story for free. Upgrade when you need more power.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", alignItems: "stretch" }} className="pricing-grid">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 24, position: "relative",
                background: plan.dark ? "#09051E" : "white",
                boxShadow: plan.dark ? "0 24px 64px rgba(16,0,48,0.25)" : "0 8px 32px rgba(16,0,48,0.06)",
                transform: plan.dark ? "scale(1.05)" : "scale(1)",
                zIndex: plan.dark ? 2 : 1,
                padding: "2.5rem 2rem",
                display: "flex", flexDirection: "column"
              }}
            >
              {plan.badge && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#FF3B6B", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "0.3rem 1rem", borderRadius: 999, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {plan.badge}
                </div>
              )}
              
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: plan.dark ? "white" : "#100030", marginBottom: "1rem" }}>
                {plan.name}
              </div>
              
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "3.5rem", color: plan.dark ? "white" : "#100030", lineHeight: 1, letterSpacing: "-0.02em" }}>{plan.price}</span>
                {plan.period && <span style={{ fontSize: "0.9rem", color: plan.dark ? "rgba(255,255,255,0.6)" : "#777788", fontWeight: 500 }}>{plan.period}</span>}
              </div>
              
              <p style={{ fontSize: "0.875rem", color: plan.dark ? "rgba(255,255,255,0.7)" : "#666677", lineHeight: 1.6, marginBottom: "2rem", minHeight: "2.8rem" }}>{plan.desc}</p>

              <Link href={plan.ctaHref} style={{
                display: "block", textAlign: "center", padding: "0.85rem 1.5rem",
                background: plan.dark ? "linear-gradient(135deg, #FF3B6B 0%, #D41A48 100%)" : "#F3F4F8",
                color: plan.dark ? "white" : "#100030", borderRadius: 12,
                fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none",
                fontFamily: "var(--font-body)",
                boxShadow: plan.dark ? "0 4px 20px rgba(232,53,90,0.3)" : "none",
                transition: "all 150ms",
                marginBottom: "2rem"
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; }}
              >
                {plan.cta}
              </Link>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flexGrow: 1 }}>
                {plan.features.map((feat, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <CustomCheck size={16} color="#FF3B6B" accentColor="#FF3B6B" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "0.875rem", color: plan.dark ? "rgba(255,255,255,0.8)" : "#555570" }}>{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .pricing-grid{ grid-template-columns:1fr!important; gap:2.5rem!important; padding-top:1rem; } }`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ChallengeSection />
        <HowItWorksSection />
        <SuccessStoriesSection />
        <ComparisonSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
