"use client";

import { motion } from "framer-motion";
import { Copy, Eye, Building, MousePointerClick, ArrowUpRight, Plus, ExternalLink, Settings, PenTool } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const slug = "alex"; // Mock slug

  const handleCopy = () => {
    navigator.clipboard.writeText(`1imp.io/p/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        
        {/* Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "#100030", letterSpacing: "-0.02em" }}>
            Welcome back, Alex.
          </h1>
          <p style={{ color: "#555570", fontSize: "1rem" }}>Here's how your first impression is performing.</p>
        </motion.div>

        {/* Active Link Banner */}
        <motion.div variants={itemVariants} style={{
          background: "white", padding: "1.5rem", borderRadius: 16,
          border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 4px 12px rgba(16,0,48,0.02)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
          marginBottom: "2rem"
        }}>
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#6361B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
              Your Active Link
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ fontSize: "1.125rem", fontWeight: 600, color: "#100030" }}>
                1imp.io/p/<span style={{ color: "#E8355A" }}>{slug}</span>
              </div>
              <Link href={`/p/${slug}`} target="_blank" style={{ color: "#9999AA", transition: "color 150ms" }} title="View Profile">
                <ExternalLink size={18} />
              </Link>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button 
              onClick={handleCopy}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.6rem 1rem", background: "rgba(99,97,184,0.1)", color: "#6361B8",
                border: "none", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
                transition: "all 150ms"
              }}
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <Link href="/editor" style={{
                display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none",
                padding: "0.6rem 1rem", background: "#100030", color: "white",
                border: "none", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600, transition: "background 150ms"
              }}
            >
              <PenTool size={16} />
              Edit Profile
            </Link>
          </div>
        </motion.div>

        {/* Analytics Grid */}
        <motion.div variants={itemVariants} style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "2rem"
        }}>
          {/* Stat Card 1 */}
          <div style={{ background: "white", padding: "1.5rem", borderRadius: 16, border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 4px 12px rgba(16,0,48,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(99,97,184,0.1)", color: "#6361B8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Eye size={20} />
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#34A853", fontSize: "0.8125rem", fontWeight: 600 }}>
                <ArrowUpRight size={14} /> +12%
              </span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#100030", lineHeight: 1 }}>
              142
            </div>
            <div style={{ color: "#555570", fontSize: "0.875rem", marginTop: "0.4rem" }}>Profile Views (30 days)</div>
          </div>

          {/* Stat Card 2 */}
          <div style={{ background: "white", padding: "1.5rem", borderRadius: 16, border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 4px 12px rgba(16,0,48,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(232,53,90,0.1)", color: "#E8355A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MousePointerClick size={20} />
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#34A853", fontSize: "0.8125rem", fontWeight: 600 }}>
                <ArrowUpRight size={14} /> +5%
              </span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#100030", lineHeight: 1 }}>
              18
            </div>
            <div style={{ color: "#555570", fontSize: "0.875rem", marginTop: "0.4rem" }}>Resume Downloads</div>
          </div>

          {/* Stat Card 3 */}
          <div style={{ background: "white", padding: "1.5rem", borderRadius: 16, border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 4px 12px rgba(16,0,48,0.02)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#555570", fontSize: "0.875rem", fontWeight: 600, marginBottom: "1rem" }}>
              <Building size={16} /> Top Companies Viewing You
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem", justifyContent: "center" }}>
              {[
                { name: "Google", views: 4 },
                { name: "Stripe", views: 2 },
                { name: "Acme Corp", views: 1 },
              ].map(company => (
                <div key={company.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.9375rem" }}>
                  <span style={{ color: "#100030", fontWeight: 500 }}>{company.name}</span>
                  <span style={{ color: "#9999AA" }}>{company.views} views</span>
                </div>
              ))}
            </div>
            <Link href="/dashboard/settings" style={{ fontSize: "0.8125rem", color: "#6361B8", textDecoration: "none", fontWeight: 600, marginTop: "1rem" }}>
              Upgrade to see all →
            </Link>
          </div>
        </motion.div>

        {/* Upgrade / Next Steps Area */}
        <motion.div variants={itemVariants} style={{
          background: "linear-gradient(135deg, #100030 0%, #1A004A 100%)", borderRadius: 16, padding: "2rem", color: "white",
          display: "flex", flexDirection: "column", gap: "1rem", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(232,53,90,0.15)", filter: "blur(40px)" }} />
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E8355A", fontWeight: 700, fontSize: "0.8125rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#E8355A" }} />
            Unlock Pro
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem" }}>Take control of your job search</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 480, lineHeight: 1.6, fontSize: "0.9375rem" }}>
            Get unlimited AI summary rewrites, real-time viewer notifications, custom URL slugs, and full analytics.
          </p>
          <Link href="/dashboard/settings" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-start",
            padding: "0.6rem 1.25rem", background: "#E8355A", color: "white", borderRadius: 8,
            fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none", marginTop: "0.5rem"
          }}>
            Upgrade to Pro
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
