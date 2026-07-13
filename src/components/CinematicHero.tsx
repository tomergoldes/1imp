"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, useTransform } from "framer-motion";
import Link from "next/link";

const FRAME_COUNT = 181;

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Cache for loaded images
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT + 1).fill(null));
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Draw frame to canvas (declared before the effect that references it).
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const img = imagesRef.current[index];
    if (!img) return; // Not loaded yet

    if (canvas.width !== img.width || canvas.height !== img.height) {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    
    // Helper to load a single image
    const loadImage = (index: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = `/hero-frames/frame_${index.toString().padStart(4, '0')}.webp`;
        img.onload = () => {
          imagesRef.current[index] = img;
          loadedCount++;
          setImagesLoaded(loadedCount);
          // If this is the very first frame, draw it immediately
          if (index === 1) renderFrame(1);
          resolve();
        };
        img.onerror = () => resolve(); // Ignore errors to keep loading
      });
    };

    // Preload strategy: 
    // Load first 30 frames immediately so initial scrub is instant
    const preloadSequence = async () => {
      const initialPromises = [];
      for (let i = 1; i <= Math.min(30, FRAME_COUNT); i++) {
        initialPromises.push(loadImage(i));
      }
      await Promise.all(initialPromises);

      // Progressive load for the rest
      for (let i = 31; i <= FRAME_COUNT; i++) {
        await loadImage(i);
      }
    };

    preloadSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync scroll to frame
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Scroll progress from 0 to 0.8 controls the frames (1 to 181).
    // The final 20% of scroll (0.8 to 1.0) keeps the frame paused at the end.
    const effectiveProgress = Math.min(1, latest / 0.8);
    const frameIndex = Math.max(1, Math.min(FRAME_COUNT, Math.floor(effectiveProgress * (FRAME_COUNT - 1)) + 1));
    
    // Use requestAnimationFrame to ensure smooth rendering
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <section ref={containerRef} style={{ position: "relative", height: "400vh" }}>
      {/* Pinned sticky container */}
      <div style={{ position: "sticky", top: 0, left: 0, width: "100%", height: "100vh", overflow: "hidden" }}>

        {/* Fallback background — shown behind the canvas so the hero is never
            blank if the frame sequence fails to load. */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "linear-gradient(135deg, #F0EEFB 0%, #E4E0F4 55%, #DDD8F0 100%)",
        }} />

        {/* The high-performance canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover", // Let CSS handle the responsive cropping!
            zIndex: 1
          }}
        />

        {/* Gradient overlay to ensure text is readable */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "70%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0) 100%)",
          zIndex: 2,
          pointerEvents: "none"
        }} />

        {/* Hero Text Content - Sequenced Slides */}
        <div style={{ position: "absolute", top: "25vh", left: 0, right: 0, zIndex: 10, textAlign: "center", padding: "0 2rem", maxWidth: 900, margin: "0 auto", pointerEvents: "none" }}>
          
          {/* SLIDE 1: Title (Visible at Start) */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.15], [0, -30]),
              marginBottom: "2rem"
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{
                fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#6361B8", marginBottom: "1.1rem", fontFamily: "var(--font-body)",
                background: "rgba(255,255,255,0.8)", padding: "0.4rem 1rem", borderRadius: 999, display: "inline-block",
                boxShadow: "0 2px 12px rgba(99,97,184,0.15)"
              }}
            >
              AI VIDEO GENERATOR FOR CAREERS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.55 }}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.25rem)", 
                lineHeight: 1.15, letterSpacing: "-0.03em", color: "#100030", margin: 0,
                textShadow: "0 4px 32px rgba(255,255,255,1), 0 1px 3px rgba(255,255,255,0.8)"
              }}
            >
              Turn your boring PDF resume<br />into a viral video in 60 seconds.
            </motion.h1>
          </motion.div>

          {/* SLIDE 3: Buttons (Visible at Start AND End) */}
          <motion.div 
            style={{ 
              pointerEvents: useTransform(scrollYProgress, v => (v < 0.2 || v > 0.7) ? "auto" : "none"),
              opacity: useTransform(scrollYProgress, [0, 0.15, 0.75, 0.9], [1, 0, 0, 1]),
              marginBottom: "2.5rem"
            }}
          >
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/create" style={{
                display: "inline-flex", alignItems: "center", padding: "0.85rem 2rem",
                background: "#FF3B6B", color: "white", borderRadius: 9999, border: "1.5px solid #100030",
                fontSize: "1.1rem", fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-body)", 
                boxShadow: "inset 0px -3.5px 0px rgba(0,0,0,0.22)", transition: "all 160ms",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.05)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                Generate Your Video
              </Link>

              <Link href="#how-it-works" style={{
                display: "inline-flex", alignItems: "center", padding: "0.85rem 2rem",
                background: "white", color: "#100030", borderRadius: 9999, border: "1px solid #6361B8", 
                fontSize: "1.1rem", fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-body)", transition: "all 160ms",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f4f4f8"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "white"; }}
              >
                See How It Works
              </Link>
            </div>
          </motion.div>

          {/* SLIDE 2: Description (Visible at End) */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.75, 0.9], [0, 1]),
              y: useTransform(scrollYProgress, [0.75, 0.9], [30, 0])
            }}
          >
            <p
              style={{
                fontSize: "1.35rem", color: "#100030", lineHeight: 1.65, fontFamily: "var(--font-body)", 
                fontWeight: 600, maxWidth: 640, margin: "0 auto",
                textShadow: "0 2px 10px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,1)"
              }}
            >
              Recruiters don&apos;t read PDFs, they watch stories. Upload your resume and let our AI generate a stunning Web Story you can send directly to hiring managers.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
