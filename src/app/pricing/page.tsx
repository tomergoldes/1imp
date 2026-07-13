"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCheck } from "@/components/ui/CustomIcons";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: "#F4F2FC", minHeight: "100vh", paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }}>
          
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#100030", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
              Pay only for what you love.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              style={{ fontSize: "1.125rem", color: "#555570", maxWidth: 600, margin: "0 auto" }}>
              Our transparent Freemium model means you generate your AI video completely free. You only pay to remove the watermark and download the HD file.
            </motion.p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr md:1fr 1fr", gap: "2rem", alignItems: "stretch" }} className="md:grid-cols-2">
            
            {/* Free Tier */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ background: "white", borderRadius: 24, padding: "2.5rem", border: "1px solid rgba(16,0,48,0.1)", boxShadow: "0 4px 20px rgba(16,0,48,0.05)", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "#100030", marginBottom: "0.5rem" }}>Preview</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "#100030", lineHeight: 1 }}>$0</span>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "2rem", lineHeight: 1.5 }}>
                Generate your video and see the magic before committing.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flexGrow: 1, marginBottom: "2rem" }}>
                {[
                  "AI Script Generation",
                  "AI Video Generation",
                  "Watermarked Preview",
                  "Hosted on 1IMP (Private)"
                ].map((feature, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9375rem", color: "#444466" }}>
                    <CustomCheck size={18} color="#E8355A" /> {feature}
                  </div>
                ))}
              </div>
              
              <Link href="/create" passHref style={{ textDecoration: 'none' }}>
                <button className="w-full py-4 text-lg rounded-xl border border-gray-300 text-gray-700 bg-transparent cursor-pointer font-semibold transition hover:bg-gray-50 flex items-center justify-center">
                  Try it for Free
                </button>
              </Link>
            </motion.div>

            {/* Premium Unlock */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: "#100030", borderRadius: 24, padding: "2.5rem", position: "relative", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 12px 40px rgba(16,0,48,0.2)", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#E8355A", color: "white", padding: "0.25rem 1rem", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Premium Unlock
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "white", marginBottom: "0.5rem" }}>Full Access</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "white", lineHeight: 1 }}>$9.99</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>/ video</span>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", marginBottom: "2rem", lineHeight: 1.5 }}>
                Unlock your masterpiece and share it everywhere.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flexGrow: 1, marginBottom: "2rem" }}>
                {[
                  "No 1IMP Watermark",
                  "HD 1080p Download (MP4)",
                  "Shareable Public Profile",
                  "Commercial Rights"
                ].map((feature, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9375rem", color: "rgba(255,255,255,0.9)" }}>
                    <CustomCheck size={18} color="#E8355A" /> {feature}
                  </div>
                ))}
              </div>

              <Link href="/create" passHref style={{ textDecoration: 'none' }}>
                <button className="w-full py-4 text-lg rounded-xl bg-[#E8355A] text-white cursor-pointer font-semibold transition hover:bg-[#D02045] shadow-[0_4px_16px_rgba(232,53,90,0.3)] flex items-center justify-center border-none">
                  Create Now
                </button>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
