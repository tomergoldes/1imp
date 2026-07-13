"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { StepTargetRole } from "./steps/StepTargetRole";
import { StepResumeUpload } from "./steps/StepResumeUpload";
import { StepPersonalQuestions } from "./steps/StepPersonalQuestions";
import { StepPhotoUpload } from "./steps/StepPhotoUpload";
import { StepNinjaAvatar } from "./steps/StepNinjaAvatar";
import { StepReviewApprove } from "./steps/StepReviewApprove";
import { StepGenerating } from "./steps/StepGenerating";

export default function OnboardingPage() {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Data state
  const [data, setData] = useState({
    targetRole: "",
    targetIndustry: "",
    jobDescription: "",
    cvText: "",
    cvFileName: "",
    isParsing: false,
    answers: {},
    tone: "Professional",
    photoBase64: "",
    photoFileName: "",
    ninjaColor: "#1A1A1A",
    ninjaGender: "neutral",
  });

  const [showTextInput, setShowTextInput] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [storyError, setStoryError] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<{
    candidateProfileId?: string;
    videoProjectId?: string;
    storyProfile?: any;
    highlights?: any[];
    script?: string;
    storyboard?: any[];
  } | null>(null);
  
  const [renderStatus, setRenderStatus] = useState<"rendering" | "completed" | "error">("rendering");
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);

  const updateData = (newData: Partial<typeof data>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

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

  const handleCvSelect = async (file: File) => {
    if (!file) return;
    updateData({ cvFileName: file.name, isParsing: true });
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.text || data.text.trim() === "") {
        throw new Error(data.error || "Could not extract enough text");
      }
      
      updateData({ cvText: data.text, isParsing: false });
    } catch {
      setErrorMsg("Failed to extract text from file. Please paste your CV instead.");
      updateData({ cvFileName: "", isParsing: false });
      setShowTextInput(true);
    }
  };

  const handlePhotoSelect = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPG/PNG).");
      return;
    }
    updateData({ photoFileName: file.name });
    setErrorMsg("");
    try {
      const base64 = await readFileAsDataURL(file);
      updateData({ photoBase64: base64 });
    } catch {
      setErrorMsg("Failed to read image file.");
    }
  };

  const generateStory = async () => {
    setIsGeneratingStory(true);
    setStoryError(null);
    setCurrentStep(6);
    
    try {
      const res = await fetch("/api/pipeline/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvText: data.cvText,
          answers: data.answers,
          photoUrl: data.photoBase64,
          tone: data.tone,
          ninjaColor: data.ninjaColor,
          targetRole: data.targetRole,
          targetIndustry: data.targetIndustry
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to generate story");

      setGeneratedData(json);
      setIsGeneratingStory(false);
    } catch (err: any) {
      setStoryError(err.message || "Something went wrong.");
      setIsGeneratingStory(false);
    }
  };

  const handleNextStep = () => {
    setErrorMsg("");
    if (currentStep === 1) {
      // Role is optional, just continue
    } else if (currentStep === 2) {
      if (!data.cvText || data.cvText.trim() === "") {
        setErrorMsg("Please upload your CV or paste it as text.");
        return;
      }
    } else if (currentStep === 3) {
      // Answers optional
    } else if (currentStep === 4) {
      if (!data.photoBase64) {
        setErrorMsg("Please upload a photo for your avatar.");
        return;
      }
    } else if (currentStep === 5) {
      // Start Story Generation
      generateStory();
      return;
    } else if (currentStep === 6) {
      // Approve script and start rendering
      startRender();
      return;
    }
    setCurrentStep(s => Math.min(s + 1, 7));
  };

  const startRender = async () => {
    if (!generatedData?.videoProjectId) return;
    
    setCurrentStep(7);
    setRenderStatus("rendering");
    
    try {
      const res = await fetch("/api/pipeline/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoProjectId: generatedData.videoProjectId }),
      });

      const json = await res.json();
      
      if (res.status === 402 || json.error === "INSUFFICIENT_CREDITS") {
        // Redirect to Stripe checkout for a single video unlock
        const checkoutRes = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId: generatedData.videoProjectId }),
        });
        const checkoutJson = await checkoutRes.json();
        if (checkoutJson.url) {
          window.location.href = checkoutJson.url;
          return;
        }
        throw new Error("Failed to initialize checkout");
      }
      
      if (!res.ok) throw new Error(json.error || "Failed to start render");
      
      // Poll for status
      pollRenderStatus(generatedData.videoProjectId);
    } catch (err: any) {
      console.error(err);
      setRenderStatus("error");
    }
  };
  
  const pollRenderStatus = (projectId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/pipeline/status/${projectId}`);
        const statusData = await res.json();
        
        if (statusData.status === "COMPLETED" && statusData.videoUrl) {
          clearInterval(interval);
          setRenderStatus("completed");
          setFinalVideoUrl(statusData.videoUrl);
          
          // Optionally redirect after a few seconds
          setTimeout(() => {
             router.push(`/v/${projectId}`);
          }, 3000);
        } else if (statusData.status === "ERROR" || statusData.status === "FAILED") {
          clearInterval(interval);
          setRenderStatus("error");
        }
      } catch (err) {
        // ignore network errors during polling
      }
    }, 3000);
  };

  const STEPS = ["Role", "Resume", "Questions", "Photo", "Style", "Review", "Render"];

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #F0EEFB 0%, #E4E0F4 60%, #ECEEF8 100%)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2rem", borderBottom: "1px solid rgba(99,82,138,0.12)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E8355A" strokeWidth="2.5"/>
            <path d="M7 12C7 9.23858 9.23858 7 12 7" stroke="#E8355A" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#100030", letterSpacing: "0.01em" }}>1IMP</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflowX: "auto", padding: "0 1rem" }}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: currentStep > i + 1 ? "#34A853" : currentStep === i + 1 ? "#6361B8" : "rgba(99,97,184,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 700,
                  color: currentStep >= i + 1 ? "white" : "rgba(99,97,184,0.5)",
                }}>
                  {currentStep > i + 1 ? "✓" : i + 1}
                </div>
                <span className="step-label" style={{ fontSize: "0.78rem", fontWeight: currentStep === i + 1 ? 600 : 400, color: currentStep >= i + 1 ? "#100030" : "#9999AA" }}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="step-line" style={{ width: 16, height: 1, background: currentStep > i + 1 ? "#6361B8" : "rgba(99,82,138,0.2)" }} />}
            </div>
          ))}
        </div>
        <Link href="/dashboard" style={{ fontSize: "0.875rem", color: "#9999AA", textDecoration: "none" }}>
          Save & exit
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

          <AnimatePresence mode="wait">
            {currentStep === 1 && <StepTargetRole key="step1" data={data} updateData={updateData} />}
            {currentStep === 2 && <StepResumeUpload key="step2" data={data} updateData={updateData} onFileSelect={handleCvSelect} showTextInput={showTextInput} setShowTextInput={setShowTextInput} />}
            {currentStep === 3 && <StepPersonalQuestions key="step3" data={data} updateData={updateData} />}
            {currentStep === 4 && <StepPhotoUpload key="step4" data={data} updateData={updateData} onFileSelect={handlePhotoSelect} />}
            {currentStep === 5 && <StepNinjaAvatar key="step5" data={data} updateData={updateData} />}
            {currentStep === 6 && <StepReviewApprove key="step6" isGeneratingStory={isGeneratingStory} storyError={storyError} generatedData={generatedData} onRetry={generateStory} />}
            {currentStep === 7 && <StepGenerating key="step7" status={renderStatus} videoUrl={finalVideoUrl} />}
          </AnimatePresence>

          {/* Navigation */}
          {currentStep < 7 && !isGeneratingStory && !storyError && (
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
                onClick={handleNextStep}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 2rem",
                  background: currentStep === 6 ? "#34A853" : "linear-gradient(135deg, #E8355A, #6361B8)", color: "white", borderRadius: 9999,
                  fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(232,53,90,0.3)"
                }}
              >
                {currentStep === 5 ? "Generate Story 🧠" : currentStep === 6 ? "Approve & Render 🎬" : "Continue"} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width: 800px) { .step-label { display: none !important; } .step-line { width: 8px !important; } }
      `}</style>
    </div>
  );
}
