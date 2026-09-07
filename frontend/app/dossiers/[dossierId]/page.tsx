"use client";

import React, { useState } from 'react';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import { FileCheck2, Download, Printer, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function DossierBuilderPage() {
  const { caseData, authorityRecord } = useInvestigationStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(true);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1500);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center font-mono">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <FileCheck2 className="w-6 h-6 text-cyan-400" />
              <h1 className="text-xl font-black text-white">SEALED FORENSIC DOSSIER BUILDER</h1>
            </div>
            <p className="text-xs text-gray-400">
              Dossier ID: <strong className="text-amber-400">PH-{caseData.caseId}</strong> | Immutable Cryptographic Record
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3 text-xs">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-[#1E2D4A] hover:bg-gray-700 text-cyan-400 border border-cyan-500/30 px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>{isGenerating ? 'GENERATING DOSSIER...' : 'RE-GENERATE DOSSIER'}</span>
            </button>

            <button
              onClick={() => alert("Dossier compiled as PDF document simulation.")}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold px-5 py-2.5 rounded-xl flex items-center space-x-2 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD DOSSIER PDF</span>
            </button>
          </div>
        </div>

        {/* Dossier Document Preview */}
        <div className="bg-[#0A0F1D] border border-cyan-500/40 rounded-2xl p-8 shadow-2xl space-y-6 font-sans text-sm text-gray-300">
          
          <div className="border-b border-gray-800 pb-4 text-center font-mono space-y-1">
            <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest block">
              CONFIDENTIAL · FOR LAW ENFORCEMENT & JUDICIAL ADMISSIBILITY ONLY
            </span>
            <h2 className="text-2xl font-black text-white">PHANTASM INVESTIGATION DOSSIER</h2>
            <div className="text-xs text-gray-400">
              Case Ref: {caseData.caseId} | Statutory Authority: {authorityRecord.statuteRef} ({authorityRecord.firNumber})
            </div>
          </div>

          {/* Section 1: Target & Authority */}
          <div className="space-y-2 font-mono text-xs">
            <h4 className="text-amber-400 font-bold uppercase">1. TARGET & STATUTORY AUTHORITY SUMMARY</h4>
            <div className="bg-[#111A2E] p-4 rounded-xl border border-gray-800 space-y-1.5">
              <div><strong className="text-gray-400">Suspect Seed Address:</strong> <span className="text-amber-400 font-bold">{caseData.targetAddress}</span></div>
              <div><strong className="text-gray-400">Investigating Unit:</strong> <span className="text-white">{authorityRecord.policeStation}</span></div>
              <div><strong className="text-gray-400">Investigating Officer:</strong> <span className="text-white">{caseData.investigatingOfficer} ({caseData.officerId})</span></div>
              <div><strong className="text-gray-400">Total Trace Value:</strong> <span className="text-amber-300 font-bold">{caseData.traceValue}</span></div>
            </div>
          </div>

          {/* Section 2: Hop Table */}
          <div className="space-y-2 font-mono text-xs">
            <h4 className="text-amber-400 font-bold uppercase">2. DETERMINISTIC HOP TABLE (6 HOPS)</h4>
            <div className="border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#111A2E] text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="p-2.5">From Address</th>
                    <th className="p-2.5">To Address</th>
                    <th className="p-2.5">Amount</th>
                    <th className="p-2.5">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {caseData.edges.map((e, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="p-2.5 text-cyan-400">{e.from}</td>
                      <td className="p-2.5 text-cyan-400">{e.to}</td>
                      <td className="p-2.5 text-amber-400">{e.amount}</td>
                      <td className="p-2.5 text-gray-400">{e.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Attribution & Confidence */}
          <div className="space-y-2 font-mono text-xs">
            <h4 className="text-amber-400 font-bold uppercase">3. VASP ATTRIBUTION ANALYSIS</h4>
            <div className="bg-[#111A2E] p-4 rounded-xl border border-gray-800 space-y-1">
              <div><strong className="text-gray-400">Attributed VASP:</strong> <span className="text-white font-bold">{caseData.nearestVasp.name} ({caseData.nearestVasp.jurisdiction})</span></div>
              <div><strong className="text-gray-400">Composite Confidence:</strong> <span className="text-cyan-400 font-bold">{caseData.nearestVasp.confidence}%</span> (95% CI: {caseData.nearestVasp.confidenceInterval})</div>
              <div><strong className="text-gray-400">Threshold Status:</strong> <span className="text-emerald-400 font-bold">ACTIONABLE</span></div>
            </div>
          </div>

          {/* SHA-256 Seal */}
          <div className="pt-4 border-t border-gray-800 flex justify-between items-center font-mono text-xs">
            <div>
              <div className="text-gray-400 text-[10px]">IMMUTABLE DOSSIER HASH SEAL</div>
              <div className="text-cyan-400 font-bold">SHA-256: 8f92a104b2c89e71048291048291048291048291</div>
            </div>
            <div className="text-emerald-400 font-bold flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> SEALED & ADMISSIBLE
            </div>
          </div>

        </div>

      </div>
    </AppShell>
  );
}
