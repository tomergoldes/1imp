"use client";

import { useState } from "react";

export function MetricCard({ title, value, icon, trend, color, isMock = false }: { title: string, value: string | number, icon: React.ReactNode, trend: string, color: string, isMock?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "rgba(13, 10, 30, 0.7)", 
        border: `1px solid ${isHovered ? color : "rgba(255,255,255,0.05)"}`, 
        borderRadius: 16, 
        padding: "1.5rem",
        position: "relative", 
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "all 300ms ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? `0 10px 30px -10px ${color}40` : "0 4px 6px rgba(0,0,0,0.1)"
      }}
    >
      {/* Glow Effect */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "150px",
        height: "150px",
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        transform: "translate(30%, -30%)",
        pointerEvents: "none",
        transition: "opacity 300ms",
        opacity: isHovered ? 1 : 0.5
      }} />

      {isMock && (
        <div style={{ position: "absolute", top: 12, right: 12, fontSize: "0.65rem", background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4, color: "rgba(255,255,255,0.5)" }}>
          MOCK
        </div>
      )}
      <div style={{ 
        width: 48, height: 48, borderRadius: 12, 
        background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)`, 
        border: "1px solid rgba(255,255,255,0.1)",
        color: color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem",
        boxShadow: `inset 0 0 20px ${color}15`
      }}>
        {icon}
      </div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginBottom: "0.25rem", fontWeight: 500 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "white", lineHeight: 1 }}>{value}</div>
        <div style={{ color: "#34A853", fontSize: "0.875rem", fontWeight: 600, background: "rgba(52, 168, 83, 0.1)", padding: "2px 8px", borderRadius: 12 }}>{trend}</div>
      </div>
    </div>
  );
}
