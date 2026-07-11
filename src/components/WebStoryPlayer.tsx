"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake } from "lucide-react";
import { CustomChevronRight, CustomArrowRight, CustomMapPin, ThemeIconWrapper } from "@/components/ui/CustomIcons";
import Image from "next/image";
import Link from "next/link";

interface WebStoryPlayerProps {
  hasWatermark: boolean;
  videoUrl?: string | null;
}

export function WebStoryPlayer({ hasWatermark, videoUrl }: WebStoryPlayerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Mock AI generated video slides
  const storySlides = [
    {
      id: "hook",
      duration: 3000,
      content: (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "2rem" }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", marginBottom: "2rem", border: "4px solid #E8355A" }}
          >
            <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" alt="Alex" width={120} height={120} style={{ objectFit: "cover" }} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", fontWeight: 800, lineHeight: 1, marginBottom: "1rem" }}>
            Hi, I'm Alex.
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ fontSize: "1.5rem", fontWeight: 600, color: "#E8355A" }}>
            Senior Product Manager
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem", color: "rgba(255,255,255,0.7)" }}>
            <CustomMapPin size={18} /> San Francisco, CA
          </motion.div>
        </div>
      )
    },
    {
      id: "experience",
      duration: 4000,
      content: (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "2rem", background: "#E8355A" }}>
          <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "2rem" }}>
            What I do best
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ fontSize: "1.5rem", lineHeight: 1.4, fontWeight: 600 }}>
            I bridge the gap between engineering velocity and GTM strategy.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ fontSize: "1.25rem", marginTop: "1.5rem", color: "rgba(255,255,255,0.8)" }}>
            8+ years scaling B2B SaaS platforms from $1M to $15M ARR.
          </motion.p>
        </div>
      )
    },
    {
      id: "highlights",
      duration: 4500,
      content: (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "2rem" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 800, color: "#E8355A", marginBottom: "2rem" }}>
            Biggest Win
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={{ background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: 16, borderLeft: "4px solid #E8355A" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>+24%</div>
              <div style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.8)" }}>Conversion rate increase by redesigning the core onboarding flow at Acme Corp.</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} style={{ background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: 16, borderLeft: "4px solid #34A853" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>-15%</div>
              <div style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.8)" }}>Infrastructure cost reduction while managing a $2M product budget.</div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: "cta",
      duration: 5000,
      content: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "2rem", textAlign: "center" }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} style={{ width: 80, height: 80, borderRadius: "50%", background: "#E8355A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
            <ThemeIconWrapper icon={Handshake} size={40} color="white" accentColor="rgba(255,255,255,0.6)" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}>
            Let's talk.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.7)", marginBottom: "3rem" }}>
            I'm actively looking for my next challenge.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} 
            style={{ padding: "1.25rem 2.5rem", background: "white", color: "#050014", fontSize: "1.125rem", fontWeight: 700, borderRadius: 999, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem", boxShadow: "0 8px 32px rgba(255,255,255,0.2)" }}
          >
            Contact Alex <CustomArrowRight size={20} />
          </motion.button>
        </div>
      )
    }
  ];

  // Auto-advance logic
  useEffect(() => {
    const currentSlide = storySlides[currentSlideIndex];
    let startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / currentSlide.duration) * 100, 100);
      setProgress(newProgress);

      if (elapsedTime >= currentSlide.duration) {
        if (currentSlideIndex < storySlides.length - 1) {
          setCurrentSlideIndex(prev => prev + 1);
          setProgress(0);
        } else {
          setProgress(100);
        }
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [currentSlideIndex, storySlides]);

  // Tap navigation
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = e;
    const width = window.innerWidth;
    
    if (clientX > width / 2) {
      if (currentSlideIndex < storySlides.length - 1) {
        setCurrentSlideIndex(prev => prev + 1);
        setProgress(0);
      }
    } else {
      if (currentSlideIndex > 0) {
        setCurrentSlideIndex(prev => prev - 1);
        setProgress(0);
      }
    }
  };

  return (
    <div 
      className="relative w-full max-w-[480px] h-full max-h-[850px] mx-auto bg-[#100030] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-none sm:rounded-2xl"
      onContextMenu={(e) => {
        if (hasWatermark) e.preventDefault(); // Prevent right-click downloading if watermarked
      }}
    >
      <div onClick={handleTap} className="absolute inset-0 z-0 cursor-pointer">
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
          {storySlides.map((slide, index) => {
            let slideProgress = 0;
            if (index < currentSlideIndex) slideProgress = 100;
            if (index === currentSlideIndex) slideProgress = progress;
            
            return (
              <div key={slide.id} className="flex-1 h-[3px] bg-white/20 rounded-sm overflow-hidden">
                <div style={{ width: `${slideProgress}%` }} className="h-full bg-white rounded-sm transition-all duration-75 ease-linear" />
              </div>
            );
          })}
        </div>

        {/* Slide Content or Actual Video */}
        <AnimatePresence mode="wait">
          {videoUrl ? (
            <motion.div
              key="actual-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-10 bg-black"
            >
              <video 
                src={videoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            <motion.div 
              key={currentSlideIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-10"
            >
              {storySlides[currentSlideIndex].content}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Watermark Overlay */}
        {hasWatermark && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none z-30">
            <h1 className="text-6xl font-black rotate-[-30deg] tracking-widest text-white drop-shadow-2xl">1IMP PREVIEW</h1>
          </div>
        )}

        {/* Branding Overlay */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
          <Link href="/" className="flex items-center gap-1 no-underline text-white/40 hover:text-white/80 transition-colors">
            <span className="text-xs font-semibold">Created with</span>
            <svg width="12" height="12" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="13" stroke="currentColor" strokeWidth="2"/><circle cx="15" cy="15" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35"/><circle cx="15" cy="15" r="3.5" fill="currentColor"/></svg>
            <span className="font-display font-bold text-sm text-white/80">1IMP</span>
          </Link>
        </div>
        
        {/* Navigation Hints */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-white/50 z-20 pointer-events-none">
          <CustomChevronRight size={16} style={{ transform: "rotate(180deg)" }} />
        </div>
        <div className="absolute top-1/2 right-2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-white/50 z-20 pointer-events-none">
          <CustomChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}
