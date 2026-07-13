"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, LayoutDashboard, Settings, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();

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
        position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 200,
        width: "calc(100% - 40px)", maxWidth: 1100, height: 60,
        background: "white",
        borderRadius: 100,
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        transition: "all 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 8px 0 24px"
      }}>
          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link href={session?.user ? "/dashboard" : "/"} style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", flexShrink: 0 }}>
            {/* Swirly-ish minimalist logo placeholder matching the vibe */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1A1A1A" strokeWidth="2.5"/>
              <path d="M7 12C7 9.23858 9.23858 7 12 7" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "1.2rem", letterSpacing: "-0.02em",
              color: "#1A1A1A",
            }}>
              1IMP
            </span>
          </Link>

          {/* ── Center nav ───────────────────────────────────────────── */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "absolute", left: "50%", transform: "translateX(-50%)" }} className="imp-nav">
            {navLinks.map((link, i) => {
              // Simulate first link as active for the visual match
              const isActive = i === 0;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    display: "flex", alignItems: "center",
                    padding: "0.4rem 1.1rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    whiteSpace: "nowrap",
                    border: isActive ? "1px solid rgba(0,0,0,0.8)" : "1px solid transparent",
                    borderRadius: 100,
                    transition: "all 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#666";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#1A1A1A";
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right side ───────────────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }} className="imp-nav-right">
            {session?.user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <Link href="/dashboard" style={{
                  fontSize: "0.9375rem", fontWeight: 600, color: "#100030", textDecoration: "none", fontFamily: "var(--font-body)", transition: "color 150ms",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#E8355A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#100030"; }}
                >
                  Dashboard
                </Link>

                <div style={{ position: "relative" }}>
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.5rem",
                      padding: "4px 12px 4px 4px", borderRadius: 999,
                      background: "white", color: "#100030",
                      border: "1px solid rgba(16,0,48,0.1)", cursor: "pointer",
                      fontFamily: "var(--font-body)", fontWeight: 600,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(16,0,48,0.2)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(16,0,48,0.1)"}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "linear-gradient(135deg, #E8355A 0%, #6361B8 100%)",
                      color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1rem", fontFamily: "var(--font-display)"
                    }}>
                      {session.user.name ? session.user.name.charAt(0).toUpperCase() : <User size={16} />}
                    </div>
                    <span style={{ fontSize: "0.875rem" }}>
                      {session.user.name ? session.user.name.split(" ")[0] : "Account"}
                    </span>
                    <ChevronDown size={14} style={{ opacity: 0.5, transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: "absolute", top: "calc(100% + 10px)", right: 0,
                          background: "white", borderRadius: 12, padding: "0.5rem",
                          boxShadow: "0 10px 40px rgba(16,0,48,0.1)", border: "1px solid rgba(16,0,48,0.05)",
                          minWidth: 200, display: "flex", flexDirection: "column", gap: "0.25rem"
                        }}
                      >
                        <div style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(16,0,48,0.05)", marginBottom: "0.25rem" }}>
                          <div style={{ fontWeight: 600, color: "#100030", fontSize: "0.9rem" }}>{session.user.name || "User"}</div>
                          <div style={{ fontSize: "0.75rem", color: "#9999AA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session.user.email}</div>
                        </div>
                        
                        <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0.75rem", color: "#100030", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, borderRadius: 8 }} onMouseEnter={e => e.currentTarget.style.background = "rgba(16,0,48,0.04)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                        <Link href="/dashboard/settings" onClick={() => setUserMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0.75rem", color: "#100030", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, borderRadius: 8 }} onMouseEnter={e => e.currentTarget.style.background = "rgba(16,0,48,0.04)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <Settings size={16} /> Settings
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => signOut()} 
                  style={{
                    display: "flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.5rem 0.875rem", borderRadius: 999,
                    background: "rgba(232,53,90,0.08)", color: "#E8355A",
                    border: "none", cursor: "pointer",
                    fontSize: "0.875rem", fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    transition: "background 150ms ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(232,53,90,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(232,53,90,0.08)"}
                >
                  <LogOut size={14} /> Log out
                </button>
              </div>
            ) : (
              <Link href="/signup" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "0.65rem 1.2rem",
                background: "#1A1A1A", 
                color: "white", borderRadius: 100,
                fontSize: "0.9rem", fontWeight: 600,
                textDecoration: "none", fontFamily: "var(--font-body)",
                transition: "background 200ms ease",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#333"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#1A1A1A"; }}
              >
                Book A Free Meeting
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5v10M19 5H9" />
                </svg>
              </Link>
            )}
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
                {session?.user ? (
                  <>
                    <div style={{ padding: "0.5rem 0.875rem" }}>
                      <div style={{ fontWeight: 600, color: "#100030" }}>{session.user.name || "User"}</div>
                      <div style={{ fontSize: "0.85rem", color: "#9999AA" }}>{session.user.email}</div>
                    </div>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{ padding: "0.7rem 0.875rem", fontSize: "1rem", fontWeight: 500, color: "#100030", textDecoration: "none", borderRadius: 10 }}>Dashboard</Link>
                    <button onClick={() => { signOut(); setMobileOpen(false); }} style={{ padding: "0.7rem 0.875rem", fontSize: "1rem", fontWeight: 500, color: "#E8355A", background: "none", border: "none", textAlign: "left", cursor: "pointer", borderRadius: 10 }}>Log out</button>
                  </>
                ) : (
                  <div style={{ display: "flex", gap: "0.625rem", paddingTop: "0.25rem" }}>
                    <Link href="/signup" style={{ flex: 1, textAlign: "center", padding: "0.7rem", border: "1.5px solid rgba(16,0,48,0.1)", borderRadius: 10, fontSize: "0.9rem", fontWeight: 600, color: "#100030", textDecoration: "none" }}>Sign up</Link>
                    <Link href="/login" style={{ flex: 1, textAlign: "center", padding: "0.7rem", background: "#0A001F", borderRadius: 10, fontSize: "0.9rem", fontWeight: 600, color: "white", textDecoration: "none" }}>Log in</Link>
                  </div>
                )}
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
