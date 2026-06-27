"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const fv = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] } },
});

/* ══════════════════════════════════════════════════════════════════════════
   NAVBAR — exact Voyantis: transparent → white-blur on scroll
   ══════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Products", dropdown: true },
    { label: "Solutions", dropdown: true },
    { label: "Success Stories", dropdown: false },
    { label: "Resources", dropdown: true },
    { label: "Company", dropdown: true },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(99,82,138,0.1)" : "none",
      transition: "all 280ms ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", height: 60 }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", flexShrink: 0 }}>
          {/* Voyantis-style swirl icon */}
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" fill="#F2F0F9"/>
            <path d="M20.5 11.5C20.5 11.5 18 10 15.5 11.5C13 13 13 16 15 17.5C17 19 19.5 18.5 20.5 17C21.5 15.5 21 13 19 12C17 11 14.5 12 13.5 14C12.5 16 13.5 18.5 15.5 19.5" stroke="#E8355A" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#100030", letterSpacing: "-0.01em" }}>
            1IMP
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 0, margin: "0 auto" }} className="v-nav">
          {links.map(link => (
            <button key={link.label} style={{
              display: "inline-flex", alignItems: "center", gap: 3,
              padding: "0.45rem 0.875rem", background: "none", border: "none", cursor: "pointer",
              fontSize: "0.9rem", fontWeight: 450, color: "#333", fontFamily: "var(--font-body)",
              borderRadius: 8, transition: "background 150ms",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,82,138,0.07)")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
            >
              {link.label}
              {link.dropdown && <ChevronDown size={12} style={{ opacity: 0.5 }} />}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <Link href="/contact" style={{
          display: "inline-flex", alignItems: "center", padding: "0.5rem 1.25rem",
          background: "#100030", color: "white", borderRadius: 9999, fontSize: "0.875rem",
          fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-body)",
          transition: "opacity 150ms", flexShrink: 0,
        }}
          className="v-cta"
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Book a Consultation
        </Link>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(o => !o)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 6, marginLeft: 8 }}
          className="v-hamburger"
        >
          <div style={{ width: 22, height: 2, background: "#100030", marginBottom: 5 }} />
          <div style={{ width: 22, height: 2, background: "#100030", marginBottom: 5 }} />
          <div style={{ width: 22, height: 2, background: "#100030" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ background: "white", borderBottom: "1px solid #eee", overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {links.map(l => <div key={l.label} style={{ fontSize: "0.95rem", color: "#100030", fontWeight: 500 }}>{l.label}</div>)}
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "0.6rem 1.25rem", background: "#100030", color: "white", borderRadius: 9999, fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", marginTop: 4, width: "fit-content" }}>Book a Consultation</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){ .v-nav{display:none!important} .v-cta{display:none!important} .v-hamburger{display:flex!important; flex-direction:column} }
      `}</style>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO — exact Voyantis: rounded card, flowers illustration, coral + outline btns
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      
      {/* User's MAIN Image as full screen background */}

          {/* User's MAIN Image as background */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
            <Image
              src="/MAIN.png"
              alt="Main Hero Background"
              fill
              style={{ objectFit: "cover", objectPosition: "bottom center" }}
              priority
            />
          </div>

          {/* Hero text content — sits above the background image */}
          <div style={{ textAlign: "center", padding: "3.5rem 2rem 2rem", position: "relative", zIndex: 10, maxWidth: 680, width: "100%" }}>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#6361B8", marginBottom: "1.1rem", fontFamily: "var(--font-body)",
              }}
            >
              AI FIRST IMPRESSION PLATFORM
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.12,
                letterSpacing: "-0.025em", color: "#100030", marginBottom: "1rem",
              }}
            >
              Stop letting great candidates<br />get lost in the noise
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              style={{
                fontSize: "1rem", color: "#555570", lineHeight: 1.65,
                fontFamily: "var(--font-body)", maxWidth: 480, margin: "0 auto 1.75rem",
              }}
            >
              Turn your resume into an AI-powered first impression that trains recruiters to notice you — before anyone else.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
              style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              {/* Coral primary */}
              <Link href="/signup" style={{
                display: "inline-flex", alignItems: "center", padding: "0.65rem 1.6rem",
                background: "#E8355A", color: "white", borderRadius: 9999,
                fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none",
                fontFamily: "var(--font-body)", boxShadow: "0 2px 16px rgba(232,53,90,0.3)",
                transition: "all 160ms",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#d02048"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#E8355A"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                Create my Impression
              </Link>

              {/* Outline secondary */}
              <Link href="#how-it-works" style={{
                display: "inline-flex", alignItems: "center", padding: "0.65rem 1.6rem",
                background: "rgba(255,255,255,0.75)", color: "#100030", borderRadius: 9999,
                border: "1.5px solid rgba(16,0,48,0.18)", fontSize: "0.9375rem", fontWeight: 500,
                textDecoration: "none", fontFamily: "var(--font-body)", transition: "all 160ms",
                backdropFilter: "blur(6px)",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.95)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.75)"; }}
              >
                See how it works
              </Link>
            </motion.div>
          </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGOS — "Powering growth at the world's most ambitious companies"
   Two rows of logo badges with ↗ arrows, exactly like Voyantis
   ══════════════════════════════════════════════════════════════════════════ */
const logoRow1 = ["Upside", "Opendoor", "LENNAR", "Klar", "MyHeritage", "ZipRecruiter", "UNISWAP", "MoneyLion"];
const logoRow2 = ["44pixels", "Rappi", "miro", "inDrive", "current", "shippo", "sondermind°"];

function LogosSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ background: "#ECEEF8", padding: "4rem 0 5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", fontSize: "0.875rem", color: "#77778A", marginBottom: "2rem", fontFamily: "var(--font-body)" }}
        >
          Powering growth at the world&apos;s most ambitious companies
        </motion.p>

        {/* Row 1 */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
          {logoRow1.map((name, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 1.1rem", background: "white",
                border: "1px solid rgba(99,82,138,0.18)", borderRadius: 8,
                fontWeight: 700, fontSize: "0.9rem", color: "#100030",
                fontFamily: "var(--font-body)", boxShadow: "0 1px 4px rgba(16,0,48,0.06)",
                cursor: "pointer", transition: "box-shadow 160ms",
                position: "relative",
              }}
              whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(16,0,48,0.12)" }}
            >
              {name}
              <span style={{ fontSize: "0.7rem", color: "#6361B8", position: "absolute", bottom: 2, right: 4 }}>↗</span>
            </motion.div>
          ))}
        </div>

        {/* Row 2 */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.6rem" }}>
          {logoRow2.map((name, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 + 0.3, duration: 0.4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 1.1rem", background: "white",
                border: "1px solid rgba(99,82,138,0.18)", borderRadius: 8,
                fontWeight: 700, fontSize: "0.9rem", color: "#100030",
                fontFamily: "var(--font-body)", boxShadow: "0 1px 4px rgba(16,0,48,0.06)",
                cursor: "pointer", position: "relative",
              }}
              whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(16,0,48,0.12)" }}
            >
              {name}
              <span style={{ fontSize: "0.7rem", color: "#6361B8", position: "absolute", bottom: 2, right: 4 }}>↗</span>
            </motion.div>
          ))}
        </div>
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
    icon: "🔗", title: "The Gap",
    bold: "Recruiters have a 7-second window to notice each candidate.",
    rest: " But for most professionals, their true value won't be clear in that moment.",
  },
  {
    icon: "🔍", title: "The Stand-In",
    bold: "So teams fall back on PDFs and keyword matching.",
    rest: " But that only tells hiring teams to find more people who applied, not more people worth hiring.",
  },
  {
    icon: "📉", title: "The Result",
    bold: "Hiring keeps running, but the best candidates quietly get passed over.",
    rest: " By the time someone notices, the damage is months in the making.",
  },
];

function ChallengeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{
      background: "linear-gradient(180deg, #ECEEF8 0%, #E4E0F4 60%, #DDD8F0 100%)",
      padding: "6rem 0 7rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="challenge-layout">

          {/* LEFT: sticky label + headline */}
          <div style={{ position: "sticky", top: 100 }}>
            <motion.p {...fv(0)} animate={inView ? "visible" : "hidden"} style={{
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#E8355A", marginBottom: "1rem",
            }}>
              THE CHALLENGE
            </motion.p>
            <motion.h2 {...fv(0.08)} animate={inView ? "visible" : "hidden"} style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#100030",
              lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "1.25rem",
            }}>
              Your hiring process is optimizing for the wrong candidates
            </motion.h2>
            <motion.p {...fv(0.14)} animate={inView ? "visible" : "hidden"} style={{
              fontSize: "1rem", color: "#555570", lineHeight: 1.65,
            }}>
              Most teams are filtering for candidates who sent a PDF on the right day.
              <br />Not candidates who are actually the best fit.
            </motion.p>
          </div>

          {/* RIGHT: stacked cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", paddingTop: "0.5rem" }}>
            {challengeCards.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(99,82,138,0.18)", borderRadius: 16,
                  padding: "1.5rem", boxShadow: "0 2px 16px rgba(16,0,48,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(99,97,184,0.1)", border: "1px solid rgba(99,97,184,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", flexShrink: 0,
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
    num: "01", title: "Upload",
    desc: "Drop your resume PDF. Our AI reads every word, extracts your career story, and structures it in seconds. No formatting required.",
    detail: "Supports PDF, Word, and plain text. Parses 500+ resume formats.",
  },
  {
    num: "02", title: "AI Crafts",
    desc: "Watch as AI writes your professional summary, organizes your skills, and creates your impact-led achievement bullets. All editable.",
    detail: "Powered by advanced language models trained on 10,000+ successful profiles.",
  },
  {
    num: "03", title: "Customize",
    desc: "In the split-screen editor, see exactly what your recruiter will see. Adjust, polish, and make it yours in real time.",
    detail: "Live preview, 12 premium themes, custom domain URL.",
  },
  {
    num: "04", title: "Share & Win",
    desc: "Copy your personal link and send it. Get notified when someone views your impression and see which companies are interested.",
    detail: "Real-time view notifications, company identification, engagement heatmap.",
  },
];

function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // The dark chart card at the top (like Voyantis flow diagram)
  return (
    <section id="how-it-works" ref={ref} style={{ background: "#F4F2FC", padding: "6rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Dark platform flow card (top part of the "product" section) */}
        <motion.div {...fv(0)} animate={inView ? "visible" : "hidden"}
          style={{
            background: "#100030", borderRadius: 20, padding: "2.5rem",
            marginBottom: "1.5rem", overflow: "hidden", position: "relative",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1.5rem", alignItems: "center" }} className="flow-grid">

            {/* Inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Your Resume", items: ["Work history", "Skills", "Achievements"] },
                { label: "Career Goals", items: ["Target role", "Industries", "Salary range"] },
                { label: "Context", items: ["Experience level", "Remote/Hybrid", "Location"] },
              ].map(block => (
                <div key={block.label} style={{
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10, padding: "0.75rem 1rem",
                }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#A8A8D0", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.4rem" }}>{block.label}</div>
                  {block.items.map(it => (
                    <div key={it} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", marginBottom: "0.2rem" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6361B8", flexShrink: 0 }} />
                      {it}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Center wheel (like Voyantis's circular diagram) */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", padding: "0 1rem" }}>
              <div style={{
                width: 120, height: 120, borderRadius: "50%",
                border: "3px solid rgba(99,97,184,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6361B8 0%, #E8355A 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.9rem", color: "white",
                }}>
                  1IMP<br />AI
                </div>
                {/* Outer ring segments */}
                <svg style={{ position: "absolute", inset: -10 }} width={140} height={140} viewBox="0 0 140 140">
                  <circle cx={70} cy={70} r={60} fill="none" stroke="rgba(232,53,90,0.3)" strokeWidth="1" strokeDasharray="8 4"/>
                </svg>
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>Learn &amp; Evolve</div>
            </div>

            {/* Output */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10, padding: "0.75rem 1rem",
              }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#A8A8D0", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.4rem" }}>Your Best Impression</div>
                {["High recruiter engagement", "Interview conversion", "Measurable profile ROI"].map(it => (
                  <div key={it} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", marginBottom: "0.2rem" }}>
                    <span style={{ color: "#E8355A" }}>↑</span> {it}
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(99,97,184,0.2)", border: "1px solid rgba(99,97,184,0.3)", borderRadius: 10, padding: "0.6rem 1rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
                ↗ High Return On Profile
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){ .flow-grid{ grid-template-columns:1fr!important; } }`}</style>
        </motion.div>

        {/* Tabs row — exactly like Voyantis "01 Predict 02 Signal 03 Activate 04 Learn" */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }} className="tabs-row">
          {tabs.map((tab, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 + 0.3, duration: 0.45 }}
              onClick={() => setActive(i)}
              style={{
                padding: "1.25rem", borderRadius: 12, cursor: "pointer",
                background: active === i ? "white" : "rgba(99,97,184,0.1)",
                border: active === i ? "1px solid rgba(99,97,184,0.2)" : "1px solid transparent",
                boxShadow: active === i ? "0 4px 20px rgba(16,0,48,0.1)" : "none",
                transition: "all 200ms",
              }}
            >
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9B97C8", marginBottom: "0.5rem" }}>{tab.num}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: active === i ? "#100030" : "#888" }}>
                {tab.title}
              </div>
              <AnimatePresence>
                {active === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <p style={{ fontSize: "0.85rem", color: "#555570", lineHeight: 1.6, marginTop: "0.625rem" }}>{tab.desc}</p>
                    <p style={{ fontSize: "0.75rem", color: "#9B97C8", marginTop: "0.4rem" }}>{tab.detail}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <style>{`@media(max-width:768px){ .tabs-row{ grid-template-columns:repeat(2,1fr)!important; } }`}</style>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SUCCESS STORIES — exact Voyantis slider with botanical card illustrations
   ══════════════════════════════════════════════════════════════════════════ */
const stories = [
  {
    brand: "Klar", color: "#D0CCFF", textColor: "#100030",
    stat1: "3×", stat1Label: "More recruiter callbacks",
    stat2: "-48%", stat2Label: "Time to interview",
    headline: "How a PM Landed at Stripe with 1IMP",
    tagline: "Case Study",
  },
  {
    brand: "miro", color: "#FCD5F8", textColor: "#100030",
    stat1: "30%", stat1Label: "Higher interview rate",
    stat2: "55%", stat2Label: "More inbound recruiter messages",
    headline: "How a Designer Got 30% More Recruiter Replies with No Extra Applications",
    tagline: "Case Study",
  },
  {
    brand: "upside", color: "#FFE8C8", textColor: "#100030",
    stat1: "+44%", stat1Label: "Profile view-to-interview ratio",
    stat2: "-15%", stat2Label: "Time to offer",
    headline: "How an Engineer Landed a Higher-Paying Role at a Lower Application Count",
    tagline: "Case Study",
  },
  {
    brand: "inDrive", color: "#C8F0E8", textColor: "#100030",
    stat1: "5×", stat1Label: "Recruiter engagement vs PDF",
    stat2: "8 days", stat2Label: "From share to interview",
    headline: "How a Sales Leader Pivoted to Tech with One Impression",
    tagline: "Case Study",
  },
];

function SuccessStoriesSection() {
  const [active, setActive] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#F4F2FC", padding: "6rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.h2 {...fv(0)} animate={inView ? "visible" : "hidden"} style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#100030",
          textAlign: "center", letterSpacing: "-0.02em", lineHeight: 1.2,
          marginBottom: "3rem", maxWidth: 640, margin: "0 auto 3rem",
        }}>
          See how candidates are winning with 1IMP
        </motion.h2>

        {/* Cards carousel */}
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", position: "relative" }} className="stories-container">
          {stories.map((story, i) => {
            const isActive = i === active;
            const offset = i - active;
            return (
              <motion.div key={i}
                animate={{
                  scale: isActive ? 1 : 0.88,
                  opacity: isActive ? 1 : 0.7,
                  x: offset * 20,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActive(i)}
                style={{
                  borderRadius: 20, overflow: "hidden", cursor: "pointer",
                  minWidth: isActive ? 380 : 300, flex: isActive ? "0 0 380px" : "0 0 300px",
                  background: story.color, border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: isActive ? "0 12px 48px rgba(0,0,0,0.14)" : "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 300ms",
                }}
              >
                {/* Botanical SVG illustration at top */}
                <div style={{ height: isActive ? 200 : 160, background: story.color, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* Stylized plant shapes */}
                  <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} viewBox="0 0 380 200" width="100%" height="100%">
                    <ellipse cx={190} cy={220} rx={220} ry={80} fill="rgba(0,0,0,0.06)"/>
                    <path d="M90 200 Q100 140 130 100 Q150 70 140 30" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none"/>
                    <path d="M140 30 Q160 5 175 40" stroke="rgba(0,0,0,0.15)" strokeWidth="2" fill="none"/>
                    <ellipse cx={155} cy={35} rx={18} ry={28} fill="rgba(0,0,0,0.12)" transform="rotate(-15 155 35)"/>
                    <path d="M290 200 Q280 140 260 100 Q250 70 260 30" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none"/>
                    <ellipse cx={252} cy={28} rx={16} ry={26} fill="rgba(0,0,0,0.12)" transform="rotate(15 252 28)"/>
                    <path d="M190 200 Q185 160 195 120" stroke="rgba(0,0,0,0.15)" strokeWidth="2" fill="none"/>
                  </svg>

                  {/* Brand logo badge */}
                  <div style={{
                    background: "white", borderRadius: 12, padding: "0.5rem 1.25rem",
                    fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem",
                    color: "#100030", zIndex: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                  }}>
                    {story.brand}
                  </div>
                </div>

                {/* Card content */}
                <div style={{ padding: "1.5rem", background: isActive ? "white" : story.color }}>
                  {isActive && (
                    <>
                      <div style={{ fontSize: "0.75rem", color: "#9B97C8", fontWeight: 600, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {story.tagline}
                      </div>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", color: "#100030", lineHeight: 1.3, marginBottom: "1.25rem" }}>
                        {story.headline}
                      </p>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <div style={{ flex: 1, background: "rgba(99,97,184,0.08)", borderRadius: 10, padding: "0.75rem" }}>
                          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#6361B8", lineHeight: 1 }}>{story.stat1}</div>
                          <div style={{ fontSize: "0.75rem", color: "#777" }}>{story.stat1Label}</div>
                        </div>
                        <div style={{ flex: 1, background: "rgba(99,97,184,0.08)", borderRadius: 10, padding: "0.75rem" }}>
                          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#6361B8", lineHeight: 1 }}>{story.stat2}</div>
                          <div style={{ fontSize: "0.75rem", color: "#777" }}>{story.stat2Label}</div>
                        </div>
                      </div>
                      <button style={{
                        display: "inline-flex", alignItems: "center", gap: "0.4rem",
                        marginTop: "1.25rem", padding: "0.6rem 1.25rem",
                        background: "#100030", color: "white", borderRadius: 9999,
                        border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600,
                      }}>
                        Case Study <ArrowRight size={14} />
                      </button>
                    </>
                  )}
                  {!isActive && (
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "#100030", lineHeight: 1.35, opacity: 0.8 }}>
                      {story.headline}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation dots + arrows */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
          <button onClick={() => setActive(Math.max(0, active - 1))} style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(16,0,48,0.2)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={16} />
          </button>
          {stories.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 22 : 8, height: 8, borderRadius: 99, background: i === active ? "#100030" : "rgba(16,0,48,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 200ms" }} />
          ))}
          <button onClick={() => setActive(Math.min(stories.length - 1, active + 1))} style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(16,0,48,0.2)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={16} />
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
            Start making unforgettable first impressions today
          </h2>
          <Link href="/signup" style={{
            display: "inline-flex", alignItems: "center", padding: "0.8rem 2rem",
            background: "#E8355A", color: "white", borderRadius: 9999,
            fontSize: "1rem", fontWeight: 600, textDecoration: "none",
            fontFamily: "var(--font-body)", boxShadow: "0 2px 16px rgba(232,53,90,0.3)",
          }}>
            Create My Impression — It&apos;s Free
          </Link>
          <p style={{ fontSize: "0.8125rem", color: "#9999AA", marginTop: "1rem" }}>
            No credit card required · Ready in under 3 minutes
          </p>
        </motion.div>
      </div>

      {/* Botanical grasses/plants at the very bottom */}
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <svg viewBox="0 0 1440 180" style={{ width: "100%", height: "100%", position: "absolute", bottom: 0 }} preserveAspectRatio="none">
          {/* Grass blades */}
          <path d="M100 180 Q95 120 110 80 Q115 60 105 20" stroke="rgba(80,60,160,0.5)" strokeWidth="2" fill="none"/>
          <path d="M140 180 Q150 130 145 90 Q143 70 155 40" stroke="rgba(80,60,160,0.4)" strokeWidth="2" fill="none"/>
          <ellipse cx={120} cy={15} rx={14} ry={22} fill="rgba(80,60,160,0.3)" transform="rotate(-10 120 15)"/>
          <ellipse cx={148} cy={38} rx={12} ry={20} fill="rgba(80,60,160,0.25)" transform="rotate(12 148 38)"/>

          <path d="M250 180 Q245 130 260 85 Q265 60 255 25" stroke="rgba(80,60,160,0.4)" strokeWidth="2" fill="none"/>
          <ellipse cx={252} cy={22} rx={13} ry={21} fill="rgba(80,60,160,0.25)" transform="rotate(-8 252 22)"/>

          <path d="M1200 180 Q1205 130 1195 90 Q1192 65 1205 30" stroke="rgba(80,60,160,0.5)" strokeWidth="2" fill="none"/>
          <ellipse cx={1200} cy={26} rx={13} ry={21} fill="rgba(80,60,160,0.3)" transform="rotate(8 1200 26)"/>
          <path d="M1260 180 Q1258 125 1268 80 Q1272 55 1262 18" stroke="rgba(80,60,160,0.4)" strokeWidth="2" fill="none"/>
          <ellipse cx={1263} cy={15} rx={14} ry={22} fill="rgba(80,60,160,0.25)" transform="rotate(-12 1263 15)"/>

          <path d="M1350 180 Q1355 120 1345 75" stroke="rgba(80,60,160,0.35)" strokeWidth="2" fill="none"/>
          <ellipse cx={1345} cy={72} rx={10} ry={18} fill="rgba(80,60,160,0.2)" transform="rotate(5 1345 72)"/>

          {/* Large leaves */}
          <path d="M680 180 Q675 140 690 100 Q695 80 685 45" stroke="rgba(80,60,160,0.3)" strokeWidth="3" fill="none"/>
          <ellipse cx={685} cy={40} rx={18} ry={30} fill="rgba(80,60,160,0.15)" transform="rotate(-5 685 40)"/>
          <path d="M760 180 Q755 150 768 115" stroke="rgba(80,60,160,0.3)" strokeWidth="2" fill="none"/>
          <ellipse cx={768} cy={110} rx={12} ry={20} fill="rgba(80,60,160,0.15)" transform="rotate(10 768 110)"/>
        </svg>
      </div>

      {/* Dark footer */}
      <div style={{ background: "#0D0A1E", padding: "3rem 0 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "3rem" }} className="footer-cols">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path d="M20.5 11.5C20.5 11.5 18 10 15.5 11.5C13 13 13 16 15 17.5C17 19 19.5 18.5 20.5 17C21.5 15.5 21 13 19 12C17 11 14.5 12 13.5 14C12.5 16 13.5 18.5 15.5 19.5" stroke="#E8355A" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                </svg>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", color: "white" }}>1IMP</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 240 }}>
                The world&apos;s first AI-powered First Impression Platform. Helping every candidate get noticed.
              </p>
            </div>

            {/* Link columns */}
            {[
              { title: "Products", links: ["Impression Builder", "AI Editor", "Analytics", "Themes"] },
              { title: "Solutions", links: ["Job Seekers", "Career Changers", "Freelancers", "Executives"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Resources", links: ["Documentation", "Guides", "Privacy Policy", "Terms"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: "1rem", letterSpacing: "0.02em" }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link}>
                    <Link href="#" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 150ms" }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                    >{link}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>© 2025 1IMP Inc. All rights reserved.</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy Policy", "Terms", "Cookies"].map(link => (
                <Link key={link} href="#" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>{link}</Link>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){ .footer-cols{ grid-template-columns:1fr 1fr!important; gap:1.5rem!important; } }`}</style>
      </div>
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
        <LogosSection />
        <ChallengeSection />
        <HowItWorksSection />
        <SuccessStoriesSection />
        <ComparisonSection />
        <CTASection />
      </main>
    </>
  );
}
