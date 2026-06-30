"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type UploadState = "idle" | "dragging" | "uploading" | "done" | "error";

export default function OnboardingPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file) return;
    setFileName(file.name);
    setUploadState("uploading");
    setProgress(0);

    // Simulate upload + AI parsing progress
    const steps = [15, 35, 55, 72, 88, 100];
    for (const p of steps) {
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
      setProgress(p);
    }
    await new Promise(r => setTimeout(r, 300));
    setUploadState("done");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setUploadState("idle");
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #F0EEFB 0%, #E4E0F4 60%, #ECEEF8 100%)",
      display: "flex", flexDirection: "column",
    }}>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2rem", borderBottom: "1px solid rgba(99,82,138,0.12)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13" stroke="#E8355A" strokeWidth="2"/>
            <circle cx="15" cy="15" r="8" stroke="#E8355A" strokeWidth="1.5" strokeOpacity="0.35"/>
            <circle cx="15" cy="15" r="3.5" fill="#E8355A"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#100030", letterSpacing: "0.01em" }}>1IMP</span>
        </div>

        {/* Progress steps */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {["Upload", "AI Crafts", "Preview", "Share"].map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: i === 0 ? "#6361B8" : "rgba(99,97,184,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 700,
                  color: i === 0 ? "white" : "rgba(99,97,184,0.5)",
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "#100030" : "#9999AA" }} className="step-label">{label}</span>
              </div>
              {i < 3 && <div style={{ width: 24, height: 1, background: "rgba(99,82,138,0.2)" }} className="step-line" />}
            </div>
          ))}
        </div>

        <Link href="/login" style={{ fontSize: "0.875rem", color: "#9999AA", textDecoration: "none" }}>
          Save & exit
        </Link>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: 560 }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6361B8", marginBottom: "0.75rem" }}>STEP 1 OF 4</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "#100030", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "0.75rem" }}>
              Upload your resume
            </h1>
            <p style={{ fontSize: "0.9375rem", color: "#555570", lineHeight: 1.6 }}>
              Our AI reads your resume and crafts your first impression in under 60 seconds.
              <br />Don&apos;t have one? <button style={{ background: "none", border: "none", color: "#6361B8", cursor: "pointer", fontWeight: 600, fontSize: "0.9375rem", padding: 0 }}>Start from scratch →</button>
            </p>
          </motion.div>

          {/* Upload dropzone */}
          <AnimatePresence mode="wait">
            {uploadState !== "done" ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <div
                  onDragOver={e => { e.preventDefault(); setUploadState("dragging"); }}
                  onDragLeave={() => { if (uploadState === "dragging") setUploadState("idle"); }}
                  onDrop={handleDrop}
                  onClick={() => uploadState === "idle" && fileRef.current?.click()}
                  style={{
                    border: `2px dashed ${uploadState === "dragging" ? "#6361B8" : uploadState === "uploading" ? "rgba(99,97,184,0.4)" : "rgba(99,82,138,0.28)"}`,
                    borderRadius: 20,
                    background: uploadState === "dragging" ? "rgba(99,97,184,0.06)" : "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                    padding: "3rem 2rem",
                    textAlign: "center",
                    cursor: uploadState === "idle" ? "pointer" : "default",
                    transition: "all 200ms",
                    boxShadow: "0 4px 24px rgba(16,0,48,0.06)",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFile} style={{ display: "none" }} />

                  {uploadState === "idle" || uploadState === "dragging" ? (
                    <>
                      <motion.div
                        animate={uploadState === "dragging" ? { scale: 1.1 } : { scale: 1 }}
                        style={{ fontSize: "3rem", marginBottom: "1rem" }}
                      >📄</motion.div>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem", color: "#100030", marginBottom: "0.5rem" }}>
                        {uploadState === "dragging" ? "Drop it!" : "Drop your resume here"}
                      </p>
                      <p style={{ fontSize: "0.875rem", color: "#777790", marginBottom: "1.25rem" }}>
                        PDF, Word, or plain text · Max 10MB
                      </p>
                      <button style={{
                        padding: "0.65rem 1.5rem", background: "#100030", color: "white",
                        borderRadius: 9999, border: "none", fontSize: "0.875rem", fontWeight: 600,
                        cursor: "pointer", fontFamily: "var(--font-body)",
                      }}>
                        Browse files
                      </button>
                    </>
                  ) : (
                    /* Uploading state */
                    <div>
                      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚙️</div>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", color: "#100030", marginBottom: "0.35rem" }}>
                        {fileName}
                      </p>
                      <p style={{ fontSize: "0.8125rem", color: "#9999AA", marginBottom: "1.5rem" }}>
                        {progress < 40 ? "Parsing resume..." : progress < 70 ? "Extracting your story..." : progress < 95 ? "Crafting your summary..." : "Almost there..."}
                      </p>
                      {/* Progress bar */}
                      <div style={{ background: "rgba(99,82,138,0.12)", borderRadius: 9999, height: 8, overflow: "hidden", maxWidth: 300, margin: "0 auto" }}>
                        <motion.div
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.4 }}
                          style={{ height: "100%", background: "linear-gradient(90deg, #6361B8, #E8355A)", borderRadius: 9999 }}
                        />
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#9999AA", marginTop: "0.75rem" }}>{progress}% complete</p>
                    </div>
                  )}
                </div>

                {/* Format support */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "1.5rem" }}>
                  {[{ icon: "📄", label: "PDF" }, { icon: "📝", label: "Word (.docx)" }, { icon: "📋", label: "Plain text" }].map(f => (
                    <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "#9999AA" }}>
                      <span>{f.icon}</span> {f.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Done state */
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{
                  background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(99,97,184,0.2)", borderRadius: 20,
                  padding: "3rem 2rem", textAlign: "center",
                  boxShadow: "0 8px 32px rgba(16,0,48,0.1)",
                }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }} style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</motion.div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "#100030", marginBottom: "0.5rem" }}>
                    Resume parsed!
                  </h2>
                  <p style={{ fontSize: "0.9rem", color: "#555570", marginBottom: "0.35rem" }}>{fileName}</p>
                  <p style={{ fontSize: "0.875rem", color: "#777790", lineHeight: 1.6, marginBottom: "2rem" }}>
                    Our AI has extracted your career story. Now let&apos;s craft your impression.
                  </p>

                  {/* AI summary preview */}
                  <div style={{ background: "rgba(99,97,184,0.06)", border: "1px solid rgba(99,97,184,0.15)", borderRadius: 12, padding: "1.25rem", textAlign: "left", marginBottom: "2rem" }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6361B8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.6rem" }}>✦ AI SUMMARY PREVIEW</p>
                    <p style={{ fontSize: "0.875rem", color: "#444466", lineHeight: 1.65 }}>
                      &ldquo;Results-driven professional with 5+ years building products that scale. Known for turning ambiguous problems into clear, impactful solutions — and making teams better in the process.&rdquo;
                    </p>
                  </div>

                  <Link href="/editor" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.85rem 2.25rem",
                    background: "#E8355A", color: "white", borderRadius: 9999,
                    fontSize: "1rem", fontWeight: 600, textDecoration: "none",
                    fontFamily: "var(--font-body)", boxShadow: "0 4px 20px rgba(232,53,90,0.35)",
                  }}>
                    Continue to Editor →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media(max-width: 640px) { .step-label { display: none !important; } .step-line { display: none !important; } }
      `}</style>
    </div>
  );
}
