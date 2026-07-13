"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Briefcase } from "lucide-react";

interface StepResumeUploadProps {
  data: {
    cvText: string;
    cvFileName: string;
    isParsing: boolean;
  };
  updateData: (data: Partial<StepResumeUploadProps["data"]>) => void;
  onFileSelect: (file: File) => void;
  showTextInput: boolean;
  setShowTextInput: (show: boolean) => void;
}

export function StepResumeUpload({ data, updateData, onFileSelect, showTextInput, setShowTextInput }: StepResumeUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#100030", marginBottom: "0.5rem" }}>Upload your resume</h1>
      <p style={{ color: "#555570", marginBottom: "2rem" }}>We will extract your best achievements and integrate them into the script.</p>
      
      {showTextInput ? (
        <div>
          <textarea 
            defaultValue={data.cvText} 
            onChange={(e) => updateData({ cvText: e.target.value })}
            placeholder="Paste your CV text here..."
            style={{ width: "100%", minHeight: 250, padding: "1rem", borderRadius: 12, border: "1.5px solid rgba(99,82,138,0.3)", fontSize: "0.9rem", resize: "vertical" }} 
          />
          <button onClick={() => setShowTextInput(false)} style={{ background: "none", border: "none", color: "#E8355A", cursor: "pointer", marginTop: "1rem", fontWeight: 500 }}>
            &larr; Back to file upload
          </button>
        </div>
      ) : (
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) onFileSelect(f); }}
          onClick={() => !data.cvFileName && fileRef.current?.click()}
          style={{
            border: "2px dashed rgba(99,82,138,0.28)",
            borderRadius: 20, background: "rgba(255,255,255,0.7)",
            padding: "4rem 2rem", textAlign: "center", cursor: data.cvFileName ? "default" : "pointer"
          }}>
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={e => { const f = e.target.files?.[0]; if(f) onFileSelect(f); }} style={{ display: "none" }} />
          
          {data.cvFileName ? (
            <div>
              <Briefcase size={40} color="#6361B8" style={{ margin: "0 auto 1rem" }} />
              <h3 style={{ fontSize: "1.2rem", margin: "0 0 0.5rem" }}>{data.cvFileName}</h3>
              {data.isParsing ? (
                <p style={{ color: "#6361B8", fontWeight: 600 }}>Extracting data... ⏳</p>
              ) : (
                <p style={{ color: "#34A853", fontWeight: 600 }}>Ready ✓</p>
              )}
              <button onClick={(e) => { e.stopPropagation(); updateData({ cvFileName: "", cvText: "" }); }} style={{ background: "none", border: "none", color: "#E8355A", cursor: "pointer", marginTop: "1rem", fontWeight: 500 }}>
                Remove file
              </button>
            </div>
          ) : (
            <>
              <UploadCloud size={48} color="#9999AA" style={{ margin: "0 auto 1rem" }} />
              <p style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Drop your resume here</p>
              <p style={{ color: "#777790", fontSize: "0.85rem", marginBottom: "1.5rem" }}>PDF, Word, or plain text</p>
              <button style={{ padding: "0.6rem 1.5rem", background: "#100030", color: "white", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600 }}>Browse files</button>
              <br/><br/>
              <button onClick={(e) => { e.stopPropagation(); setShowTextInput(true); }} style={{ background: "none", border: "none", color: "#6361B8", cursor: "pointer", fontWeight: 600 }}>
                or paste as text &rarr;
              </button>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}
