"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, ChevronRight } from 'lucide-react';
import HeroCanvasEngine from './HeroCanvasEngine';

export default function CinematicLandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Persistent Ref for 60fps video scrubbing driven by scroll (NO React state re-renders on scroll)
  const progressRef = useRef<number>(0);
  const [showConsoleCTA, setShowConsoleCTA] = useState(false);

  // Scroll Progress Listener (600vh Track)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const p = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      
      progressRef.current = p;

      // Show console CTA when scroll progress reaches near end (> 85%)
      if (p > 0.85) {
        setShowConsoleCTA(true);
      } else {
        setShowConsoleCTA(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterApp = () => {
    router.push('/dashboard');
  };

  return (
    <div ref={containerRef} className="relative min-h-[600vh] bg-[#00050b] text-gray-100 font-sans selection:bg-[#91f0fa] selection:text-black">
      
      {/* Background Scroll-Scrubbed Video Engine */}
      <HeroCanvasEngine progressRef={progressRef} />

      {/* Professional Forensic Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between backdrop-blur-md bg-[#00050b]/85 border-b border-[#122238] font-mono">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[#00050b] border border-[#5de8f2]/30 flex items-center justify-center text-[#91f0fa] shadow-[0_0_12px_rgba(145,240,250,0.2)]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-widest text-white block leading-none">PHANTASM</span>
            <span className="text-[10px] text-[#91f0fa]/80 block tracking-wider pt-1 font-semibold">TRACE · INVESTIGATE · ATTRIBUTE</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleEnterApp}
            className="text-xs text-gray-400 hover:text-[#91f0fa] font-mono uppercase tracking-wider transition"
          >
            SKIP INTRO →
          </button>
          <button
            onClick={handleEnterApp}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#91f0fa] to-[#0088cc] hover:from-[#5de8f2] hover:to-[#006699] text-black font-mono font-extrabold text-xs tracking-wider uppercase transition flex items-center space-x-2 shadow-[0_0_20px_rgba(145,240,250,0.3)]"
          >
            <span>ENTER PHANTASM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Single Ultra-Clear Center Console CTA Button (Positioned directly below PHANTASM logo) */}
      {showConsoleCTA && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 translate-y-16 sm:translate-y-20 z-40 pointer-events-auto animate-fade-in">
          <button
            onClick={handleEnterApp}
            className="group px-8 py-3.5 rounded-full bg-[#00050b]/90 hover:bg-[#91f0fa] border-2 border-[#91f0fa] text-white hover:text-black font-mono font-black text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center space-x-3 shadow-[0_0_35px_rgba(145,240,250,0.6)] hover:shadow-[0_0_50px_rgba(145,240,250,0.9)] hover:scale-105 backdrop-blur-md cursor-pointer"
          >
            <span className="text-white group-hover:text-black font-bold">ENTER PHANTASM CONSOLE</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#91f0fa] group-hover:text-black transition-colors" />
          </button>
        </div>
      )}

    </div>
  );
}
