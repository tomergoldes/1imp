"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomMail, CustomMessageSquare, CustomMapPin } from "@/components/ui/CustomIcons";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: "#F4F2FC", minHeight: "100vh", paddingTop: 72 }}>
        {/* Header */}
        <section style={{ background: "linear-gradient(135deg, #100030 0%, #1A0050 100%)", padding: "6rem 1.5rem 5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "rgba(232,53,90,0.08)", pointerEvents: "none" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ position: "relative", zIndex: 2 }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#E8355A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>CONTACT US</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Let's build the future<br />of hiring together.
            </h1>
            <p style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.6)", maxWidth: 540, margin: "0 auto" }}>
              Whether you have a question about our platform, enterprise pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </motion.div>
        </section>

        {/* Contact Methods */}
        <section style={{ maxWidth: 1000, margin: "-4rem auto 0", padding: "0 1.5rem 6rem", position: "relative", zIndex: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="contact-grid">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: "white", borderRadius: 20, padding: "2.5rem", border: "1px solid rgba(99,82,138,0.12)", boxShadow: "0 12px 32px rgba(16,0,48,0.06)", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(232,53,90,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <CustomMail color="#E8355A" size={24} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "#100030", marginBottom: "0.5rem" }}>Email Us</h3>
              <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "1.5rem", lineHeight: 1.6 }}>For general inquiries and support.</p>
              <a href="mailto:hello@1imp.io" style={{ fontSize: "1rem", fontWeight: 600, color: "#6361B8", textDecoration: "none" }}>hello@1imp.io</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: "white", borderRadius: 20, padding: "2.5rem", border: "1px solid rgba(99,82,138,0.12)", boxShadow: "0 12px 32px rgba(16,0,48,0.06)", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(99,97,184,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <CustomMessageSquare color="#6361B8" size={24} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "#100030", marginBottom: "0.5rem" }}>Sales</h3>
              <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "1.5rem", lineHeight: 1.6 }}>Talk to our team about enterprise.</p>
              <a href="mailto:sales@1imp.io" style={{ fontSize: "1rem", fontWeight: 600, color: "#E8355A", textDecoration: "none" }}>sales@1imp.io</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ background: "white", borderRadius: 20, padding: "2.5rem", border: "1px solid rgba(99,82,138,0.12)", boxShadow: "0 12px 32px rgba(16,0,48,0.06)", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(16,0,48,0.05)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <CustomMapPin color="#100030" size={24} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "#100030", marginBottom: "0.5rem" }}>Office</h3>
              <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "1.5rem", lineHeight: 1.6 }}>Come say hi at our headquarters.</p>
              <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#100030", margin: 0 }}>San Francisco, CA</p>
            </motion.div>
          </div>
        </section>

        <style>{`
          @media(max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
