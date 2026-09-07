"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore, TraceStage } from '@/app/lib/store';

import {
  Activity,
  CheckCircle2,
  Pause,
  Play,
  ArrowRight,
  RefreshCw,
  Layers,
  Search,
  ShieldCheck,
  Lock
} from 'lucide-react';

export default function LiveTraceProgressPage() {
  const router = useRouter();
  const {
    caseData,
    traceStage,
    traceMetrics,
    pauseTrace,
    resumeTrace,
  } = useInvestigationStore();

  const stagesList: Array<{
    id: TraceStage;
    label: string;
    description: string;
    metrics: string;
  }> = [
    {
      id: 'INGEST',
      label: '1. INGEST',
      description: 'Multi-chain transaction data extraction across nodes.',
      metrics: `Transactions discovered: ${traceMetrics.txsDiscovered} | Sources: 2 | Cross-validated: 391`
    },
    {
      id: 'PRUNE',
      label: '2. PRUNE',
      description: 'Filtering low-relevance noise & peeling dust transactions.',
      metrics: `Edges examined: ${traceMetrics.txsDiscovered} | Edges retained: ${traceMetrics.edgesRetained} | Obfuscation candidates: 18`
    },
    {
      id: 'CLASSIFY',
      label: '3. CLASSIFY',
      description: 'Heuristic entity resolution & address clustering.',
      metrics: `Nodes classified: ${traceMetrics.nodesClassified} | Custodial candidates: 3 | Bridges: 1`
    },
    {
      id: 'SEARCH',
      label: '4. SEARCH',
      description: 'Multi-hop graph traversal to custodial endpoints.',
      metrics: `Paths evaluated: ${traceMetrics.pathsEvaluated} | Relevant paths: 4`
    },
    {
      id: 'SCORE',
      label: '5. SCORE',
      description: 'Mathematical path probability & confidence calculation.',
      metrics: `Candidate paths: 4 | Best path score: ${traceMetrics.bestPathScore}%`
    },
    {
      id: 'SEAL',
      label: '6. SEAL',
      description: 'Cryptographic Merkle inclusion proof sealing.',
      metrics: `Transactions cited: 4 | Proofs verified: ${traceMetrics.proofsVerified}`
    }
  ];

  const isCompleted = traceStage === 'COMPLETED';

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-xl font-black text-white font-mono">LIVE TRACE STATE ENGINE</h1>
              <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                isCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
              }`}>
                {isCompleted ? 'TRACE COMPLETED' : `STAGE: ${traceStage}`}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">
              Target Seed Address: <strong className="text-amber-400">{caseData.targetAddress}</strong>
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3 font-mono text-xs">
            {traceStage === 'PAUSED' ? (
              <button onClick={resumeTrace} className="px-4 py-2 bg-amber-400 text-black font-bold rounded-lg flex items-center space-x-2">
                <Play className="w-4 h-4 fill-current" />
                <span>Resume Trace</span>
              </button>
            ) : !isCompleted ? (
              <button onClick={pauseTrace} className="px-4 py-2 bg-[#1E2D4A] text-amber-400 rounded-lg border border-amber-500/30 flex items-center space-x-2">
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            ) : null}

            {isCompleted && (
              <button
                onClick={() => router.push(`/cases/${caseData.caseId}/traces/${caseData.caseId}-trace-1/graph`)}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center space-x-2"
              >
                <span>VIEW RESULTS & GRAPH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 6 STATE MACHINE STAGES STREAM */}
        <div className="space-y-4 font-mono text-xs">
          {stagesList.map((stg, idx) => {
            const isStageComplete = isCompleted || stagesList.findIndex(s => s.id === traceStage) > idx;
            const isStageActive = traceStage === stg.id;

            return (
              <div
                key={stg.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isStageComplete
                    ? 'bg-[#111A2E]/80 border-emerald-500/40 text-gray-200'
                    : isStageActive
                    ? 'bg-[#111A2E] border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.2)] text-white'
                    : 'bg-[#0A0F1D]/50 border-gray-800 text-gray-500'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    {isStageComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : isStageActive ? (
                      <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </div>
                    )}
                    <span className="font-bold text-sm">{stg.label}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    isStageComplete ? 'bg-emerald-500/20 text-emerald-300' : isStageActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {isStageComplete ? 'COMPLETE' : isStageActive ? 'RUNNING' : 'QUEUED'}
                  </span>
                </div>

                <p className="text-gray-400 text-xs font-sans mb-2 pl-8">{stg.description}</p>
                <div className="bg-[#0A0F1D] p-2.5 rounded-lg border border-gray-800 font-mono text-[11px] text-cyan-300 pl-8">
                  ► {stg.metrics}
                </div>
              </div>
            );
          })}
        </div>

        {/* View Graph Action */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={() => router.push(`/cases/${caseData.caseId}/traces/${caseData.caseId}-trace-1/graph`)}
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 text-black font-extrabold text-xs uppercase px-8 py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center space-x-2"
          >
            <span>PROCEED TO INTERACTIVE GRAPH</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </AppShell>
  );
}
