"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, PenTool, Settings, LogOut, Menu, X, Video, Share2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { CreditDisplay } from "./components/CreditDisplay";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Videos", href: "/dashboard/videos", icon: Video },
  { name: "Share", href: "/dashboard/share", icon: Share2 },
  { name: "Editor", href: "/editor", icon: PenTool },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F8FC", fontFamily: "var(--font-body)" }}>
      {/* Sidebar Desktop */}
      <aside style={{
        width: 260, background: "#100030", color: "white",
        display: "flex", flexDirection: "column", flexShrink: 0,
      }} className="desktop-sidebar">
        {/* Logo */}
        <div style={{ padding: "2rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="13" stroke="#E8355A" strokeWidth="2"/><circle cx="15" cy="15" r="8" stroke="#E8355A" strokeWidth="1.5" strokeOpacity="0.35"/><circle cx="15" cy="15" r="3.5" fill="#E8355A"/></svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>1IMP</span>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "0 1rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em", padding: "0 0.5rem", marginBottom: "0.75rem" }}>Menu</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link href={item.href} style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.6rem 0.75rem", borderRadius: 8,
                    background: isActive ? "rgba(99,97,184,0.2)" : "transparent",
                    color: isActive ? "white" : "rgba(255,255,255,0.6)",
                    textDecoration: "none", fontWeight: isActive ? 600 : 500,
                    fontSize: "0.9375rem", transition: "all 150ms",
                  }}>
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} color={isActive ? "#E8355A" : "currentColor"} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Credits */}
        <CreditDisplay />

        {/* User / Logout */}
        <div style={{ padding: "1.5rem 1rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem", width: "100%",
              padding: "0.6rem 0.75rem", borderRadius: 8, background: "transparent", border: "none",
              color: "rgba(255,255,255,0.6)", cursor: "pointer", fontWeight: 500,
              fontSize: "0.9375rem", transition: "color 150ms", textAlign: "left"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "white"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
          >
            <LogOut size={18} strokeWidth={2} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Mobile Header */}
        <header className="mobile-header" style={{
          background: "white", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(16,0,48,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="13" stroke="#E8355A" strokeWidth="2"/><circle cx="15" cy="15" r="8" stroke="#E8355A" strokeWidth="1.5" strokeOpacity="0.35"/><circle cx="15" cy="15" r="3.5" fill="#E8355A"/></svg>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "#100030" }}>1IMP</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#100030" }}
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
          {children}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(16,0,48,0.4)", backdropFilter: "blur(4px)" }} 
          />
          <motion.div 
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{ position: "relative", width: 280, background: "#100030", height: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", color: "white" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem" }}>1IMP</span>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "white" }}>
                <X size={24} />
              </button>
            </div>
            
            <nav style={{ flex: 1, padding: "1rem" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} onClick={() => setMobileMenuOpen(false)} style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      padding: "0.75rem 1rem", borderRadius: 8,
                      background: pathname === item.href ? "rgba(99,97,184,0.2)" : "transparent",
                      color: pathname === item.href ? "white" : "rgba(255,255,255,0.7)",
                      textDecoration: "none", fontWeight: pathname === item.href ? 600 : 500,
                      fontSize: "1rem"
                    }}>
                      <item.icon size={20} color={pathname === item.href ? "#E8355A" : "currentColor"} />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </div>
      )}

      <style>{`
        .mobile-header { display: none !important; }
        @media(max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
          main { padding: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}
