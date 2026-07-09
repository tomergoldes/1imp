"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake } from "lucide-react";
import { CustomChevronRight, CustomArrowRight, CustomMapPin, ThemeIconWrapper } from "@/components/ui/CustomIcons";
import Image from "next/image";
import Link from "next/link";

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

export default function WebStoryPlayer() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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
          // Finished story, stay at 100% on last slide
          setProgress(100);
        }
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [currentSlideIndex]);

  // Tap navigation
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = e;
    const width = window.innerWidth;
    
    if (clientX > width / 2) {
      // Tap right: next
      if (currentSlideIndex < storySlides.length - 1) {
        setCurrentSlideIndex(prev => prev + 1);
        setProgress(0);
      }
    } else {
      // Tap left: prev
      if (currentSlideIndex > 0) {
        setCurrentSlideIndex(prev => prev - 1);
        setProgress(0);
      }
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", background: "#050014", color: "white", overflow: "hidden", position: "relative", fontFamily: "var(--font-body)" }}>
      
      {/* Aspect Ratio Container (simulating mobile vertical video 9:16) */}
      <div 
        onClick={handleTap}
        style={{ 
          width: "100%", maxWidth: 480, height: "100%", maxHeight: 850, margin: "0 auto", 
          position: "relative", background: "#100030", overflow: "hidden",
          boxShadow: "0 0 40px rgba(0,0,0,0.5)"
        }}
      >
        {/* Progress Bars */}
        <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", gap: 4, zIndex: 10 }}>
          {storySlides.map((slide, index) => {
            let slideProgress = 0;
            if (index < currentSlideIndex) slideProgress = 100;
            if (index === currentSlideIndex) slideProgress = progress;
            
            return (
              <div key={slide.id} style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${slideProgress}%`, height: "100%", background: "white", borderRadius: 2 }} />
              </div>
            );
          })}
        </div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlideIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", inset: 0, zIndex: 1 }}
          >
            {storySlides[currentSlideIndex].content}
          </motion.div>
        </AnimatePresence>

        {/* Branding Overlay */}
        <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.25rem", textDecoration: "none", color: "rgba(255,255,255,0.4)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Created with</span>
            <svg width="12" height="12" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="13" stroke="white" strokeWidth="2"/><circle cx="15" cy="15" r="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.35"/><circle cx="15" cy="15" r="3.5" fill="white"/></svg>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>1IMP</span>
          </Link>
        </div>
        
        {/* Navigation Hints */}
        <div style={{ position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)", width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", zIndex: 10, pointerEvents: "none" }}>
          <CustomChevronRight size={16} style={{ transform: "rotate(180deg)" }} />
        </div>
        <div style={{ position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)", width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", zIndex: 10, pointerEvents: "none" }}>
          <CustomChevronRight size={16} />
        </div>

      </div>
    </div>
  );
}
