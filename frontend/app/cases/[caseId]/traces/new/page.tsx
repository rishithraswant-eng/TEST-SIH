"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import { Play, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TraceConfigPage() {
  const router = useRouter();
  const { caseData, startTrace } = useInvestigationStore();

  const [depth, setDepth] = useState(6);
  const [timeWindow, setTimeWindow] = useState("Last 30 Days");
  const [crossChain, setCrossChain] = useState(true);

  const handleLaunch = () => {
    startTrace();
    router.push(`/cases/${caseData.caseId}/traces/${caseData.caseId}-trace-1`);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="border-b border-[#1E2D4A] pb-4">
          <h1 className="text-2xl font-black text-white">CONFIGURE GRAPH RESOLUTION TRACE</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Standard trace mode enabled by default. Set parameters for multi-chain graph traversal.
          </p>
        </div>

        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-gray-400">Target Seed Address</label>
              <input
                type="text"
                disabled
                value={caseData.targetAddress}
                className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-amber-400 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400">Trace Hop Depth</label>
              <select
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-3 py-2.5 text-gray-200"
              >
                <option value={4}>4 Hops</option>
                <option value={6}>6 Hops (Standard Recommended)</option>
                <option value={8}>8 Hops (Deep Traversal)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400">Time Bounded Window</label>
              <select
                value={timeWindow}
                onChange={(e) => setTimeWindow(e.target.value)}
                className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-3 py-2.5 text-gray-200"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days (Recommended)</option>
                <option value="All Time">All Time</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400">Cross-Chain DeBridge Traversal</label>
              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  checked={crossChain}
                  onChange={(e) => setCrossChain(e.target.checked)}
                  className="w-4 h-4 text-cyan-400 rounded"
                />
                <span className="text-cyan-300 font-bold">Enabled (ETH ↔ BTC)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E2D4A] flex justify-end">
            <button
              onClick={handleLaunch}
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 text-black font-extrabold text-sm uppercase px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center space-x-2"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>LAUNCH TRACE ENGINE</span>
            </button>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
