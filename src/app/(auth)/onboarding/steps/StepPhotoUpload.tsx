"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Camera } from "lucide-react";

interface StepPhotoUploadProps {
  data: {
    photoBase64: string;
    photoFileName: string;
  };
  updateData: (data: Partial<StepPhotoUploadProps["data"]>) => void;
  onFileSelect: (file: File) => void;
}

export function StepPhotoUpload({ data, updateData, onFileSelect }: StepPhotoUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Upload your photo</h1>
      <p style={{ color: "#555570", marginBottom: "2rem" }}>We will use this photo to generate your customized ninja avatar!</p>
      
      <div
        onClick={() => fileRef.current?.click()}
        style={{
          border: "2px dashed rgba(99,82,138,0.28)", borderRadius: 20, background: "rgba(255,255,255,0.7)",
          padding: "3rem 2rem", textAlign: "center", cursor: "pointer"
        }}>
        <input 
          ref={fileRef} 
          type="file" 
          accept="image/jpeg, image/png, image/webp" 
          onChange={e => { const f = e.target.files?.[0]; if(f) onFileSelect(f); }} 
          style={{ display: "none" }} 
        />
        
        {data.photoBase64 ? (
          <div>
            <div style={{ width: 150, height: 150, borderRadius: "50%", margin: "0 auto 1.5rem", overflow: "hidden", border: "4px solid #6361B8", boxShadow: "0 10px 25px rgba(99,97,184,0.3)" }}>
              <img src={data.photoBase64} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem", color: "#100030" }}>{data.photoFileName}</h3>
            <p style={{ color: "#34A853", fontWeight: 600 }}>Looks great!</p>
            <button 
              onClick={(e) => { e.stopPropagation(); updateData({ photoBase64: "", photoFileName: "" }); }} 
              style={{ background: "none", border: "none", color: "#E8355A", cursor: "pointer", marginTop: "1rem", fontWeight: 500 }}
            >
              Upload a different photo
            </button>
          </div>
        ) : (
          <>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(99,97,184,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <Camera size={40} color="#6361B8" />
            </div>
            <p style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.5rem", color: "#100030" }}>Click to upload a clear face photo</p>
            <p style={{ color: "#777790", fontSize: "0.95rem" }}>Look straight at the camera. Good lighting helps!</p>
            <p style={{ color: "#9999AA", fontSize: "0.85rem", marginTop: "1rem" }}>JPG, PNG, or WEBP.</p>
          </>
        )}
      </div>
    </motion.div>
  );
}
