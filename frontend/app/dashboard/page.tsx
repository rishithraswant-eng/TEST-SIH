"use client";

import React from 'react';
import Link from 'next/link';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import {
  Activity,
  FolderPlus,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileText,
  Clock,
  ShieldAlert,
  Search,
  ExternalLink,
  Layers,
  Network
} from 'lucide-react';

export default function DashboardPage() {
  const { caseData, auditEvents } = useInvestigationStore();

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Top Header Banner */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-2xl font-black text-gray-100">OPERATIONAL CASE DASHBOARD</h1>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2.5 py-0.5 rounded text-xs font-mono font-bold">
                SYSTEM ONLINE
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">
              Active statutory mandate: Section 94 BNSS | FIR-2026/08/891
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link
              href="/cases/new"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 text-black font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center space-x-2"
            >
              <FolderPlus className="w-4 h-4" />
              <span>NEW INVESTIGATION</span>
            </Link>
          </div>
        </div>

        {/* 5 MAIN DASHBOARD CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 1. TIME-CRITICAL CASES */}
          <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-[#1E2D4A] pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-gray-100">TIME-CRITICAL CASES</h3>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">1 URGENT</span>
            </div>

            <Link
              href={`/cases/${caseData.caseId}/overview`}
              className="bg-[#0A0F1D] border border-amber-500/30 p-4 rounded-xl space-y-2 hover:border-amber-400 transition-colors block group"
            >
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-white">{caseData.caseId}</span>
                <span className="text-amber-400 font-bold">{caseData.traceValue}</span>
              </div>
              <p className="text-xs text-gray-400 font-mono truncate">
                Target: {caseData.targetAddress}
              </p>
              <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 pt-1">
                <span>VASP X Identified (91.3%)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/cases/new"
              className="text-xs text-cyan-400 hover:underline font-mono text-center block pt-2"
            >
              + Initialize Additional Case
            </Link>
          </div>

          {/* 2. RECENT TRACES */}
          <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-[#1E2D4A] pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-gray-100">RECENT TRACES</h3>
              </div>
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">RUNNING</span>
            </div>

            <Link
              href={`/cases/${caseData.caseId}/traces/${caseData.caseId}-trace-1`}
              className="bg-[#0A0F1D] border border-cyan-500/30 p-4 rounded-xl space-y-2 hover:border-cyan-400 transition-colors block group"
            >
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-white">TRACE #{caseData.caseId}-1</span>
                <span className="text-emerald-400 font-bold">COMPLETED</span>
              </div>
              <div className="text-[11px] text-gray-400 font-mono">
                6 Hops • 2 Chains (ETH/BTC)
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 pt-1">
                <span>View State Machine Log</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href={`/cases/${caseData.caseId}/traces/${caseData.caseId}-trace-1/graph`}
              className="text-xs text-cyan-400 hover:underline font-mono text-center block pt-2"
            >
              Open Interactive Graph View →
            </Link>
          </div>

          {/* 3. ATTRIBUTION ACTIVITY */}
          <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-[#1E2D4A] pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-gray-100">ATTRIBUTION ACTIVITY</h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">HIGH CONFIDENCE</span>
            </div>

            <Link
              href="/confidence"
              className="bg-[#0A0F1D] border border-cyan-500/30 p-4 rounded-xl space-y-2 hover:border-cyan-400 transition-colors block group"
            >
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-white">VASP X Custodial</span>
                <span className="text-cyan-400 font-bold">91.3% Score</span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">
                95% CI: 87.1% – 94.0% (Actionable)
              </p>
              <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 pt-1">
                <span>Explain Confidence Factors</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/paths"
              className="text-xs text-cyan-400 hover:underline font-mono text-center block pt-2"
            >
              Compare All Candidate Paths →
            </Link>
          </div>

          {/* 4. EVIDENCE STATUS */}
          <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-[#1E2D4A] pb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-gray-100">EVIDENCE STATUS</h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">4/4 VERIFIED</span>
            </div>

            <Link
              href="/evidence"
              className="bg-[#0A0F1D] border border-emerald-500/30 p-4 rounded-xl space-y-2 hover:border-emerald-400 transition-colors block group"
            >
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-emerald-400">Merkle Inclusion Proofs</span>
                <span className="text-gray-400">100% Valid</span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">
                4 of 4 transactions cryptographically verified on-chain.
              </p>
              <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 pt-1">
                <span>Inspect Evidence Proofs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href={`/dossiers/PH-${caseData.caseId}`}
              className="text-xs text-cyan-400 hover:underline font-mono text-center block pt-2"
            >
              Build Sealed Forensic Dossier →
            </Link>
          </div>

          {/* 5. VASP REQUESTS */}
          <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div className="flex justify-between items-center border-b border-[#1E2D4A] pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-gray-100">VASP DISCLOSURE & LEGAL REQUESTS</h3>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">SEC 94 BNSS READY</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={`/requests/REQ-${caseData.caseId}`}
                className="bg-[#0A0F1D] border border-amber-500/30 p-4 rounded-xl space-y-2 hover:border-amber-400 transition-colors block group"
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white">Section 91 BNSS Notice</span>
                  <span className="text-amber-400 font-bold">[AUTO]</span>
                </div>
                <p className="text-[11px] text-gray-400 font-mono">
                  Recipient: VASP X (FIU-IND Registered)
                </p>
                <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 pt-1">
                  <span>Prepare Disclosure Request</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href={`/approval/${caseData.caseId}`}
                className="bg-[#0A0F1D] border border-cyan-500/30 p-4 rounded-xl space-y-2 hover:border-cyan-400 transition-colors block group"
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white">Supervisor Sign-off</span>
                  <span className="text-cyan-400 font-bold">5-Step Flow</span>
                </div>
                <p className="text-[11px] text-gray-400 font-mono">
                  Review & dispatch authorization.
                </p>
                <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 pt-1">
                  <span>Open Supervisor Queue</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

        </div>

        {/* AUDIT EVENT STREAM */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#1E2D4A] pb-3">
            <h3 className="text-sm font-bold text-gray-100 font-mono">SYSTEM AUDIT STREAM</h3>
            <Link href="/audit" className="text-xs text-cyan-400 hover:underline font-mono">
              View Full Audit Timeline →
            </Link>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {auditEvents.slice(0, 4).map((evt) => (
              <div key={evt.id} className="bg-[#0A0F1D] border border-gray-800 p-3 rounded-lg flex justify-between items-center">
                <div className="space-x-3">
                  <span className="text-gray-500">{evt.timestamp}</span>
                  <span className="text-amber-400 font-bold">[{evt.action}]</span>
                  <span className="text-gray-200">{evt.details}</span>
                </div>
                <span className="text-cyan-400 text-[10px]">{evt.actor}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
