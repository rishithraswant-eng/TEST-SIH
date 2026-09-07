"use client";

import React from 'react';

interface NovaGlassTitleProps {
  primaryText?: string;
  secondaryText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSparkle?: boolean;
  className?: string;
}

export default function NovaGlassTitle({
  primaryText = "NOVA",
  secondaryText = "GLASS",
  size = "lg",
  showSparkle = true,
  className = ""
}: NovaGlassTitleProps) {
  
  const sizeClasses = {
    sm: "text-2xl sm:text-3xl leading-none",
    md: "text-3xl sm:text-4xl leading-none",
    lg: "text-4xl sm:text-5xl lg:text-6xl leading-[0.95]",
    xl: "text-5xl sm:text-6xl lg:text-7xl leading-[0.92]"
  };

  return (
    <div className={`relative inline-flex flex-col select-none ${className}`}>
      {/* Primary Line */}
      <div className="relative inline-block">
        <span className={`font-serif font-semibold text-[#5C1A1B] tracking-tight ${sizeClasses[size]}`}>
          {primaryText}
        </span>

        {/* Bronze Star Sparkle */}
        {showSparkle && (
          <div className="absolute -top-3 -right-6 pointer-events-none animate-pulse">
            <svg
              className="w-6 h-6 text-[#B08D57] drop-shadow-[0_0_6px_rgba(176,141,87,0.35)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
        )}
      </div>

      {/* Secondary Line */}
      {secondaryText && (
        <span className={`font-serif font-semibold text-[#6B1E24] tracking-tight mt-1 ${sizeClasses[size]}`}>
          {secondaryText}
        </span>
      )}
    </div>
  );
}

