"use client";

import React, { useState } from 'react';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import { Users, CheckCircle2, XCircle, AlertTriangle, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export default function AnalystReviewQueuePage() {
  const {
    caseData,
    reviewStatus,
    acceptAttribution,
    rejectAttribution,
  } = useInvestigationStore();

  const [hasOpenedEvidence, setHasOpenedEvidence] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleAccept = () => {
    if (!hasOpenedEvidence) {
      alert("Verification requirement: You must inspect the Evidence tab before accepting attribution.");
      return;
    }
    acceptAttribution();
  };

  const handleRejectSubmit = () => {
    if (!rejectReason) return;
    rejectAttribution(rejectReason);
    setShowRejectForm(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        
        <div className="border-b border-[#1E2D4A] pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-white font-mono">ANALYST REVIEW QUEUE</h1>
            <p className="text-xs text-gray-400 font-mono mt-1">
              Prioritized analyst verification queue sorted by review value (lower confidence + higher value).
            </p>
          </div>

          {reviewStatus !== 'PENDING' && (
            <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
              reviewStatus === 'ACCEPTED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'
            }`}>
              STATUS: {reviewStatus}
            </span>
          )}
        </div>

        {/* 40% / 60% Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT 40% LIST */}
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-gray-400 font-bold block border-b border-[#1E2D4A] pb-2">
              QUEUED CASES FOR REVIEW (1)
            </span>

            <div className="bg-[#111A2E] border border-cyan-500/40 rounded-2xl p-4 shadow-xl space-y-2 cursor-pointer hover:border-cyan-400 transition-colors">
              <div className="flex justify-between font-bold">
                <span className="text-white">{caseData.caseId}</span>
                <span className="text-amber-400">{caseData.traceValue}</span>
              </div>
              <div className="text-gray-400 text-[11px]">
                Target: {caseData.nearestVasp.name} ({caseData.nearestVasp.confidence}%)
              </div>
              <div className="flex space-x-1.5 pt-1">
                <span className="bg-amber-500/20 text-amber-300 text-[9px] px-1.5 py-0.5 rounded border border-amber-500/30">BRIDGE</span>
                <span className="bg-red-500/20 text-red-300 text-[9px] px-1.5 py-0.5 rounded border border-red-500/30">MIXER</span>
              </div>
            </div>
          </div>

          {/* RIGHT 60% DETAIL */}
          <div className="lg:col-span-3 bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-6 font-mono text-xs">
            <div className="border-b border-[#1E2D4A] pb-3 flex justify-between items-center">
              <span className="font-bold text-white text-sm">REVIEW DETAIL: CASE {caseData.caseId}</span>
              <button
                onClick={() => setHasOpenedEvidence(true)}
                className={`px-3 py-1 rounded text-[11px] font-bold border transition-all ${
                  hasOpenedEvidence ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-[#1E2D4A] text-cyan-400 border-cyan-500/30'
                }`}
              >
                {hasOpenedEvidence ? '✓ EVIDENCE INSPECTED' : 'INSPECT EVIDENCE TAB'}
              </button>
            </div>

            {/* Decomposition */}
            <div className="space-y-2 bg-[#0A0F1D] p-4 rounded-xl border border-gray-800">
              <span className="text-gray-400 font-bold block">CONFIDENCE DECOMPOSITION</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>Path Continuity: <span className="text-cyan-400">+40%</span></div>
                <div>Clustering Match: <span className="text-cyan-400">+25%</span></div>
                <div>Temporal Alignment: <span className="text-cyan-400">+15%</span></div>
                <div>Cross-Chain Link: <span className="text-cyan-400">+11%</span></div>
              </div>
            </div>

            {/* Analyst Review Actions */}
            <div className="pt-4 border-t border-[#1E2D4A] space-y-3">
              <div className="flex space-x-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold py-3 rounded-xl flex items-center justify-center space-x-1"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ACCEPT ATTRIBUTION</span>
                </button>

                <button
                  onClick={() => setShowRejectForm(true)}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold py-3 rounded-xl flex items-center justify-center space-x-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>REJECT ATTRIBUTION</span>
                </button>
              </div>

              {showRejectForm && (
                <div className="bg-[#0A0F1D] p-4 rounded-xl border border-red-500/30 space-y-3">
                  <label className="text-red-400 font-bold block">WRITTEN REJECTION REASON REQUIRED</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter written justification for rejecting attribution..."
                    className="w-full bg-[#111A2E] border border-gray-800 p-3 rounded-lg text-white font-sans text-xs h-20"
                  />
                  <div className="flex space-x-2">
                    <button onClick={handleRejectSubmit} className="bg-red-500 text-white font-bold px-4 py-1.5 rounded-lg">
                      Submit Rejection
                    </button>
                    <button onClick={() => setShowRejectForm(false)} className="bg-gray-800 text-gray-400 px-4 py-1.5 rounded-lg">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </AppShell>
  );
}
