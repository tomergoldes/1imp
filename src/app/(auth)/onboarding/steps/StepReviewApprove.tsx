"use client";

import { motion } from "framer-motion";
import { CheckCircle, Play, FileText, LayoutTemplate, Loader2, RefreshCw } from "lucide-react";

interface StepReviewApproveProps {
  isGeneratingStory: boolean;
  storyError: string | null;
  generatedData: {
    storyProfile?: any;
    highlights?: any[];
    script?: string;
    storyboard?: any[];
  } | null;
  onRetry: () => void;
}

export function StepReviewApprove({ isGeneratingStory, storyError, generatedData, onRetry }: StepReviewApproveProps) {
  
  if (isGeneratingStory) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🧠</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#100030", marginBottom: "0.75rem" }}>
          AI is designing your story...
        </h2>
        <p style={{ color: "#555570", lineHeight: 1.6, fontSize: "1.05rem", maxWidth: 400, margin: "0 auto 2rem" }}>
          We're analyzing your resume, ranking your best highlights, and writing your custom script.
        </p>
        <Loader2 size={40} className="animate-spin" color="#E8355A" style={{ margin: "0 auto" }} />
      </motion.div>
    );
  }

  if (storyError) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>⚠️</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#E8355A", marginBottom: "0.75rem" }}>
          Something went wrong
        </h2>
        <p style={{ color: "#555570", marginBottom: "2rem" }}>{storyError}</p>
        <button 
          onClick={onRetry}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "#100030", color: "white", borderRadius: 999, border: "none", fontWeight: 600, cursor: "pointer" }}
        >
          <RefreshCw size={16} /> Try Again
        </button>
      </motion.div>
    );
  }

  if (!generatedData || !generatedData.script) return null;

  const wordCount = generatedData.script.split(/\s+/).filter(Boolean).length;
  const estimatedTime = Math.round(wordCount / 2.5); // ~2.5 words per second

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Review your Masterpiece</h1>
      <p style={{ color: "#555570", marginBottom: "2rem" }}>Our AI has crafted your story. Review it before we render the final video.</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxHeight: "60vh", overflowY: "auto", paddingRight: "1rem", paddingBottom: "2rem" }}>
        
        {/* Story Profile Summary */}
        <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(99,82,138,0.15)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "#6361B8", fontWeight: 700 }}>
            <CheckCircle size={18} /> Core Identity
          </div>
          <p style={{ margin: 0, fontSize: "1.05rem", color: "#100030", lineHeight: 1.5, fontWeight: 500 }}>
            "{generatedData.storyProfile?.core_identity}"
          </p>
        </div>

        {/* The Script */}
        <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(232,53,90,0.2)", boxShadow: "0 4px 12px rgba(232,53,90,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E8355A", fontWeight: 700 }}>
              <FileText size={18} /> The Script
            </div>
            <div style={{ fontSize: "0.85rem", color: "#9999AA", fontWeight: 600, display: "flex", gap: "1rem" }}>
              <span>{wordCount} words</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Play size={12}/> ~{estimatedTime}s</span>
            </div>
          </div>
          
          <div style={{ padding: "1rem", background: "rgba(232,53,90,0.03)", borderRadius: 12 }}>
            <p style={{ margin: 0, fontSize: "1rem", color: "#1A1A1A", lineHeight: 1.7 }}>
              {generatedData.script}
            </p>
          </div>
        </div>

        {/* Storyboard Preview */}
        <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(99,82,138,0.15)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "#100030", fontWeight: 700 }}>
            <LayoutTemplate size={18} /> Scene Flow
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {generatedData.storyboard?.map((scene: any, i: number) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.75rem", background: "#F8F9FB", borderRadius: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#100030", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#100030", marginBottom: "0.15rem" }}>
                    Scene: {scene.sceneType.replace('_', ' ')}
                  </div>
                  {scene.onScreenText && (
                    <div style={{ fontSize: "0.8rem", color: "#E8355A", fontWeight: 600 }}>
                      Text: "{scene.onScreenText}"
                    </div>
                  )}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#9999AA", fontWeight: 600 }}>
                  {scene.endSec - scene.startSec}s
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
