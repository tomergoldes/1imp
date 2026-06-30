"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, UploadCloud, Sparkles, Video, User } from "lucide-react";
import Link from "next/link";

const steps = [
  { id: 1, name: "Basics", icon: User },
  { id: 2, name: "Experience", icon: UploadCloud },
  { id: 3, name: "AI Magic", icon: Sparkles },
  { id: 4, name: "Video", icon: Video },
];

export default function EditorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loadingAI, setLoadingAI] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: "Alex Johnson",
    title: "Senior Product Manager",
    location: "San Francisco, CA",
    resumeText: "",
    aiSummary: "",
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    if (currentStep === 2) {
      // Transition to AI step and simulate generation
      setCurrentStep(3);
      setLoadingAI(true);
      
      // Try to call the real API if they put a key, otherwise mock it
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: formData.resumeText })
        });
        
        if (res.ok) {
          const data = await res.json();
          updateForm("aiSummary", data.text);
        } else {
          throw new Error("No API Key or failed");
        }
      } catch (e) {
        // Mock fallback if OpenAI key is missing
        await new Promise(r => setTimeout(r, 2500));
        updateForm("aiSummary", "Product leader with 8+ years scaling B2B SaaS platforms. Obsessed with reducing user friction and turning complex workflows into consumer-grade experiences. Known for bridging the gap between engineering velocity and GTM strategy.");
      } finally {
        setLoadingAI(false);
      }
    } else if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finish
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8F8FC", fontFamily: "var(--font-body)", display: "flex", flexDirection: "column" }}>
      
      {/* Top Navbar */}
      <header style={{ background: "white", padding: "1rem 2rem", borderBottom: "1px solid rgba(16,0,48,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="13" stroke="#E8355A" strokeWidth="2"/><circle cx="15" cy="15" r="8" stroke="#E8355A" strokeWidth="1.5" strokeOpacity="0.35"/><circle cx="15" cy="15" r="3.5" fill="#E8355A"/></svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#100030" }}>1IMP Editor</span>
        </div>
        <Link href="/dashboard" style={{ fontSize: "0.875rem", color: "#555570", textDecoration: "none", fontWeight: 500 }}>
          Cancel
        </Link>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 1.5rem" }}>
        
        {/* Stepper Progress */}
        <div style={{ width: "100%", maxWidth: 640, marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            <div style={{ position: "absolute", top: 16, left: 0, right: 0, height: 2, background: "rgba(16,0,48,0.06)", zIndex: 0 }} />
            <div style={{ position: "absolute", top: 16, left: 0, width: `${((currentStep - 1) / 3) * 100}%`, height: 2, background: "#6361B8", zIndex: 1, transition: "width 300ms ease" }} />
            
            {steps.map((step) => {
              const active = step.id === currentStep;
              const completed = step.id < currentStep;
              return (
                <div key={step.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", position: "relative", zIndex: 2 }}>
                  <div style={{ 
                    width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: active ? "#6361B8" : completed ? "white" : "white",
                    border: active ? "2px solid #6361B8" : completed ? "2px solid #6361B8" : "2px solid rgba(16,0,48,0.1)",
                    color: active ? "white" : completed ? "#6361B8" : "rgba(16,0,48,0.3)",
                    transition: "all 300ms ease"
                  }}>
                    {completed ? <CheckCircle2 size={16} /> : <step.icon size={14} strokeWidth={2.5} />}
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: active ? 700 : 500, color: active ? "#100030" : "#9999AA" }}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div style={{ width: "100%", maxWidth: 540, background: "white", borderRadius: 24, padding: "2.5rem", border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 8px 32px rgba(16,0,48,0.03)" }}>
          <AnimatePresence mode="wait">
            
            {/* Step 1: Basics */}
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#100030", marginBottom: "0.5rem" }}>Let's start with the basics</h1>
                <p style={{ color: "#555570", fontSize: "0.9375rem", marginBottom: "2rem" }}>This is how recruiters will identify you.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#100030", marginBottom: "0.4rem" }}>Full Name</label>
                    <input type="text" value={formData.fullName} onChange={e => updateForm("fullName", e.target.value)}
                      style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1.5px solid rgba(16,0,48,0.1)", fontSize: "0.9375rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#100030", marginBottom: "0.4rem" }}>Professional Title</label>
                    <input type="text" value={formData.title} onChange={e => updateForm("title", e.target.value)}
                      style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1.5px solid rgba(16,0,48,0.1)", fontSize: "0.9375rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#100030", marginBottom: "0.4rem" }}>Location</label>
                    <input type="text" value={formData.location} onChange={e => updateForm("location", e.target.value)}
                      style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1.5px solid rgba(16,0,48,0.1)", fontSize: "0.9375rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Experience / Resume */}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#100030", marginBottom: "0.5rem" }}>Feed the AI your experience</h1>
                <p style={{ color: "#555570", fontSize: "0.9375rem", marginBottom: "2rem" }}>Paste your LinkedIn about section, or copy-paste text directly from your resume.</p>

                <textarea 
                  value={formData.resumeText} 
                  onChange={e => updateForm("resumeText", e.target.value)}
                  placeholder="I am a product manager with 5 years of experience at Google and Stripe..."
                  style={{ 
                    width: "100%", height: 200, padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(16,0,48,0.1)", 
                    fontSize: "0.9375rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box",
                    resize: "none", lineHeight: 1.6
                  }} 
                />
              </motion.div>
            )}

            {/* Step 3: AI Generation */}
            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                {loadingAI ? (
                  <div style={{ textAlign: "center", padding: "3rem 0" }}>
                    <motion.div 
                      animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      style={{ width: 64, height: 64, margin: "0 auto 2rem", position: "relative" }}
                    >
                      <Sparkles size={64} color="#6361B8" strokeWidth={1} style={{ position: "absolute", inset: 0 }} />
                      <Sparkles size={64} color="#E8355A" strokeWidth={1.5} style={{ position: "absolute", inset: 0, filter: "blur(8px)", opacity: 0.5 }} />
                    </motion.div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "#100030", marginBottom: "0.5rem" }}>
                      Crafting your impression...
                    </h2>
                    <p style={{ color: "#9999AA", fontSize: "0.9375rem" }}>Our AI is extracting the signals recruiters actually care about.</p>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <Sparkles size={18} color="#E8355A" />
                      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "#100030" }}>Your AI Summary</h1>
                    </div>
                    <p style={{ color: "#555570", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>We've optimized this for a 7-second recruiter read. Feel free to tweak it.</p>
                    
                    <textarea 
                      value={formData.aiSummary} 
                      onChange={e => updateForm("aiSummary", e.target.value)}
                      style={{ 
                        width: "100%", height: 160, padding: "1.25rem", borderRadius: 12, border: "2px solid rgba(99,97,184,0.3)", 
                        fontSize: "1rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box",
                        resize: "none", lineHeight: 1.6, background: "rgba(99,97,184,0.03)", color: "#100030", fontWeight: 500
                      }} 
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Video */}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#100030", marginBottom: "0.5rem" }}>The 60-Second Pitch (Optional)</h1>
                <p style={{ color: "#555570", fontSize: "0.9375rem", marginBottom: "2rem" }}>Candidates with a short video intro get 40% more callbacks. You can skip this for now.</p>

                <div style={{ 
                  width: "100%", aspectRatio: "16/9", background: "rgba(16,0,48,0.03)", borderRadius: 16, border: "2px dashed rgba(16,0,48,0.1)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", cursor: "pointer"
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6361B8" }}>
                    <Video size={20} />
                  </div>
                  <div style={{ color: "#555570", fontWeight: 600, fontSize: "0.9375rem" }}>Record or upload video</div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(16,0,48,0.06)" }}>
            {currentStep > 1 && !loadingAI ? (
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                style={{ background: "transparent", border: "none", color: "#9999AA", fontWeight: 600, fontSize: "0.9375rem", cursor: "pointer", padding: "0.5rem" }}
              >
                Back
              </button>
            ) : <div />}
            
            {!loadingAI && (
              <button 
                onClick={handleNext}
                style={{ 
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: "#100030", color: "white", border: "none", borderRadius: 8,
                  padding: "0.75rem 1.5rem", fontWeight: 600, fontSize: "0.9375rem", cursor: "pointer"
                }}
              >
                {currentStep === 4 ? "Publish Profile" : "Continue"}
                {currentStep < 4 && <ArrowRight size={16} />}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
