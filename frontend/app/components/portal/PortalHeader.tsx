"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, FileCheck, LogOut, Sparkles, Activity, AlertTriangle } from 'lucide-react';
import { DEMO_CASE_DATA } from '@/app/lib/mockData';

interface PortalHeaderProps {
  currentTab: string;
}

export default function PortalHeader({ currentTab }: PortalHeaderProps) {
  return (
    <header className="bg-[#111A2E] border-b border-[#1E2D4A] flex flex-col z-30 shrink-0">
      {/* Non-dismissible SAHYOG Interop Banner */}
      <div className="bg-[#FFB300]/15 border-b border-[#FFB300]/30 text-[#FFB300] px-4 py-1.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-[#FFB300] shrink-0" />
          <span className="font-bold">SAHYOG v2.4 COMPLIANT INTEROPERABILITY LAYER ACTIVE</span>
          <span className="text-gray-400 font-sans hidden md:inline">| Statutory Authority Verified (Section 94 BNSS)</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="bg-[#FFB300]/20 px-2 py-0.5 rounded text-amber-300 font-semibold">MULTI-AGENCY READY</span>
          <Link href="/" className="hover:underline text-cyan-400 flex items-center">
            <Sparkles className="w-3 h-3 mr-1" /> View Cinematic Landing Page
          </Link>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-7 h-7 text-[#00E5FF]" />
            <div>
              <span className="font-extrabold text-lg tracking-wider text-gray-100">PHANTASM</span>
              <span className="text-[10px] text-cyan-400 block font-mono">SAHYOG FORENSIC PORTAL</span>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-700 hidden sm:block" />

          {/* Active Case Summary Badge */}
          <div className="hidden sm:flex items-center space-x-3 text-xs font-mono">
            <span className="text-gray-400">CASE ID:</span>
            <span className="text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
              {DEMO_CASE_DATA.caseId}
            </span>
            <span className="text-gray-400">STATUS:</span>
            <span className="bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 px-2.5 py-1 rounded font-bold flex items-center">
              <Activity className="w-3 h-3 mr-1.5 animate-pulse" /> VASP IDENTIFIED
            </span>
          </div>
        </div>

        {/* IO Officer Session Profile */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden md:block">
            <div className="text-xs font-semibold text-gray-200">{DEMO_CASE_DATA.investigatingOfficer} (IO)</div>
            <div className="text-[10px] text-cyan-400 font-mono">ID: {DEMO_CASE_DATA.officerId}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1E2D4A] border border-[#00E5FF]/40 flex items-center justify-center font-bold text-xs text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            AS
          </div>
          <Link
            href="/"
            className="p-2 text-gray-400 hover:text-amber-400 transition-colors"
            title="Exit Portal"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
