"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CustomChevronDown } from "@/components/ui/CustomIcons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    fn(); // Check on mount
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "For Recruiters", href: "/recruiters" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Our Story", href: "/#our-story" },
  ];

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(16,0,48,0.05)" : "1px solid rgba(255,255,255,0.3)",
        transition: "all 320ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 72,
        }}>

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.45rem", textDecoration: "none", flexShrink: 0 }}>
            {/* Sword slash mark — blade diagonal + sweeping motion arc + tip dot */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Wide sweeping arc — the sword’s motion trail */}
              <path d="M 5 19 C 2 10 10 2 19 5" stroke="#E8355A" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeOpacity="0.45"/>
              {/* The blade — clean diagonal slash */}
              <line x1="5" y1="19" x2="19" y2="5" stroke="#E8355A" strokeWidth="2.2" strokeLinecap="round"/>
              {/* Impact point at tip */}
              <circle cx="19.5" cy="4.5" r="1.4" fill="#E8355A"/>
            </svg>
            <span style={{
              fontFamily: "var(--font-body)", fontWeight: 500,
              fontSize: "1.1rem", letterSpacing: "-0.01em",
              color: "#0A001F",
            }}>
              1IMP
            </span>
          </Link>

          {/* ── Center nav ───────────────────────────────────────────── */}
          <nav style={{ display: "flex", alignItems: "center", gap: "1rem", position: "absolute", left: "50%", transform: "translateX(-50%)" }} className="imp-nav">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: activeHover === link.label ? "#5858D7" : "#100030",
                  textDecoration: "none",
                  transition: "color 150ms ease",
                  fontFamily: "var(--font-body)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={() => setActiveHover(link.label)}
                onMouseLeave={() => setActiveHover(null)}
              >
                {link.label}
                {/* Adding Chevron for the Voyantis look (except maybe the last one, but let's add to all for consistency) */}
                <CustomChevronDown 
                  size={14} 
                  color="#100030" 
                  style={{ 
                    opacity: 0.6, 
                    marginTop: "2px",
                    transform: activeHover === link.label ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms ease"
                  }} 
                />
              </Link>
            ))}
          </nav>

          {/* ── Right side ───────────────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }} className="imp-nav-right">
            {/* Sign up */}
            <Link href="/signup" style={{
              fontSize: "0.9375rem", fontWeight: 600,
              color: "#100030",
              textDecoration: "none",
              fontFamily: "var(--font-body)", transition: "color 150ms",
              padding: "0.5rem"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#E8355A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#100030"; }}
            >
              Sign up
            </Link>

            {/* Log in */}
            <Link href="/login" style={{
              display: "inline-flex", alignItems: "center",
              padding: "0.6rem 1.4rem",
              background: "#0A001F", 
              color: "white", borderRadius: 9999,
              fontSize: "0.9375rem", fontWeight: 600,
              textDecoration: "none", fontFamily: "var(--font-body)",
              transition: "background 150ms ease",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#190040";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#0A001F";
              }}
            >
              Log in
            </Link>
          </div>

          {/* ── Mobile hamburger ─────────────────────────────────────── */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "6px", marginLeft: "auto", flexDirection: "column", gap: "5px" }}
            className="imp-hamburger"
          >
            <motion.div animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }} style={{ width: 22, height: 2, background: "#100030", borderRadius: 2, transformOrigin: "center" }} transition={{ duration: 0.2 }} />
            <motion.div animate={{ opacity: mobileOpen ? 0 : 1 }} style={{ width: 22, height: 2, background: "#100030", borderRadius: 2 }} transition={{ duration: 0.2 }} />
            <motion.div animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }} style={{ width: 22, height: 2, background: "#100030", borderRadius: 2, transformOrigin: "center" }} transition={{ duration: 0.2 }} />
          </button>
        </div>

        {/* ── Mobile menu ──────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "rgba(255,255,255,0.98)", borderTop: "1px solid rgba(16,0,48,0.05)", overflow: "hidden" }}
            >
              <div style={{ padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {navLinks.map(link => (
                  <Link key={link.label} href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ padding: "0.7rem 0.875rem", fontSize: "1rem", fontWeight: 500, color: "#100030", textDecoration: "none", borderRadius: 10, fontFamily: "var(--font-body)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(16,0,48,0.04)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div style={{ height: 1, background: "rgba(16,0,48,0.05)", margin: "0.5rem 0" }} />
                <div style={{ display: "flex", gap: "0.625rem", paddingTop: "0.25rem" }}>
                  <Link href="/signup" style={{ flex: 1, textAlign: "center", padding: "0.7rem", border: "1.5px solid rgba(16,0,48,0.1)", borderRadius: 10, fontSize: "0.9rem", fontWeight: 600, color: "#100030", textDecoration: "none" }}>Sign up</Link>
                  <Link href="/login" style={{ flex: 1, textAlign: "center", padding: "0.7rem", background: "#0A001F", borderRadius: 10, fontSize: "0.9rem", fontWeight: 600, color: "white", textDecoration: "none" }}>Log in</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        @media(max-width: 1024px) {
          .imp-nav { display: none !important; }
          .imp-nav-right { display: none !important; }
          .imp-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
