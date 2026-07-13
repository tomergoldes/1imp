"use client";

import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Film } from "lucide-react";

interface StepGeneratingProps {
  status: "rendering" | "completed" | "error";
  videoUrl?: string | null;
}

export function StepGenerating({ status, videoUrl }: StepGeneratingProps) {
  
  if (status === "completed" && videoUrl) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          style={{ width: 80, height: 80, borderRadius: "50%", background: "#34A853", color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", boxShadow: "0 10px 30px rgba(52,168,83,0.3)" }}
        >
          <CheckCircle2 size={40} />
        </motion.div>
        
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", color: "#100030", marginBottom: "0.75rem" }}>
          Your Video is Ready!
        </h2>
        <p style={{ color: "#555570", lineHeight: 1.6, fontSize: "1.1rem", maxWidth: 400, margin: "0 auto 2rem" }}>
          The final render is complete. You can now view your candidate story video.
        </p>
        
        <a 
          href={videoUrl}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", background: "linear-gradient(135deg, #E8355A, #6361B8)", color: "white", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: "1.1rem", boxShadow: "0 8px 24px rgba(232,53,90,0.3)" }}
        >
          <Film size={20} /> Watch Video
        </a>
      </motion.div>
    );
  }

  if (status === "error") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>💥</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#E8355A", marginBottom: "0.75rem" }}>
          Render Failed
        </h2>
        <p style={{ color: "#555570", marginBottom: "2rem" }}>Something went wrong while compiling your video. Our team has been notified.</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "#100030", color: "white", borderRadius: 999, border: "none", fontWeight: 600, cursor: "pointer" }}
        >
          Refresh Page
        </button>
      </motion.div>
    );
  }

  // status === "rendering"
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 2rem" }}>
        {/* Animated rings */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", inset: 0, border: "3px dashed rgba(232,53,90,0.3)", borderRadius: "50%" }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", inset: 8, border: "3px dashed rgba(99,97,184,0.3)", borderRadius: "50%" }} />
        
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>
          🎬
        </div>
      </div>
      
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#100030", marginBottom: "0.75rem" }}>
        Rendering your Video
      </h2>
      <p style={{ color: "#555570", lineHeight: 1.6, fontSize: "1.05rem", maxWidth: 450, margin: "0 auto 2rem" }}>
        We are generating your ninja avatar, synthesizing the voice-over, rendering AI scenes, and composing the final timeline. This takes about 1-2 minutes.
      </p>
      
      <div style={{ background: "rgba(99,97,184,0.08)", padding: "1rem 1.5rem", borderRadius: 12, display: "inline-block" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#6361B8", fontWeight: 600 }}>
          <Loader2 size={18} className="animate-spin" /> Do not close this page
        </div>
      </div>
    </motion.div>
  );
}
