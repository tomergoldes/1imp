"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface VideoScene {
  id: string;
  orderIndex: number;
  sceneType: string;
  startSec: number;
  endSec: number;
  voiceoverText: string;
  onScreenText: string;
  sourceUrl: string | null;
}

interface WebStoryPlayerProps {
  hasWatermark: boolean;
  videoUrl?: string | null;
  scenes?: VideoScene[];
}

export function WebStoryPlayer({ hasWatermark, videoUrl, scenes = [] }: WebStoryPlayerProps) {
  // Pick a renderer as a component so hooks are never called conditionally.
  if (videoUrl) {
    return <RenderedVideoPlayer hasWatermark={hasWatermark} videoUrl={videoUrl} />;
  }
  return <ScenePreviewPlayer hasWatermark={hasWatermark} scenes={scenes} />;
}

function RenderedVideoPlayer({ hasWatermark, videoUrl }: { hasWatermark: boolean; videoUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="relative w-full max-w-[480px] h-full max-h-[850px] mx-auto bg-[#050014] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-none sm:rounded-2xl flex items-center justify-center"
      onContextMenu={(e) => hasWatermark && e.preventDefault()}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        playsInline
        loop
        muted={isMuted}
        onClick={() => {
          if (videoRef.current?.paused) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        }}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white pl-2">
            <Play size={40} fill="currentColor" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-6 right-6 flex gap-3 z-20">
        <button
          onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-colors"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Watermark */}
      {hasWatermark && (
        <div className="absolute top-6 left-6 px-3 py-1.5 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs font-bold tracking-wider z-20" style={{ fontFamily: "var(--font-display)" }}>
          MADE WITH 1IMP
        </div>
      )}
    </div>
  );
}

function ScenePreviewPlayer({ hasWatermark, scenes }: { hasWatermark: boolean; scenes: VideoScene[] }) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!scenes || scenes.length === 0) return;

    const currentScene = scenes[currentSceneIndex];
    const durationMs = (currentScene.endSec - currentScene.startSec) * 1000;

    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / durationMs) * 100, 100);
      setProgress(newProgress);

      if (elapsedTime >= durationMs) {
        if (currentSceneIndex < scenes.length - 1) {
          setCurrentSceneIndex(prev => prev + 1);
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
  }, [currentSceneIndex, scenes]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = e;
    const width = window.innerWidth;
    
    if (clientX > width / 2) {
      if (currentSceneIndex < scenes.length - 1) {
        setCurrentSceneIndex(prev => prev + 1);
        setProgress(0);
      }
    } else {
      if (currentSceneIndex > 0) {
        setCurrentSceneIndex(prev => prev - 1);
        setProgress(0);
      }
    }
  };

  if (!scenes || scenes.length === 0) {
    return (
      <div className="w-full max-w-[480px] h-[850px] mx-auto bg-[#100030] flex items-center justify-center text-white rounded-2xl">
        <p>No scenes found.</p>
      </div>
    );
  }

  const currentScene = scenes[currentSceneIndex];

  return (
    <div 
      className="relative w-full max-w-[480px] h-full max-h-[850px] mx-auto bg-[#100030] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-none sm:rounded-2xl"
      onContextMenu={(e) => hasWatermark && e.preventDefault()}
    >
      <div onClick={handleTap} className="absolute inset-0 z-10 cursor-pointer">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {/* Background Image/Video representation for the scene */}
            {currentScene.sourceUrl ? (
              <video src={currentScene.sourceUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A001F] flex flex-col items-center justify-center opacity-80">
                <ImageIcon size={64} className="text-white/20 mb-4" />
                <span className="text-white/30 text-sm font-semibold uppercase tracking-wider">{currentScene.sceneType}</span>
              </div>
            )}
            
            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#050014] via-transparent to-transparent">
              {currentScene.onScreenText && (
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="text-white text-4xl font-black leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}
                >
                  {currentScene.onScreenText}
                </motion.h2>
              )}
              
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4"
              >
                <p className="text-white/90 text-sm font-medium leading-relaxed italic">
                  &ldquo;{currentScene.voiceoverText}&rdquo;
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bars */}
      <div className="absolute top-4 left-0 right-0 px-4 flex gap-2 z-20 pointer-events-none">
        {scenes.map((scene, i) => (
          <div key={scene.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: i < currentSceneIndex ? "100%" : i === currentSceneIndex ? `${progress}%` : "0%"
              }}
            />
          </div>
        ))}
      </div>

      {/* Watermark */}
      {hasWatermark && (
        <div className="absolute top-10 left-4 px-3 py-1.5 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs font-bold tracking-wider z-20 pointer-events-none" style={{ fontFamily: "var(--font-display)" }}>
          MADE WITH 1IMP
        </div>
      )}
    </div>
  );
}
