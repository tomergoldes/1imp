"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Video, CheckCircle2, Loader2, PlayCircle, Sparkles } from "lucide-react";
import { generateAIScript, renderVideo } from "./actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function VideoStudioClient({ profile }: { profile: any }) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [script, setScript] = useState("");
  const [isRendering, setIsRendering] = useState(false);

  const handleGenerateScript = async () => {
    setIsGeneratingScript(true);
    toast.loading("Analyzing profile...", { id: "script-gen" });
    const res = await generateAIScript({
      fullName: profile?.fullName || "User",
      title: profile?.title || "Professional",
      summary: profile?.summary
    });
    
    if (res.success && res.script) {
      setScript(res.script);
      setStep(2);
      toast.success("Script generated!", { id: "script-gen" });
    } else {
      toast.error("Failed to generate script.", { id: "script-gen" });
    }
    setIsGeneratingScript(false);
  };

  const handleRenderVideo = async () => {
    setIsRendering(true);
    toast.loading("Starting render engine...", { id: "video-render" });
    const res = await renderVideo(script);
    if (res.success) {
      setStep(3);
      toast.success("Rendering initiated!", { id: "video-render" });
      // Wait a few seconds then navigate back to dashboard overview or videos page
      setTimeout(() => {
        router.push("/dashboard/videos");
      }, 4000);
    } else {
      toast.error("Failed to start video rendering.", { id: "video-render" });
      setIsRendering(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: "4rem" }}>
      
      {/* Progress Steps */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "100%", height: 2, background: "rgba(255,255,255,0.05)", zIndex: 0 }} />
        <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: step === 1 ? "0%" : step === 2 ? "50%" : "100%", height: 2, background: "#E8355A", zIndex: 0, transition: "width 500ms ease" }} />
        
        <StepIndicator num={1} active={step >= 1} label="AI Script" />
        <StepIndicator num={2} active={step >= 2} label="Review" />
        <StepIndicator num={3} active={step >= 3} label="Render" />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: "center", background: "white", padding: "4rem 2rem", borderRadius: 24, border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 10px 40px rgba(16,0,48,0.05)" }}
          >
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, rgba(232,53,90,0.1), rgba(99,97,184,0.1))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", position: "relative" }}>
              <Sparkles size={36} color="#E8355A" />
              {isGeneratingScript && (
                <motion.div 
                  animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ position: "absolute", top: -4, left: -4, right: -4, bottom: -4, borderRadius: "50%", border: "2px dashed rgba(232,53,90,0.3)" }}
                />
              )}
            </div>
            
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#100030", marginBottom: "1rem", fontWeight: 800 }}>Let AI write your perfect intro</h2>
            <p style={{ color: "#555570", maxWidth: 400, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
              We'll use your profile details to craft a highly engaging, 30-second script tailored for video.
            </p>
            
            <button 
              onClick={handleGenerateScript}
              disabled={isGeneratingScript}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                padding: "1rem 2rem", background: "linear-gradient(135deg, #E8355A 0%, #6361B8 100%)", color: "white",
                border: "none", borderRadius: 12, fontSize: "1.125rem", fontWeight: 600, cursor: isGeneratingScript ? "wait" : "pointer",
                boxShadow: "0 10px 30px rgba(232,53,90,0.3)", transition: "transform 200ms",
                transform: isGeneratingScript ? "scale(0.98)" : "scale(1)"
              }}
            >
              {isGeneratingScript ? <Loader2 size={24} className="animate-spin" /> : <Wand2 size={24} />}
              {isGeneratingScript ? "Generating Magic..." : "Generate Script"}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ background: "white", padding: "3rem", borderRadius: 24, border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 10px 40px rgba(16,0,48,0.05)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(99,97,184,0.1)", color: "#6361B8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PenTool size={24} />
              </div>
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", margin: 0, fontWeight: 700 }}>Review & Edit Script</h2>
                <p style={{ color: "#555570", margin: 0 }}>Feel free to tweak the AI's script before rendering.</p>
              </div>
            </div>

            <textarea 
              value={script}
              onChange={(e) => setScript(e.target.value)}
              style={{
                width: "100%", height: 240, padding: "1.5rem",
                background: "rgba(16,0,48,0.02)", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 16,
                fontSize: "1.125rem", lineHeight: 1.6, color: "#100030", outline: "none", resize: "none",
                fontFamily: "inherit", transition: "border-color 200ms"
              }}
              onFocus={(e) => e.target.style.borderColor = "#6361B8"}
              onBlur={(e) => e.target.style.borderColor = "rgba(16,0,48,0.1)"}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
              <button 
                onClick={() => setStep(1)}
                style={{ padding: "0.875rem 1.5rem", background: "transparent", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 8, color: "#555570", fontWeight: 600, cursor: "pointer" }}
              >
                Start Over
              </button>
              
              <button 
                onClick={handleRenderVideo}
                disabled={isRendering}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.875rem 2rem", background: "#100030", color: "white",
                  border: "none", borderRadius: 8, fontSize: "1rem", fontWeight: 600, cursor: isRendering ? "wait" : "pointer",
                  boxShadow: "0 4px 12px rgba(16,0,48,0.15)"
                }}
              >
                {isRendering ? <Loader2 size={20} className="animate-spin" /> : <Video size={20} />}
                {isRendering ? "Preparing Studio..." : "Generate Avatar Video"}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", background: "linear-gradient(135deg, #100030 0%, #1A004A 100%)", padding: "5rem 2rem", borderRadius: 24, color: "white", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, borderRadius: "50%", background: "rgba(232,53,90,0.15)", filter: "blur(60px)" }} />
            <div style={{ position: "absolute", bottom: -100, left: -100, width: 300, height: 300, borderRadius: "50%", background: "rgba(99,97,184,0.15)", filter: "blur(60px)" }} />
            
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", position: "relative" }}>
              <motion.div 
                animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#E8355A" }}
              />
              <Video size={40} color="#E8355A" />
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "1rem", fontWeight: 800 }}>Rendering your video...</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 400, margin: "0 auto 2rem", fontSize: "1.125rem" }}>
              Our AI avatar is currently recording your script. This usually takes about 2-3 minutes.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "rgba(255,255,255,0.1)", borderRadius: 100, fontSize: "0.875rem", fontWeight: 600 }}>
              <Loader2 size={16} className="animate-spin" />
              Redirecting you to dashboard...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepIndicator({ num, active, label }: { num: number, active: boolean, label: string }) {
  return (
    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      <div style={{ 
        width: 48, height: 48, borderRadius: "50%", 
        background: active ? "#100030" : "white", 
        border: `2px solid ${active ? "#100030" : "rgba(16,0,48,0.1)"}`,
        color: active ? "white" : "#9999AA",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.125rem", fontWeight: 700,
        transition: "all 300ms ease",
        boxShadow: active ? "0 4px 12px rgba(16,0,48,0.1)" : "none"
      }}>
        {active && num < 3 ? <CheckCircle2 size={24} /> : num}
      </div>
      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: active ? "#100030" : "#9999AA" }}>{label}</span>
    </div>
  );
}

function PenTool(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 19l7-7 3 3-7 7-3-3z"/>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      <path d="M2 2l7.586 7.586"/>
      <circle cx="11" cy="11" r="2"/>
    </svg>
  );
}
