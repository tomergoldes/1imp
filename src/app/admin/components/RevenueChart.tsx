"use client";

import { TrendingUp } from "lucide-react";

export function RevenueChart() {
  return (
    <div style={{ background: "rgba(13, 10, 30, 0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", margin: 0 }}>Revenue Growth (Mock)</h2>
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34A853", fontSize: "0.875rem", fontWeight: 600, background: "rgba(52, 168, 83, 0.1)", padding: "4px 10px", borderRadius: 12 }}>
          <TrendingUp size={16} /> +15.3% this month
        </span>
      </div>
      
      {/* Fake Bar Chart */}
      <div style={{ height: "240px", display: "flex", alignItems: "flex-end", gap: "2%", paddingTop: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        {[30, 45, 35, 60, 50, 75, 65, 80, 95, 85, 100, 120].map((h, i) => (
          <div key={i} style={{
            flex: 1, height: `${(h / 120) * 100}%`,
            background: i === 11 ? "linear-gradient(to top, #E8355A, #6361B8)" : "rgba(255,255,255,0.05)",
            borderRadius: "6px 6px 0 0",
            transition: "all 300ms ease",
            cursor: "pointer",
            boxShadow: i === 11 ? "0 0 20px rgba(232,53,90,0.4)" : "none"
          }} 
          onMouseEnter={(e) => {
            if (i !== 11) {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "scaleY(1.05)";
              e.currentTarget.style.transformOrigin = "bottom";
            }
          }}
          onMouseLeave={(e) => {
            if (i !== 11) {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.transform = "scaleY(1)";
            }
          }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontWeight: 600 }}>
        <span>Jan</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
        <span>Dec</span>
      </div>
    </div>
  );
}
