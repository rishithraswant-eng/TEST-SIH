"use client";

import React from 'react';
import Link from 'next/link';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import { Layers, ArrowRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export default function PathsPage() {
  const { caseData } = useInvestigationStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="border-b border-[#1E2D4A] pb-4">
          <h1 className="text-2xl font-black text-white">PATH COMPARISON MATRIX</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Comparative analysis of evaluated multi-hop pathways from seed address to terminal entities.
          </p>
        </div>

        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl font-mono text-xs overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0A0F1D] text-gray-400 border-b border-[#1E2D4A]">
              <tr>
                <th className="p-3">PATH</th>
                <th className="p-3">HOPS</th>
                <th className="p-3">TRACE VALUE</th>
                <th className="p-3">TERMINAL ENTITY</th>
                <th className="p-3">CONFIDENCE</th>
                <th className="p-3">95% CI</th>
                <th className="p-3">FLAGS</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {caseData.paths.map((p) => (
                <tr key={p.id} className="hover:bg-white/5">
                  <td className="p-3 text-cyan-400 font-bold">{p.name}</td>
                  <td className="p-3 text-gray-300">{p.hops} Hops</td>
                  <td className="p-3 text-amber-400 font-bold">{p.traceValue}</td>
                  <td className="p-3 text-white font-bold">{p.terminalEntity}</td>
                  <td className="p-3 text-emerald-400 font-bold">{p.confidence}%</td>
                  <td className="p-3 text-gray-400">{p.confidenceInterval}</td>
                  <td className="p-3">
                    <div className="flex space-x-1">
                      {p.flags.map((f, i) => (
                        <span key={i} className="bg-gray-800 text-gray-300 text-[10px] px-1.5 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.status === 'ACTIONABLE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/cases/${caseData.caseId}/traces/${caseData.caseId}-trace-1/graph`}
                      className="text-cyan-400 hover:underline flex items-center"
                    >
                      Focus <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
