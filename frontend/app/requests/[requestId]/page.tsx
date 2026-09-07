"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import { Building2, Send, Save, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function DisclosureRequestPage() {
  const router = useRouter();
  const { caseData, disclosureForm, updateDisclosureForm } = useInvestigationStore();

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const handleSaveDraft = () => {
    setSavedStatus("Draft saved successfully.");
    setTimeout(() => setSavedStatus(null), 2000);
  };

  const handleSendForApproval = () => {
    router.push(`/approval/${caseData.caseId}`);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center font-mono">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <Building2 className="w-6 h-6 text-amber-400" />
              <h1 className="text-xl font-black text-white">SAHYOG DISCLOSURE REQUEST (SECTION 91 BNSS)</h1>
            </div>
            <p className="text-xs text-gray-400">
              Request ID: <strong className="text-amber-400">REQ-{caseData.caseId}</strong> | SAHYOG Onboarded Entity
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3 text-xs">
            <button
              onClick={handleSaveDraft}
              className="bg-[#1E2D4A] hover:bg-gray-700 text-gray-200 border border-gray-700 px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>SAVE DRAFT</span>
            </button>

            <button
              onClick={handleSendForApproval}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:opacity-90 text-black font-extrabold px-5 py-2.5 rounded-xl flex items-center space-x-2 shadow-[0_0_15px_rgba(255,179,0,0.3)]"
            >
              <Send className="w-4 h-4" />
              <span>SEND FOR APPROVAL</span>
            </button>
          </div>
        </div>

        {savedStatus && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs font-mono text-emerald-400 text-center">
            {savedStatus}
          </div>
        )}

        {/* Scope Check Compliance Box */}
        <div className="bg-[#111A2E] border border-cyan-500/30 rounded-2xl p-5 shadow-xl space-y-2 font-mono text-xs">
          <span className="text-cyan-400 font-bold uppercase block">AUTOMATED SCOPE CHECK</span>
          <div className="space-y-1">
            <div className="text-emerald-400 flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Time window bounded to suspect transaction interval (2026-09-06)</div>
            <div className="text-emerald-400 flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Address limited to terminal custodial deposit cluster</div>
            <div className="text-amber-400 flex items-center"><AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> Full historical account activity request excluded to preserve statutory proportionality</div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-5 font-mono text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-gray-400">Target Recipient VASP</label>
                <span className="text-[10px] text-cyan-400 font-bold">[AUTO]</span>
              </div>
              <input
                type="text"
                value={disclosureForm.vaspName}
                onChange={(e) => updateDisclosureForm({ vaspName: e.target.value })}
                className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-amber-400 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-gray-400">Statutory Legal Basis</label>
                <span className="text-[10px] text-cyan-400 font-bold">[AUTO]</span>
              </div>
              <input
                type="text"
                value={disclosureForm.statuteRef}
                onChange={(e) => updateDisclosureForm({ statuteRef: e.target.value })}
                className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-gray-200"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <div className="flex justify-between">
                <label className="text-gray-400">Target Deposit Wallet Address</label>
                <span className="text-[10px] text-cyan-400 font-bold">[AUTO]</span>
              </div>
              <input
                type="text"
                value={disclosureForm.targetAddress}
                onChange={(e) => updateDisclosureForm({ targetAddress: e.target.value })}
                className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-amber-300 font-bold"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1E2D4A]">
            <span className="text-gray-400 font-bold block">REQUESTED DISCLOSURE FIELDS (SECTION 91 BNSS)</span>
            <div className="space-y-2">
              {disclosureForm.requestFields.map((field, idx) => (
                <div key={idx} className="bg-[#0A0F1D] p-3 rounded-xl border border-gray-800 flex justify-between items-center text-gray-200">
                  <span>{field}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">[AUTO-POPULATED]</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E2D4A] flex justify-end">
            <button
              onClick={handleSendForApproval}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold px-6 py-3 rounded-xl flex items-center space-x-2 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              <span>FORWARD TO SUPERVISOR QUEUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </AppShell>
  );
}
