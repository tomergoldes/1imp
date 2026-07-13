"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Download, Share2, CheckCircle, Clock, Play, Pause, Volume2, VolumeX, Maximize, Lock, Check, Loader2, ArrowLeft } from "lucide-react";

import { WebStoryPlayer } from "@/components/WebStoryPlayer";

type VideoData = {
  id: string;
  userId: string;
  videoUrl: string | null;
  status: string;
  hasWatermark: boolean;
  isDownloadable: boolean;
  createdAt: Date;
  scenes?: any[];
  user?: { name?: string | null; email?: string | null } | null;
};

export function VideoPageClient({ videoProject: video }: { videoProject: VideoData }) {
  const router = useRouter();
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isPending = video.status === "PENDING";

  useEffect(() => {
    if (isPending) {
      const pollInterval = setInterval(() => {
        router.refresh();
      }, 3000);
      
      const timeInterval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);

      return () => {
        clearInterval(pollInterval);
        clearInterval(timeInterval);
      };
    }
  }, [isPending, router]);

  const handleUnlock = async () => {
    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setLoadingCheckout(false);
    } catch {
      setLoadingCheckout(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else { videoRef.current.play(); setIsPlaying(true); }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F8 100%)" }}>
        <div style={{
          background: "white", borderRadius: 28, padding: "4rem 3rem",
          boxShadow: "0 24px 80px rgba(16,0,48,0.08)", border: "1px solid rgba(16,0,48,0.06)",
          maxWidth: 480, width: "90%", textAlign: "center"
        }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #E8355A22, #6361B822)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <Clock style={{ color: "#6361B8" }} size={28} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#100030", margin: "0 0 1rem" }}>
            Your video is being crafted
          </h2>
          <p style={{ color: "#6B6B8A", lineHeight: 1.7, margin: "0 0 2rem", fontSize: "1.05rem" }}>
            Our AI is generating your professional video. This usually takes 2–3 minutes. We'll email you when it's ready.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#6361B8", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6361B8", animation: "pulse 1.5s infinite" }} />
            Generating...
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#100030", fontFamily: "var(--font-jetbrains)", marginBottom: "2rem" }}>
            {Math.floor(timer / 60).toString().padStart(2, "0")}:{(timer % 60).toString().padStart(2, "0")}
          </div>
          <Link href="/dashboard" style={{ color: "#9999AA", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #FAFAFA 0%, #F4F4FB 100%)", fontFamily: "var(--font-body)" }}>

      {/* Top bar */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, color: "#6B6B8A", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem", transition: "color 0.2s" }}
          className="hover:text-[#100030]">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9999AA", fontSize: "0.8rem", fontWeight: 500 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34C759", boxShadow: "0 0 0 3px rgba(52,199,89,0.2)" }} />
          Ready to view
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 5rem" }}>

        {/* Main two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2.5rem", alignItems: "start" }}>

          {/* LEFT: Video */}
          <div>
            {/* Video player */}
            <div style={{
              position: "relative", borderRadius: 20, overflow: "hidden",
              background: "#0A0014", aspectRatio: "16/9",
              boxShadow: "0 32px 80px rgba(16,0,48,0.18), 0 8px 24px rgba(16,0,48,0.1)",
              border: "1px solid rgba(255,255,255,0.05)"
            }}>
              <WebStoryPlayer 
                hasWatermark={video.hasWatermark}
                videoUrl={video.videoUrl}
                scenes={video.scenes || []}
              />
            </div>

            {/* Below video: title */}
            <div style={{ marginTop: "1.5rem" }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#100030", margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>
                Your Video is Ready.
              </h1>
              <p style={{ color: "#6B6B8A", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
                {video.hasWatermark
                  ? "This is a preview with watermark. Unlock full quality to share, download, and use commercially."
                  : "Your premium video is ready. Download or share your professional first impression."}
              </p>

              {!video.hasWatermark && (
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                  {video.videoUrl && (
                    <a href={video.videoUrl} download="1IMP-Video.mp4" style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "0.75rem 1.5rem", borderRadius: 12,
                      background: "linear-gradient(135deg, #E8355A, #6361B8)", color: "white",
                      fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
                      boxShadow: "0 8px 24px rgba(232,53,90,0.3)"
                    }}>
                      <Download size={16} /> Download HD
                    </a>
                  )}
                  <button onClick={handleCopy} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "0.75rem 1.5rem", borderRadius: 12,
                    background: "white", color: "#100030", border: "1.5px solid rgba(16,0,48,0.1)",
                    fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(16,0,48,0.04)"
                  }}>
                    <Share2 size={16} /> {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Upgrade Panel (or success) */}
          <div style={{ position: "sticky", top: "2rem" }}>
            {video.hasWatermark ? (
              <div style={{
                background: "white", borderRadius: 24, overflow: "hidden",
                boxShadow: "0 20px 60px rgba(16,0,48,0.08), 0 4px 16px rgba(16,0,48,0.04)",
                border: "1px solid rgba(16,0,48,0.05)"
              }}>
                {/* Gradient header stripe */}
                <div style={{ height: 4, background: "linear-gradient(90deg, #E8355A, #6361B8)" }} />

                <div style={{ padding: "2rem 1.75rem" }}>
                  {/* Icon + label */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: "linear-gradient(135deg, rgba(232,53,90,0.1), rgba(99,97,184,0.1))",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <Lock size={18} style={{ color: "#E8355A" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#100030", fontSize: "0.95rem" }}>Premium Access</div>
                      <div style={{ color: "#9999AA", fontSize: "0.78rem" }}>One-time unlock</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(16,0,48,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "3.5rem", color: "#100030", letterSpacing: "-0.03em", lineHeight: 1 }}>$9.99</span>
                    </div>
                    <p style={{ color: "#6B6B8A", fontSize: "0.875rem", margin: "0.4rem 0 0", lineHeight: 1.5 }}>
                      Lifetime access. No subscription. No hidden fees.
                    </p>
                  </div>

                  {/* Features */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1.75rem" }}>
                    {[
                      "Remove all watermarks",
                      "HD download (.mp4)",
                      "Public shareable profile link",
                      "Full commercial rights",
                    ].map(feature => (
                      <div key={feature} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                          background: "rgba(52,199,89,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <Check size={13} style={{ color: "#34C759" }} />
                        </div>
                        <span style={{ color: "#2D2D4A", fontSize: "0.9rem", fontWeight: 500 }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleUnlock}
                    disabled={loadingCheckout}
                    style={{
                      width: "100%", padding: "1rem", borderRadius: 14,
                      background: loadingCheckout ? "#aaa" : "linear-gradient(135deg, #E8355A 0%, #6361B8 100%)",
                      color: "white", fontWeight: 700, fontSize: "1rem", border: "none",
                      cursor: loadingCheckout ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      boxShadow: "0 8px 24px rgba(232,53,90,0.3)",
                      transform: "translateY(0)", transition: "transform 0.15s, box-shadow 0.15s"
                    }}
                    onMouseOver={e => { if (!loadingCheckout) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(232,53,90,0.4)"; }}}
                    onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,53,90,0.3)"; }}
                  >
                    {loadingCheckout ? <Loader2 size={18} className="animate-spin" /> : null}
                    {loadingCheckout ? "Redirecting…" : "Unlock Now — $9.99"}
                  </button>

                  {/* Trust line */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: "1rem", color: "#ABABBA", fontSize: "0.78rem" }}>
                    <Lock size={11} /> Secured by Stripe · 30-day guarantee
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                background: "white", borderRadius: 24,
                boxShadow: "0 20px 60px rgba(16,0,48,0.06)",
                border: "1px solid rgba(52,199,89,0.15)", overflow: "hidden"
              }}>
                <div style={{ height: 4, background: "linear-gradient(90deg, #34C759, #30D158)" }} />
                <div style={{ padding: "2rem 1.75rem", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(52,199,89,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <CheckCircle size={26} style={{ color: "#34C759" }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: "#100030", margin: "0 0 0.5rem" }}>Premium Unlocked</h3>
                  <p style={{ color: "#6B6B8A", fontSize: "0.9rem", margin: "0 0 1.5rem", lineHeight: 1.6 }}>Your video is ready to download and share.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {video.videoUrl && (
                      <a href={video.videoUrl} download="1IMP-Video.mp4" style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "0.875rem", borderRadius: 12,
                        background: "linear-gradient(135deg, #E8355A, #6361B8)", color: "white",
                        fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
                        boxShadow: "0 6px 20px rgba(232,53,90,0.25)"
                      }}>
                        <Download size={16} /> Download HD
                      </a>
                    )}
                    <button onClick={handleCopy} style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "0.875rem", borderRadius: 12,
                      background: "#F4F4F8", color: "#100030", border: "none",
                      fontWeight: 600, fontSize: "0.95rem", cursor: "pointer"
                    }}>
                      <Share2 size={16} /> {copied ? "Copied!" : "Copy Share Link"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        .video-overlay-controls:hover > div {
          opacity: 1 !important;
          background: rgba(0,0,0,0.2) !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
