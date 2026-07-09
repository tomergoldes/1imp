"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCheck } from "@/components/ui/CustomIcons";
import { Loader2 } from "lucide-react";

export default function PricingPage() {
  const [loading, setLoading] = useState<number | null>(null);

  const handleCheckout = async (credits: number, packId: number) => {
    setLoading(packId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credits })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout: " + data.error);
      }
    } catch (err) {
      alert("Error starting checkout");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ background: "#F4F2FC", minHeight: "100vh", paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#100030", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
              Simple pricing. Infinite reach.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              style={{ fontSize: "1.125rem", color: "#555570", maxWidth: 600, margin: "0 auto" }}>
              Purchase credits to generate your viral Video Stories.
            </motion.p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "flex-start" }}>
            
            {/* Starter Pack */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ background: "white", borderRadius: 24, padding: "2.5rem", border: "1px solid rgba(16,0,48,0.1)", boxShadow: "0 4px 20px rgba(16,0,48,0.05)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "#100030", marginBottom: "0.5rem" }}>Starter</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#100030", lineHeight: 1 }}>$2.99</span>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "2rem", lineHeight: 1.5 }}>
                Perfect for your current job search.
              </p>
              <button onClick={() => handleCheckout(1, 1)} disabled={loading !== null} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem", background: "rgba(16,0,48,0.05)", color: "#100030", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 600, transition: "background 150ms", marginBottom: "2rem" }}>
                {loading === 1 ? <Loader2 size={20} className="animate-spin" /> : "Buy 1 Credit"}
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  "1 AI Video Generation",
                  "Basic Video Themes",
                  "Standard Video Rendering",
                  "Shareable Web Link"
                ].map((feature, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9375rem", color: "#444466" }}>
                    <CustomCheck size={18} color="#E8355A" /> {feature}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pro Pack */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: "#100030", borderRadius: 24, padding: "2.5rem", position: "relative", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 12px 40px rgba(16,0,48,0.2)" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#E8355A", color: "white", padding: "0.25rem 1rem", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Most Popular
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "white", marginBottom: "0.5rem" }}>Pro Pack</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "white", lineHeight: 1 }}>$12</span>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", marginBottom: "2rem", lineHeight: 1.5 }}>
                For ambitious candidates actively interviewing.
              </p>
              <button onClick={() => handleCheckout(5, 2)} disabled={loading !== null} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem", background: "#E8355A", border: "none", cursor: "pointer", color: "white", borderRadius: 12, fontWeight: 600, boxShadow: "0 4px 16px rgba(232,53,90,0.3)", marginBottom: "2rem" }}>
                {loading === 2 ? <Loader2 size={20} className="animate-spin" /> : "Buy 5 Credits"}
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  "5 AI Video Generations",
                  "Premium Video Themes",
                  "View Analytics & Tracking",
                  "Remove 1IMP Branding"
                ].map((feature, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9375rem", color: "rgba(255,255,255,0.9)" }}>
                    <CustomCheck size={18} color="#E8355A" /> {feature}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Career Pack */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ background: "white", borderRadius: 24, padding: "2.5rem", border: "1px solid rgba(16,0,48,0.1)", boxShadow: "0 4px 20px rgba(16,0,48,0.05)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "#100030", marginBottom: "0.5rem" }}>Career Pack</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#100030", lineHeight: 1 }}>$39</span>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "2rem", lineHeight: 1.5 }}>
                A one-time boost for multiple applications.
              </p>
              <button onClick={() => handleCheckout(20, 3)} disabled={loading !== null} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem", background: "rgba(16,0,48,0.05)", border: "none", cursor: "pointer", color: "#100030", borderRadius: 12, fontWeight: 600, transition: "background 150ms", marginBottom: "2rem" }}>
                {loading === 3 ? <Loader2 size={20} className="animate-spin" /> : "Buy 20 Credits"}
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  "3 Custom Video Stories",
                  "AI Cover Letter Generator",
                  "LinkedIn Profile Audit",
                  "Lifetime access to your stories"
                ].map((feature, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9375rem", color: "#444466" }}>
                    <CustomCheck size={18} color="#E8355A" /> {feature}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
