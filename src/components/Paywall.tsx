"use client";

import React, { useState } from 'react';
import { Lock, Download, Share2, Sparkles, Check, Loader2 } from 'lucide-react';

interface PaywallProps {
  videoId: string;
}

export function Paywall({ videoId }: PaywallProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to initiate checkout', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative rounded-3xl p-[1px] overflow-hidden shadow-[0_15px_40px_rgba(16,0,48,0.08)] group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,0,48,0.12)]">
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#E8355A] via-[#6361B8] to-[#E8355A] animate-gradient-xy opacity-40" style={{ backgroundSize: "200% 200%" }} />
      
      {/* Inner light container */}
      <div className="relative h-full w-full bg-white rounded-[23px] overflow-hidden p-6 md:p-8 lg:p-10 z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        
        {/* Glow effect inside */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8355A] rounded-full blur-[100px] opacity-[0.04] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6361B8] rounded-full blur-[100px] opacity-[0.04] pointer-events-none" />

        {/* Left Side: Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative z-10">
          <div className="inline-flex items-center justify-center bg-[rgba(232,53,90,0.05)] border border-[rgba(232,53,90,0.1)] rounded-full px-4 py-1.5 mb-4 backdrop-blur-sm">
            <Lock className="w-3.5 h-3.5 text-[#E8355A] mr-2" />
            <span className="text-[#E8355A] text-xs font-bold uppercase tracking-wider">Premium Access</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-display font-black text-[#100030] mb-3">
            Unlock Your Profile
          </h3>
          <p className="text-[#555570] text-lg mb-8 max-w-lg font-medium">
            Remove the watermark and get full commercial rights to share your professional first impression anywhere.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 w-full">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E8355A]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-[#E8355A]" />
              </div>
              <span className="text-[#100030] font-semibold text-sm">Remove Watermark</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E8355A]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-[#E8355A]" />
              </div>
              <span className="text-[#100030] font-semibold text-sm">HD Download (.mp4)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E8355A]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-[#E8355A]" />
              </div>
              <span className="text-[#100030] font-semibold text-sm">Public Shareable Link</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E8355A]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-[#E8355A]" />
              </div>
              <span className="text-[#100030] font-semibold text-sm">Full Commercial Rights</span>
            </div>
          </div>
        </div>

        {/* Right Side: CTA */}
        <div className="w-full md:w-auto md:min-w-[280px] flex flex-col items-center justify-center p-8 bg-[#F8F8FA] border border-[rgba(16,0,48,0.05)] rounded-2xl relative z-10">
          <div className="text-center mb-6">
            <span className="text-[#9999AA] text-sm uppercase tracking-widest font-bold">One-time payment</span>
            <div className="text-[#100030] text-5xl font-black font-display mt-2 tracking-tight">$9.99</div>
          </div>
          
          <button 
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full relative overflow-hidden text-white font-bold px-8 py-4 rounded-xl text-lg flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #E8355A 0%, #6361B8 100%)", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            ) : (
              <span>Unlock Now</span>
            )}
          </button>
          <div className="mt-4 flex items-center justify-center gap-1.5 opacity-60">
            <Lock className="w-3.5 h-3.5 text-[#100030]" />
            <span className="text-[#100030] text-xs font-semibold">Secure Payment via Stripe</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}

