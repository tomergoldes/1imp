"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, UploadCloud, Image as ImageIcon, Briefcase, Target, Users, Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  
  // Step state
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Data state
  const [answers, setAnswers] = useState({ goal: "", audience: "", tone: "" });
  const [cvText, setCvText] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const [videoStyle, setVideoStyle] = useState("");

  // Resume Upload State
  const [cvFileName, setCvFileName] = useState("");
  const [cvProgress, setCvProgress] = useState(0);
  const [isCvDragging, setIsCvDragging] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const cvFileRef = useRef<HTMLInputElement>(null);

  // Photo Upload State
  const [photoFileName, setPhotoFileName] = useState("");
  const photoFileRef = useRef<HTMLInputElement>(null);

  // Helpers
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || "");
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || "");
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const processCvFile = async (file: File) => {
    if (!file) return;
    setCvFileName(file.name);
    setCvProgress(10);
    setErrorMsg("");

    try {
      setCvProgress(50);
      const text = await readFileAsText(file);
      setCvProgress(100);
      
      if (!text || text.trim() === "") {
        setErrorMsg("Could not extract enough text from this file. Please paste your CV as text instead.");
        setShowTextInput(true);
        return;
      }
      setCvText(text);
    } catch {
      setErrorMsg("Failed to read file. Please paste your CV as text.");
      setShowTextInput(true);
    }
  };

  const processPhotoFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPG/PNG).");
      return;
    }
    setPhotoFileName(file.name);
    setErrorMsg("");
    try {
      const base64 = await readFileAsDataURL(file);
      setPhotoBase64(base64);
    } catch {
      setErrorMsg("Failed to read image file.");
    }
  };

  const handleNextStep = () => {
    setErrorMsg("");
    if (currentStep === 1) {
      if (!answers.goal || !answers.audience || !answers.tone) {
        setErrorMsg("Please answer all questions to proceed.");
        return;
      }
    } else if (currentStep === 2) {
      const textToSave = cvText || (document.getElementById("cv-textarea") as HTMLTextAreaElement)?.value || "";
      if (!textToSave || textToSave.trim() === "") {
        setErrorMsg("Please upload your CV or paste it as text.");
        return;
      }
      setCvText(textToSave);
    } else if (currentStep === 3) {
      if (!photoBase64) {
        setErrorMsg("Please upload at least 1 photo to animate your face.");
        return;
      }
    }
    setCurrentStep(s => Math.min(s + 1, 4));
  };

  const handleGenerate = async () => {
    if (!videoStyle) {
      setErrorMsg("Please select a video style.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          cvText, 
          answers, 
          photoBase64, 
          style: videoStyle 
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate video");

      router.push(`/v/${data.videoId}?processing=true`);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
      setIsGenerating(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #F0EEFB 0%, #E4E0F4 60%, #ECEEF8 100%)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2rem", borderBottom: "1px solid rgba(99,82,138,0.12)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13" stroke="#E8355A" strokeWidth="2"/>
            <circle cx="15" cy="15" r="8" stroke="#E8355A" strokeWidth="1.5" strokeOpacity="0.35"/>
            <circle cx="15" cy="15" r="3.5" fill="#E8355A"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#100030", letterSpacing: "0.01em" }}>1IMP</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {["Questions", "Resume", "Photo", "Style"].map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: currentStep >= i + 1 ? "#6361B8" : "rgba(99,97,184,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 700,
                  color: currentStep >= i + 1 ? "white" : "rgba(99,97,184,0.5)",
                }}>
                  {i + 1}
                </div>
                <span className="step-label" style={{ fontSize: "0.78rem", fontWeight: currentStep === i + 1 ? 600 : 400, color: currentStep >= i + 1 ? "#100030" : "#9999AA" }}>{label}</span>
              </div>
              {i < 3 && <div className="step-line" style={{ width: 24, height: 1, background: currentStep > i + 1 ? "#6361B8" : "rgba(99,82,138,0.2)" }} />}
            </div>
          ))}
        </div>
        <Link href="/dashboard" style={{ fontSize: "0.875rem", color: "#9999AA", textDecoration: "none" }}>
          Save &amp; exit
        </Link>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: 640 }}>
          {errorMsg && (
            <div style={{ background: "rgba(232,53,90,0.1)", border: "1px solid rgba(232,53,90,0.3)", borderRadius: 12, padding: "0.875rem 1.25rem", marginBottom: "1.5rem", color: "#E8355A", fontSize: "0.875rem", fontWeight: 500 }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {isGenerating ? (
             <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               style={{ background: "rgba(255,255,255,0.8)", borderRadius: 20, padding: "4rem 2rem", textAlign: "center", boxShadow: "0 8px 32px rgba(16,0,48,0.1)" }}>
               <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖</div>
               <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#100030", marginBottom: "0.75rem" }}>
                 AI is crafting your master script...
               </h2>
               <p style={{ color: "#555570", lineHeight: 1.6, fontSize: "1.05rem" }}>
                 We are analyzing your resume and answers, setting up the talking photo,<br/>and generating your professional AI video.
               </p>
               <Loader2 size={32} className="animate-spin" color="#E8355A" style={{ margin: "2rem auto 0" }} />
             </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Tell us your goals</h1>
                  <p style={{ color: "#555570", marginBottom: "2rem" }}>We use these answers to tailor the AI script perfectly to your needs.</p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}><Target size={16}/> What is the main goal of this video?</label>
                      <input value={answers.goal} onChange={e => setAnswers({...answers, goal: e.target.value})} placeholder="e.g. Find a job in Marketing, Attract investors..."
                        style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}><Users size={16}/> Who is your target audience?</label>
                      <input value={answers.audience} onChange={e => setAnswers({...answers, audience: e.target.value})} placeholder="e.g. Tech Recruiters, Startup Founders..."
                        style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}>🎭 What tone do you prefer?</label>
                      <select value={answers.tone} onChange={e => setAnswers({...answers, tone: e.target.value})}
                        style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none", background: "white", cursor: "pointer" }}>
                        <option value="" disabled>Select a tone</option>
                        <option value="Professional & Formal">Professional & Formal</option>
                        <option value="Casual & Friendly">Casual & Friendly</option>
                        <option value="Energetic & Passionate">Energetic & Passionate</option>
                        <option value="Storyteller & Creative">Storyteller & Creative</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Upload your resume</h1>
                  <p style={{ color: "#555570", marginBottom: "2rem" }}>We will extract your best achievements and integrate them into the script.</p>
                  
                  {showTextInput ? (
                    <div>
                      <textarea id="cv-textarea" defaultValue={cvText} placeholder="Paste your CV text here..."
                        style={{ width: "100%", minHeight: 250, padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.3)", fontSize: "0.9rem", resize: "vertical" }} />
                    </div>
                  ) : (
                    <div
                      onDragOver={e => { e.preventDefault(); setIsCvDragging(true); }}
                      onDragLeave={() => setIsCvDragging(false)}
                      onDrop={e => { e.preventDefault(); setIsCvDragging(false); const f = e.dataTransfer.files[0]; if(f) processCvFile(f); }}
                      onClick={() => !cvFileName && cvFileRef.current?.click()}
                      style={{
                        border: `2px dashed ${isCvDragging ? "#6361B8" : "rgba(99,82,138,0.28)"}`,
                        borderRadius: 20, background: isCvDragging ? "rgba(99,97,184,0.06)" : "rgba(255,255,255,0.7)",
                        padding: "4rem 2rem", textAlign: "center", cursor: cvFileName ? "default" : "pointer"
                      }}>
                      <input ref={cvFileRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={e => { const f = e.target.files?.[0]; if(f) processCvFile(f); }} style={{ display: "none" }} />
                      
                      {cvFileName ? (
                        <div>
                          <Briefcase size={40} color="#6361B8" style={{ margin: "0 auto 1rem" }} />
                          <h3 style={{ fontSize: "1.2rem", margin: "0 0 0.5rem" }}>{cvFileName}</h3>
                          <p style={{ color: "#34A853", fontWeight: 600 }}>Ready ({cvProgress}%)</p>
                          <button onClick={() => { setCvFileName(""); setCvText(""); }} style={{ background: "none", border: "none", color: "#E8355A", cursor: "pointer", marginTop: "1rem", fontWeight: 500 }}>Remove file</button>
                        </div>
                      ) : (
                        <>
                          <UploadCloud size={48} color="#9999AA" style={{ margin: "0 auto 1rem" }} />
                          <p style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Drop your resume here</p>
                          <p style={{ color: "#777790", fontSize: "0.85rem", marginBottom: "1.5rem" }}>PDF, Word, or plain text</p>
                          <button style={{ padding: "0.6rem 1.5rem", background: "#100030", color: "white", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600 }}>Browse files</button>
                          <br/><br/>
                          <button onClick={(e) => { e.stopPropagation(); setShowTextInput(true); }} style={{ background: "none", border: "none", color: "#6361B8", cursor: "pointer", fontWeight: 600 }}>or paste as text &rarr;</button>
                        </>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Upload your photo</h1>
                  <p style={{ color: "#555570", marginBottom: "2rem" }}>We will animate this photo to speak your personalized script!</p>
                  
                  <div
                    onClick={() => photoFileRef.current?.click()}
                    style={{
                      border: "2px dashed rgba(99,82,138,0.28)", borderRadius: 20, background: "rgba(255,255,255,0.7)",
                      padding: "3rem 2rem", textAlign: "center", cursor: "pointer"
                    }}>
                    <input ref={photoFileRef} type="file" accept="image/jpeg, image/png" onChange={e => { const f = e.target.files?.[0]; if(f) processPhotoFile(f); }} style={{ display: "none" }} />
                    
                    {photoBase64 ? (
                      <div>
                        <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 1rem", overflow: "hidden", border: "3px solid #6361B8" }}>
                          <img src={photoBase64} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem" }}>{photoFileName}</h3>
                        <p style={{ color: "#34A853", fontWeight: 600 }}>Looks great!</p>
                        <button onClick={(e) => { e.stopPropagation(); setPhotoBase64(""); setPhotoFileName(""); }} style={{ background: "none", border: "none", color: "#E8355A", cursor: "pointer", marginTop: "1rem", fontWeight: 500 }}>Upload a different photo</button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon size={48} color="#9999AA" style={{ margin: "0 auto 1rem" }} />
                        <p style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Click to upload a clear face photo</p>
                        <p style={{ color: "#777790", fontSize: "0.85rem" }}>Look straight at the camera. JPG or PNG only.</p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Choose video style</h1>
                  <p style={{ color: "#555570", marginBottom: "2rem" }}>Select the visual style and background for your video.</p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {["Modern Office", "Minimalist Studio", "Creative Loft", "Solid Gradient"].map((style) => (
                      <div key={style} onClick={() => setVideoStyle(style)} style={{
                        border: videoStyle === style ? "2px solid #E8355A" : "2px solid rgba(99,82,138,0.1)",
                        borderRadius: 16, padding: "1.5rem 1rem", textAlign: "center", cursor: "pointer",
                        background: videoStyle === style ? "rgba(232,53,90,0.05)" : "white",
                        transition: "all 0.2s"
                      }}>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: videoStyle === style ? "#E8355A" : "#F0EEFB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: videoStyle === style ? "white" : "#6361B8" }}>
                          ✨
                        </div>
                        <h4 style={{ margin: 0, fontWeight: 700, color: "#100030" }}>{style}</h4>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Navigation */}
          {!isGenerating && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", borderTop: "1px solid rgba(99,82,138,0.1)", paddingTop: "1.5rem" }}>
              <button
                onClick={() => setCurrentStep(s => Math.max(s - 1, 1))}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem",
                  background: "white", border: "1.5px solid rgba(99,82,138,0.2)", borderRadius: 9999,
                  fontWeight: 600, color: "#100030", cursor: currentStep === 1 ? "not-allowed" : "pointer",
                  opacity: currentStep === 1 ? 0 : 1, transition: "all 0.2s"
                }}
              >
                <ChevronLeft size={16} /> Back
              </button>

              <button
                onClick={currentStep === 4 ? handleGenerate : handleNextStep}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 2rem",
                  background: "linear-gradient(135deg, #E8355A, #6361B8)", color: "white", borderRadius: 9999,
                  fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(232,53,90,0.3)"
                }}
              >
                {currentStep === 4 ? "Generate Masterpiece ✨" : "Continue"} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width: 640px) { .step-label { display: none !important; } .step-line { display: none !important; } }
      `}</style>
    </div>
  );
}
