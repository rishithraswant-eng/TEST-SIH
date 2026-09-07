"use client";

import React, { useEffect, useRef } from 'react';

interface HeroCanvasEngineProps {
  progressRef: React.MutableRefObject<number>;
}

export default function HeroCanvasEngine({ progressRef }: HeroCanvasEngineProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is muted for inline auto-scrubbing playback
    video.muted = true;

    let animFrameId: number;
    let currentLerpProgress = 0;

    const updateVideoTime = () => {
      const targetProgress = progressRef.current || 0;

      // Smooth lerp interpolation for 60fps video scrubbing (eliminates jitter)
      currentLerpProgress += (targetProgress - currentLerpProgress) * 0.08;

      if (video && video.duration && !isNaN(video.duration)) {
        const targetTime = currentLerpProgress * video.duration;
        // Only set currentTime if there is a noticeable delta to prevent choppy seek events
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime;
        }
      }

      animFrameId = requestAnimationFrame(updateVideoTime);
    };

    animFrameId = requestAnimationFrame(updateVideoTime);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [progressRef]);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#00050b] overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        src="/landingpagevideo.mp4"
        playsInline
        muted
        preload="auto"
        className="w-full h-full object-cover"
      />
      {/* Subtle Deep Obsidian Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#00050b]/40 to-[#00050b] pointer-events-none" />
    </div>
  );
}
