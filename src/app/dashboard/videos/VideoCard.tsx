"use client";

import { VideoProject as VideoModel } from "@prisma/client";
import { Download, Link as LinkIcon, Loader2, PlayCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function VideoCard({ video }: { video: VideoModel }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  // VideoProject statuses: DRAFT, SCRIPT_READY, APPROVED, RENDERING, COMPLETED, ERROR
  const isCompleted = video.status === "COMPLETED";
  const isFailed = video.status === "ERROR";
  const isPending = !isCompleted && !isFailed; // in-progress / not yet playable
  const statusLabel = isCompleted
    ? "Ready"
    : isFailed
      ? "Failed"
      : video.status === "RENDERING"
        ? "Rendering"
        : "Draft";
  
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/video/${video.id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete video.");
        setIsDeleting(false);
      }
    } catch (err) {
      alert("Error deleting video.");
      setIsDeleting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      style={{
        background: "white", borderRadius: 20, overflow: "hidden",
        border: "1px solid rgba(16,0,48,0.06)", boxShadow: "0 8px 24px rgba(16,0,48,0.04)",
        display: "flex", flexDirection: "column", opacity: isDeleting ? 0.5 : 1
      }}
    >
      {/* Thumbnail Area */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: isPending ? "linear-gradient(135deg, #100030, #2A1F45)" : "#000" }}>
        {isPending ? (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
            <Loader2 size={32} className="animate-spin" color="#E8355A" style={{ marginBottom: "0.5rem" }} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Rendering...</span>
          </div>
        ) : isFailed ? (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#E8355A", background: "rgba(232,53,90,0.1)" }}>
            <span style={{ fontWeight: 600 }}>Render Failed</span>
          </div>
        ) : (
          <Link href={`/v/${video.id}`} style={{ position: "absolute", inset: 0, display: "block" }}>
            <video src={video.videoUrl || undefined} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)", transition: "background 0.2s" }} className="hover:bg-black/40">
              <PlayCircle size={48} color="white" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))", cursor: "pointer" }} />
            </div>
          </Link>
        )}
        
        {/* Top Status & Actions */}
        <div style={{
          position: "absolute", top: "1rem", left: "1rem", right: "1rem",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start"
        }}>
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              padding: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.9)",
              border: "none", cursor: "pointer", color: "#E8355A",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
            title="Delete Video"
          >
            {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
          </button>
          
          {/* Status Badge */}
          <div style={{
            padding: "4px 10px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700,
            background: isPending ? "rgba(255,255,255,0.2)" : isFailed ? "#E8355A" : "#34A853",
            color: "white", backdropFilter: "blur(4px)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            {statusLabel}
          </div>
        </div>
      </div>

      {/* Details Area */}
      <div style={{ padding: "1.5rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.125rem", color: "#100030", fontFamily: "var(--font-display)", fontWeight: 700 }}>
          Professional Intro
        </h3>
        <p style={{ margin: 0, color: "#9999AA", fontSize: "0.875rem", flexGrow: 1 }}>
          {new Date(video.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
          <button 
            disabled={isPending || isFailed || isDeleting}
            onClick={() => {
              if (video.videoUrl) window.open(video.videoUrl, '_blank');
            }}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              padding: "0.6rem", background: "rgba(99,97,184,0.1)", color: "#6361B8",
              border: "none", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600,
              cursor: isPending || isFailed || isDeleting ? "not-allowed" : "pointer", opacity: isPending || isFailed || isDeleting ? 0.5 : 1,
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => { if(!isPending && !isFailed && !isDeleting) e.currentTarget.style.background = "rgba(99,97,184,0.2)" }}
            onMouseOut={(e) => { if(!isPending && !isFailed && !isDeleting) e.currentTarget.style.background = "rgba(99,97,184,0.1)" }}
          >
            <Download size={16} /> Download
          </button>
          <button 
            disabled={isPending || isFailed || isDeleting}
            onClick={() => {
              const url = `${window.location.origin}/v/${video.id}`;
              navigator.clipboard.writeText(url);
              alert("Video Profile URL copied to clipboard!");
            }}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              padding: "0.6rem", background: "rgba(16,0,48,0.05)", color: "#100030",
              border: "none", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600,
              cursor: isPending || isFailed || isDeleting ? "not-allowed" : "pointer", opacity: isPending || isFailed || isDeleting ? 0.5 : 1,
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => { if(!isPending && !isFailed && !isDeleting) e.currentTarget.style.background = "rgba(16,0,48,0.1)" }}
            onMouseOut={(e) => { if(!isPending && !isFailed && !isDeleting) e.currentTarget.style.background = "rgba(16,0,48,0.05)" }}
          >
            <LinkIcon size={16} /> Copy Link
          </button>
        </div>
      </div>
    </motion.div>
  );
}
