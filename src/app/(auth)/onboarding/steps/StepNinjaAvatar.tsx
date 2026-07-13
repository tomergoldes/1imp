"use client";

import { motion } from "framer-motion";
import { Palette, Scissors, Sparkles } from "lucide-react";

interface StepNinjaAvatarProps {
  data: {
    ninjaColor: string;
    ninjaGender: string;
  };
  updateData: (data: Partial<StepNinjaAvatarProps["data"]>) => void;
}

export function StepNinjaAvatar({ data, updateData }: StepNinjaAvatarProps) {
  const COLORS = [
    { label: "Classic Black", value: "#1A1A1A" },
    { label: "Deep Crimson", value: "#E8355A" },
    { label: "Midnight Blue", value: "#100030" },
    { label: "Purple Velvet", value: "#6361B8" },
    { label: "Emerald Green", value: "#34A853" },
    { label: "Golden Yellow", value: "#FABB05" }
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Customize your Ninja</h1>
      <p style={{ color: "#555570", marginBottom: "2rem" }}>Choose the look and feel of your AI avatar.</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "1rem" }}>
            <Palette size={16}/> Ninja Outfit Color
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {COLORS.map((color) => (
              <div 
                key={color.value}
                onClick={() => updateData({ ninjaColor: color.value })}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                  padding: "1rem", borderRadius: 16, cursor: "pointer",
                  border: data.ninjaColor === color.value ? `2px solid ${color.value}` : "2px solid rgba(99,82,138,0.1)",
                  background: data.ninjaColor === color.value ? `${color.value}10` : "white",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: color.value, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#100030", textAlign: "center" }}>{color.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#100030", marginBottom: "1rem" }}>
            <Scissors size={16}/> Avatar Style Base
          </label>
          <div style={{ display: "flex", gap: "1rem" }}>
            {["Masculine", "Feminine", "Neutral"].map((gender) => (
              <button
                key={gender}
                onClick={() => updateData({ ninjaGender: gender.toLowerCase() })}
                style={{
                  flex: 1, padding: "0.875rem", borderRadius: 12, fontWeight: 600, cursor: "pointer",
                  background: data.ninjaGender === gender.toLowerCase() ? "#100030" : "white",
                  color: data.ninjaGender === gender.toLowerCase() ? "white" : "#100030",
                  border: data.ninjaGender === gender.toLowerCase() ? "2px solid #100030" : "2px solid rgba(99,82,138,0.2)",
                  transition: "all 0.2s"
                }}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(99,97,184,0.08)", padding: "1.5rem", borderRadius: 16, display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <Sparkles size={24} color="#6361B8" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <h4 style={{ margin: "0 0 0.5rem", color: "#100030", fontSize: "1rem" }}>AI Magic</h4>
            <p style={{ margin: 0, color: "#555570", fontSize: "0.9rem", lineHeight: 1.5 }}>
              Our AI will analyze your photo and blend your facial features seamlessly into this customized ninja design.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
