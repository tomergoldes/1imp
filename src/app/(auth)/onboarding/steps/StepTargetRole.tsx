"use client";

import { motion } from "framer-motion";
import { Briefcase, Target, Link as LinkIcon } from "lucide-react";

interface StepTargetRoleProps {
  data: {
    targetRole: string;
    targetIndustry: string;
    jobDescription: string;
  };
  updateData: (data: Partial<StepTargetRoleProps["data"]>) => void;
}

export function StepTargetRole({ data, updateData }: StepTargetRoleProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Where are you heading?</h1>
      <p style={{ color: "#555570", marginBottom: "2rem" }}>We tailor your video narrative based on the roles you're targeting.</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}>
            <Target size={16}/> Target Role
          </label>
          <input 
            value={data.targetRole} 
            onChange={e => updateData({ targetRole: e.target.value })} 
            placeholder="e.g. Senior Product Manager, Full Stack Developer..."
            style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none" }} 
          />
        </div>
        
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}>
            <Briefcase size={16}/> Target Industry (Optional)
          </label>
          <input 
            value={data.targetIndustry} 
            onChange={e => updateData({ targetIndustry: e.target.value })} 
            placeholder="e.g. Fintech, Healthcare, Web3..."
            style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none" }} 
          />
        </div>
        
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "0.5rem" }}>
            <LinkIcon size={16}/> Specific Job Description (Optional)
          </label>
          <textarea 
            value={data.jobDescription} 
            onChange={e => updateData({ jobDescription: e.target.value })} 
            placeholder="Paste the job description or a link here so we can match keywords..."
            style={{ width: "100%", minHeight: 120, padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.2)", fontSize: "1rem", outline: "none", resize: "vertical" }} 
          />
        </div>
      </div>
    </motion.div>
  );
}
