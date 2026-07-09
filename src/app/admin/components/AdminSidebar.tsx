"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Video, CreditCard, Settings, LogOut } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "280px", 
      background: "#0D0A1E", 
      borderRight: "1px solid rgba(255,255,255,0.05)",
      display: "flex", 
      flexDirection: "column"
    }}>
      <div style={{ padding: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13" stroke="#E8355A" strokeWidth="2"/>
            <circle cx="15" cy="15" r="8" stroke="#E8355A" strokeWidth="1.5" strokeOpacity="0.35"/>
            <circle cx="15" cy="15" r="3.5" fill="#E8355A"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "white" }}>
            1IMP <span style={{ color: "#E8355A", fontSize: "0.8rem", verticalAlign: "top" }}>CRM</span>
          </span>
        </Link>
      </div>

      <nav style={{ padding: "2rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <AdminNavLink href="/admin" icon={<Home size={18} />} label="Overview" active={pathname === "/admin"} />
        <AdminNavLink href="/admin/users" icon={<Users size={18} />} label="Users" active={pathname.startsWith("/admin/users")} />
        <AdminNavLink href="/admin/videos" icon={<Video size={18} />} label="Videos" active={pathname.startsWith("/admin/videos")} />
        <AdminNavLink href="/admin/payments" icon={<CreditCard size={18} />} label="Payments" active={pathname.startsWith("/admin/payments")} />
        
        <div style={{ marginTop: "auto" }}>
          <AdminNavLink href="/admin/settings" icon={<Settings size={18} />} label="Settings" active={pathname.startsWith("/admin/settings")} />
          <AdminNavLink href="/api/auth/signout" icon={<LogOut size={18} />} label="Sign Out" />
        </div>
      </nav>
    </aside>
  );
}

function AdminNavLink({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link href={href} style={{
      display: "flex", 
      alignItems: "center", 
      gap: "0.75rem",
      padding: "0.8rem 1rem", 
      borderRadius: 8,
      background: active ? "rgba(232,53,90,0.1)" : "transparent",
      color: active ? "#E8355A" : "rgba(255,255,255,0.6)",
      textDecoration: "none", 
      fontSize: "0.9375rem", 
      fontWeight: active ? 600 : 500,
      transition: "all 150ms",
      boxShadow: active ? "0 0 10px rgba(232,53,90,0.2)" : "none"
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.color = "white";
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
      }
    }}
    >
      {icon}
      {label}
    </Link>
  );
}
