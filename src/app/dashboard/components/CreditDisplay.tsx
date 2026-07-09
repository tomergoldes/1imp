"use client";

import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import Link from "next/link";

export function CreditDisplay() {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/user/credits")
      .then(res => res.json())
      .then(data => {
        if (data.credits !== undefined) {
          setCredits(data.credits);
        }
      })
      .catch(err => console.error("Failed to fetch credits", err));
  }, []);

  if (credits === null) return null;

  return (
    <div style={{ padding: "0 1.5rem", marginBottom: "1rem" }}>
      <div style={{
        background: "linear-gradient(135deg, rgba(232,53,90,0.1) 0%, rgba(99,97,184,0.1) 100%)",
        borderRadius: 12, padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem",
        border: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.9)", fontSize: "0.875rem", fontWeight: 600 }}>
            <Coins size={16} color="#E8355A" />
            Credits
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "white", fontSize: "1.125rem" }}>
            {credits}
          </span>
        </div>
        
        {credits === 0 && (
          <Link href="/pricing" style={{
            display: "block", textAlign: "center", background: "#E8355A", color: "white",
            padding: "0.5rem", borderRadius: 8, fontSize: "0.8125rem", fontWeight: 600,
            textDecoration: "none", marginTop: "0.25rem"
          }}>
            Buy Credits
          </Link>
        )}
      </div>
    </div>
  );
}
