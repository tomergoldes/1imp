"use client";

import { motion } from "framer-motion";
import { Smile, Zap, Heart } from "lucide-react";

interface StepPersonalQuestionsProps {
  data: {
    answers: {
      bestSkill?: string;
      proudestProject?: string;
      problemYouSolve?: string;
      mainHobby?: string;
      threeWords?: string;
    };
    tone: string;
  };
  updateData: (data: Partial<StepPersonalQuestionsProps["data"]>) => void;
}

export function StepPersonalQuestions({ data, updateData }: StepPersonalQuestionsProps) {
  const handleAnswerChange = (field: string, value: string) => {
    updateData({ answers: { ...data.answers, [field]: value } });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Let's get personal</h1>
      <p style={{ color: "#555570", marginBottom: "2rem" }}>These questions help our AI craft a unique story that doesn't just sound like a generic resume.</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxHeight: "60vh", overflowY: "auto", paddingRight: "1rem", paddingBottom: "2rem" }}>
        
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}>
            <Zap size={16}/> What's your absolute best skill?
          </label>
          <input 
            value={data.answers.bestSkill || ""} 
            onChange={e => handleAnswerChange("bestSkill", e.target.value)} 
            placeholder="e.g. Turning chaos into structured processes"
            style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none" }} 
          />
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}>
            <Heart size={16}/> What do you do for fun? (Hobby)
          </label>
          <input 
            value={data.answers.mainHobby || ""} 
            onChange={e => handleAnswerChange("mainHobby", e.target.value)} 
            placeholder="e.g. Surfing, Playing guitar, Cooking pasta..."
            style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none" }} 
          />
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}>
            <Smile size={16}/> How would your colleagues describe you in 3 words?
          </label>
          <input 
            value={data.answers.threeWords || ""} 
            onChange={e => handleAnswerChange("threeWords", e.target.value)} 
            placeholder="e.g. Driven, Creative, Reliable"
            style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none" }} 
          />
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}>
            🎭 What tone do you prefer for the video?
          </label>
          <select 
            value={data.tone} 
            onChange={e => updateData({ tone: e.target.value })}
            style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none", background: "white", cursor: "pointer" }}
          >
            <option value="Professional">Professional & Formal</option>
            <option value="Bold">Bold & Confident</option>
            <option value="Creative">Storyteller & Creative</option>
            <option value="Funny">Witty & Casual</option>
            <option value="Minimal">Minimalist & Direct</option>
          </select>
        </div>

      </div>
    </motion.div>
  );
}
