"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, AlertTriangle, KeyRound, ArrowRight } from 'lucide-react';
import { useInvestigationStore } from '@/app/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useInvestigationStore();

  const [officerId, setOfficerId] = useState("SHM-8891-ND");
  const [password, setPassword] = useState("••••••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(officerId, password);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050912] text-gray-100 font-sans flex flex-col items-center justify-center p-4">
      
      {/* Demo Banner */}
      <div className="fixed top-0 left-0 right-0 bg-[#FFB300]/15 border-b border-[#FFB300]/30 text-[#FFB300] px-4 py-2 flex items-center justify-center text-xs font-mono">
        <AlertTriangle className="w-4 h-4 mr-2" />
        <span className="font-bold">DEMO / MOCK ENVIRONMENT — FOR HACKATHON EVALUATION ONLY</span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.4)]">
            <Shield className="w-8 h-8 text-black" />
          </div>

          <h1 className="text-2xl font-black tracking-wider text-white pt-2">PHANTASM</h1>
          <p className="text-xs text-cyan-400 font-mono tracking-widest uppercase">
            GRAPH RESOLUTION ENGINE
          </p>
          <p className="text-[11px] text-gray-400 font-mono">
            CYBER CRIME / DIGITAL FORENSICS CONSOLE
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-gray-400">OFFICER ID</label>
            <div className="relative">
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="Enter IO Designation ID..."
                className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-3 text-cyan-300 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
              <KeyRound className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-gray-400">PASSWORD / AUTH TOKEN</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
              <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 text-black font-black text-xs uppercase py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:opacity-95 flex items-center justify-center space-x-2"
          >
            <span>SIGN IN</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#1E2D4A] text-[10px] font-mono text-gray-500">
          SAHYOG v2.4 COMPLIANT MULTI-AGENCY INTEROP
        </div>
      </div>
    </div>
  );
}
