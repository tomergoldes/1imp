"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit2, Save, X, Loader2, CheckCircle2 } from "lucide-react";

interface PromptData {
  id: string;
  name: string;
  content: string;
}

export default function AdminEnginesPage() {
  const [prompts, setPrompts] = useState<PromptData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessId, setSaveSuccessId] = useState<string | null>(null);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const res = await fetch("/api/admin/prompts");
      const data = await res.json();
      if (data.success) {
        setPrompts(data.prompts);
      }
    } catch (error) {
      console.error("Failed to load prompts", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (prompt: PromptData) => {
    setEditingId(prompt.id);
    setEditContent(prompt.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const savePrompt = async (prompt: PromptData) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/prompts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: prompt.id,
          name: prompt.name,
          content: editContent
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setPrompts(prev => prev.map(p => p.id === prompt.id ? { ...p, content: editContent } : p));
        setEditingId(null);
        
        // Show success indicator temporarily
        setSaveSuccessId(prompt.id);
        setTimeout(() => setSaveSuccessId(null), 3000);
      }
    } catch (error) {
      console.error("Failed to save prompt", error);
      alert("Failed to save prompt.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <Loader2 size={40} className="animate-spin" color="#E8355A" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", marginBottom: "0.5rem" }}>
          AI Engine Configuration
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          Manage the System Prompts powering the Candidate Story pipelines. Changes take effect immediately on the next generation.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {prompts.length === 0 ? (
          <div style={{ padding: "3rem", background: "rgba(255,255,255,0.03)", borderRadius: 16, textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
            No prompts found in the database. Run the engine once to seed the defaults.
          </div>
        ) : prompts.map((p, index) => (
          <div key={p.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, overflow: "hidden" }}>
            
            {/* Header */}
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ display: "inline-flex", width: 24, height: 24, borderRadius: "50%", background: "rgba(232,53,90,0.2)", color: "#E8355A", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                  {index + 1}
                </span>
                {p.name}
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontWeight: 400, marginLeft: "0.5rem" }}>({p.id})</span>
              </h2>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                {saveSuccessId === p.id && (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#34A853", fontSize: "0.85rem", fontWeight: 600, marginRight: "1rem" }}>
                    <CheckCircle2 size={16} /> Saved
                  </span>
                )}
                
                {editingId === p.id ? (
                  <>
                    <button 
                      onClick={cancelEdit}
                      disabled={isSaving}
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem" }}
                    >
                      <X size={14} /> Cancel
                    </button>
                    <button 
                      onClick={() => savePrompt(p)}
                      disabled={isSaving}
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1.2rem", background: "#E8355A", border: "none", color: "white", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
                    >
                      {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => startEdit(p)}
                    style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  >
                    <Edit2 size={14} /> Edit Prompt
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "1.5rem" }}>
              {editingId === p.id ? (
                <textarea 
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  style={{
                    width: "100%", minHeight: "400px", padding: "1rem", background: "rgba(0,0,0,0.3)", 
                    border: "1px solid rgba(232,53,90,0.5)", borderRadius: 8, color: "white",
                    fontFamily: "monospace", fontSize: "0.9rem", lineHeight: 1.6, resize: "vertical",
                    outline: "none"
                  }}
                />
              ) : (
                <pre style={{ 
                  margin: 0, 
                  whiteSpace: "pre-wrap", 
                  wordBreak: "break-word",
                  fontFamily: "monospace", 
                  fontSize: "0.85rem", 
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6
                }}>
                  {p.content}
                </pre>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
