"use client";

import React from 'react';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import { HelpCircle, CheckCircle2, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

export default function ConfidenceExplainerPage() {
  const { caseData } = useInvestigationStore();

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[#1E2D4A] pb-4">
          <h1 className="text-2xl font-black text-white">CONFIDENCE & STATISTICAL EXPLAINER</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Transparent probabilistic attribution modeling and evidentiary credibility interval breakdown.
          </p>
        </div>

        {/* Primary Metric Banner */}
        <div className="bg-[#111A2E] border border-cyan-500/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-1">
            <span className="text-xs font-mono text-gray-400">POINT ESTIMATE SCORE</span>
            <div className="text-4xl font-black text-cyan-400 font-mono">91.3%</div>
            <div className="text-xs font-mono text-emerald-400">STATUS: ACTIONABLE (Exceeds 75% Action Threshold)</div>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs space-y-1 text-right">
            <div><strong className="text-gray-400">95% Credible Interval:</strong> <span className="text-white font-bold">87.1% – 94.0%</span></div>
            <div><strong className="text-gray-400">Action Threshold:</strong> <span className="text-amber-400 font-bold">75.0%</span></div>
            <div><strong className="text-gray-400">Attributed Touchpoint:</strong> <span className="text-cyan-400 font-bold">VASP X (Custodial)</span></div>
          </div>
        </div>

        {/* Score Drivers */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-amber-400 uppercase">WHAT DRIVES THIS SCORE</h3>
          
          <div className="space-y-3">
            {caseData.attributionBreakdown.map((item, idx) => (
              <div key={idx} className="bg-[#0A0F1D] border border-gray-800 p-4 rounded-xl space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-white">{item.factor}</span>
                  <span className="text-cyan-400">+{item.weight}% Weight</span>
                </div>
                <p className="text-gray-400 font-sans text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Uncertainty & Limitations */}
        <div className="bg-[#111A2E] border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold text-amber-400 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" /> WHAT COULD BE WRONG (LIMITATIONS & UNCERTAINTY)
          </h3>
          
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300 font-sans">
            <li>The classifier has lower reliability on sparse-history wallets with fewer than 5 lifetime transactions.</li>
            <li>The DeBridge cross-chain correlation contributes marginal timing variance due to block time asymmetry between Ethereum and Bitcoin networks.</li>
            <li><strong>LEGAL BOUNDARY:</strong> This attribution identifies a custodial financial service (VASP X), NOT a natural person or criminal owner.</li>
          </ul>
        </div>

      </div>
    </AppShell>
  );
}
