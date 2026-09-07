"use client";

import React from 'react';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import { History, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AuditLogPage() {
  const { auditEvents } = useInvestigationStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="border-b border-[#1E2D4A] pb-4">
          <h1 className="text-2xl font-black text-white">SYSTEM AUDIT TIMELINE</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Immutable chronological audit stream recording all officer actions & statutory compliance operations.
          </p>
        </div>

        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <div className="space-y-3">
            {auditEvents.map((evt) => (
              <div key={evt.id} className="bg-[#0A0F1D] border border-gray-800 p-4 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">{evt.timestamp}</span>
                    <span className="bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded border border-cyan-500/30">
                      {evt.action}
                    </span>
                    <span className="text-amber-400 font-bold">CASE: {evt.caseId}</span>
                  </div>
                  <span className="text-gray-400 text-[11px]">{evt.actor}</span>
                </div>
                <p className="text-gray-300 font-sans text-xs pt-1">{evt.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
