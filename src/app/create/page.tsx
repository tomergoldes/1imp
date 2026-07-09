"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Upload, Sparkles, Wand2, Image as ImageIcon, Briefcase, ChevronRight } from "lucide-react";

export default function CreateVideoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [data, setData] = useState({
    targetRole: "",
    biggestWin: "",
    resumeText: "",
    photos: [] as string[],
    style: "dynamic",
  });

  const updateData = (key: string, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    if (step === 4) {
      setStep(5);
      setLoading(true);
      // Simulate AI generation process
      await new Promise(r => setTimeout(r, 3500));
      router.push("/v/demo"); // Redirect to the generated video player
    } else {
      setStep(prev => prev + 1);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050014", color: "white", fontFamily: "var(--font-body)", display: "flex", flexDirection: "column" }}>
      
      {/* Navbar */}
      <header style={{ padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Wand2 size={24} color="#E8355A" />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>1IMP Studio</span>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ 
              width: 32, height: 4, borderRadius: 2, 
              background: step >= i ? "#E8355A" : "rgba(255,255,255,0.1)",
              transition: "background 300ms"
            }} />
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <AnimatePresence mode="wait">
            
            {/* Step 1: Questionnaire */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E8355A", fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                  <Briefcase size={16} /> Step 1 of 4
                </div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1.1, marginBottom: "1rem" }}>
                  Set the direction.
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", marginBottom: "2.5rem" }}>
                  Help the AI understand your goal before it analyzes your resume.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.9375rem", fontWeight: 600, color: "white", marginBottom: "0.5rem" }}>
                      What exact role are you aiming for?
                    </label>
                    <input 
                      type="text" value={data.targetRole} onChange={e => updateData("targetRole", e.target.value)}
                      placeholder="e.g. Senior Frontend Developer"
                      style={{ 
                        width: "100%", padding: "1rem 1.25rem", borderRadius: 12, border: "2px solid rgba(255,255,255,0.1)", 
                        background: "rgba(255,255,255,0.03)", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box", transition: "border-color 200ms"
                      }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.9375rem", fontWeight: 600, color: "white", marginBottom: "0.5rem" }}>
                      What is your single biggest career win?
                    </label>
                    <textarea 
                      value={data.biggestWin} onChange={e => updateData("biggestWin", e.target.value)}
                      placeholder="e.g. I refactored the entire payment system, saving the company $500k a year."
                      style={{ 
                        width: "100%", height: 100, padding: "1rem 1.25rem", borderRadius: 12, border: "2px solid rgba(255,255,255,0.1)", 
                        background: "rgba(255,255,255,0.03)", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box", resize: "none"
                      }} 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Resume */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E8355A", fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                  <Upload size={16} /> Step 2 of 4
                </div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1.1, marginBottom: "1rem" }}>
                  Drop your resume.
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", marginBottom: "2.5rem" }}>
                  Paste the text here. The AI will extract only the most impressive signals.
                </p>

                <textarea 
                  value={data.resumeText} onChange={e => updateData("resumeText", e.target.value)}
                  placeholder="Experience: Product Manager at Stripe (2020-2023)&#10;• Led the launch of..."
                  style={{ 
                    width: "100%", height: 280, padding: "1.5rem", borderRadius: 16, border: "2px dashed rgba(255,255,255,0.2)", 
                    background: "rgba(255,255,255,0.02)", color: "white", fontSize: "1rem", outline: "none", boxSizing: "border-box", resize: "none", lineHeight: 1.6
                  }} 
                />
              </motion.div>
            )}

            {/* Step 3: Photos */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E8355A", fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                  <ImageIcon size={16} /> Step 3 of 4
                </div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1.1, marginBottom: "1rem" }}>
                  Add a human touch.
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", marginBottom: "2.5rem" }}>
                  Videos with photos get 3x more engagement. Upload 1-2 professional photos of yourself.
                </p>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <label style={{ 
                    flex: 1, aspectRatio: "3/4", background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "2px dashed rgba(255,255,255,0.1)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", cursor: "pointer", transition: "background 200ms"
                  }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: "none" }} 
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          updateData("photos", ["uploaded"]);
                        }
                      }}
                    />
                    {data.photos.length > 0 ? (
                      <Check size={32} color="#34A853" />
                    ) : (
                      <>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Upload size={20} color="white" />
                        </div>
                        <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Upload Photo</span>
                      </>
                    )}
                  </label>
                  <div style={{ flex: 1, aspectRatio: "3/4", background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "2px dashed rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>Optional</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Style */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E8355A", fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                  <Sparkles size={16} /> Step 4 of 4
                </div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1.1, marginBottom: "1rem" }}>
                  Choose your vibe.
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", marginBottom: "2.5rem" }}>
                  This will determine the music, animations, and color palette of your video.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { id: "dynamic", name: "Dynamic Tech", desc: "Fast cuts, punchy text, dark mode." },
                    { id: "corporate", name: "Corporate Clean", desc: "Smooth transitions, white background, professional." },
                    { id: "creative", name: "Creative Bold", desc: "Large typography, vibrant colors." }
                  ].map(s => (
                    <div 
                      key={s.id} 
                      onClick={() => updateData("style", s.id)}
                      style={{ 
                        padding: "1.5rem", borderRadius: 16, border: data.style === s.id ? "2px solid #E8355A" : "2px solid rgba(255,255,255,0.1)",
                        background: data.style === s.id ? "rgba(232,53,90,0.05)" : "transparent", cursor: "pointer", transition: "all 200ms",
                        display: "flex", alignItems: "center", justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.25rem", color: "white" }}>{s.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>{s.desc}</div>
                      </div>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", border: data.style === s.id ? "6px solid #E8355A" : "2px solid rgba(255,255,255,0.2)", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Generating */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "4rem 0" }}>
                <motion.div 
                  animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  style={{ width: 80, height: 80, margin: "0 auto 2rem", position: "relative" }}
                >
                  <Sparkles size={80} color="#E8355A" strokeWidth={1} style={{ position: "absolute", inset: 0 }} />
                  <div style={{ position: "absolute", inset: -20, background: "rgba(232,53,90,0.3)", borderRadius: "50%", filter: "blur(20px)", zIndex: -1 }} />
                </motion.div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", color: "white", marginBottom: "1rem" }}>
                  Generating Video...
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.125rem" }}>
                  Extracting highlights, animating text, and rendering frames.
                </p>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Action Button */}
          {step < 5 && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "3rem" }}>
              <button 
                onClick={handleNext}
                disabled={step === 1 && !data.targetRole}
                style={{ 
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: (step === 1 && !data.targetRole) ? "rgba(255,255,255,0.1)" : "#E8355A", 
                  color: "white", border: "none", borderRadius: 999,
                  padding: "1rem 2rem", fontWeight: 700, fontSize: "1.0625rem", cursor: (step === 1 && !data.targetRole) ? "not-allowed" : "pointer",
                  transition: "background 200ms"
                }}
              >
                {step === 4 ? "Generate Video" : "Continue"}
                {step < 4 && <ChevronRight size={20} />}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
