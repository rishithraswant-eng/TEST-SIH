"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import {
  FileText,
  CheckCircle2,
  Play,
  History,
  ShieldCheck,
  Building2,
  ArrowRight,
  Activity
} from 'lucide-react';

export default function CaseOverviewPage() {
  const router = useRouter();
  const { caseData, authorityRecord } = useInvestigationStore();

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Case Workspace Header */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-black text-gray-100">Case: {caseData.caseId}</h1>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono font-bold">
                {caseData.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono flex items-center">
              <FileText className="w-4 h-4 mr-1.5 text-cyan-400" />
              Statutory Mandate: <strong className="ml-1 text-gray-200">{authorityRecord.statuteRef} ({authorityRecord.firNumber})</strong>
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link
              href={`/cases/${caseData.caseId}/traces/new`}
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 hover:opacity-95 text-black font-extrabold text-xs uppercase px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center space-x-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>LAUNCH TRACE</span>
            </Link>
          </div>
        </div>

        {/* Case Overview Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-[#111A2E] border border-[#1E2D4A] p-4 rounded-xl space-y-1">
            <span className="text-gray-400 block text-[10px]">SEED TARGET ADDRESS</span>
            <span className="text-amber-400 font-bold break-all">{caseData.targetAddress}</span>
          </div>

          <div className="bg-[#111A2E] border border-[#1E2D4A] p-4 rounded-xl space-y-1">
            <span className="text-gray-400 block text-[10px]">TOTAL TRACE VALUE</span>
            <span className="text-amber-300 font-bold text-base">{caseData.traceValue}</span>
          </div>

          <div className="bg-[#111A2E] border border-[#1E2D4A] p-4 rounded-xl space-y-1">
            <span className="text-gray-400 block text-[10px]">INVESTIGATING OFFICER</span>
            <span className="text-white font-bold">{caseData.investigatingOfficer} ({caseData.officerId})</span>
          </div>

          <div className="bg-[#111A2E] border border-[#1E2D4A] p-4 rounded-xl space-y-1">
            <span className="text-gray-400 block text-[10px]">LAWFUL AUTHORIZATION</span>
            <span className="text-emerald-400 font-bold flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1" /> VERIFIED & SEALED
            </span>
          </div>
        </div>

        {/* Next Step Action Banner */}
        <div className="bg-gradient-to-r from-[#111A2E] via-[#0D1527] to-[#0A0F1D] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-1 mb-4 md:mb-0">
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              RECOMMENDED NEXT STEP
            </div>
            <h3 className="text-lg font-bold text-white">Execute Multi-Chain Graph Trace</h3>
            <p className="text-xs text-gray-400 font-mono">
              Fetch complete transaction history for seed address 0xA827... across 2 chains.
            </p>
          </div>

          <div className="flex space-x-3">
            <Link
              href={`/cases/${caseData.caseId}/traces/new`}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs font-mono px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center space-x-2"
            >
              <span>CONFIGURE & LAUNCH TRACE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
