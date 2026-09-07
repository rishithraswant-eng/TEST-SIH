"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import { ShieldCheck, Lock, CheckCircle2, AlertTriangle, ArrowRight, FileCheck2 } from 'lucide-react';

export default function SupervisorApprovalPage() {
  const { caseData, authorityRecord, supervisorStatus, signAndDispatch } = useInvestigationStore();

  const [confirmStep, setConfirmStep] = useState(1);
  const [typedName, setTypedName] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  const handleStepNext = () => {
    if (confirmStep === 3 && typedName !== "INSPECTOR A. SHARMA") {
      alert("Typed name must exactly match officer signature: INSPECTOR A. SHARMA");
      return;
    }
    if (confirmStep < 5) {
      setConfirmStep(confirmStep + 1);
    } else {
      setIsSigning(true);
      setTimeout(() => {
        setIsSigning(false);
        signAndDispatch();
      }, 1200);
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="bg-[#111A2E] border border-cyan-500/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center font-mono">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <h1 className="text-xl font-black text-white">SUPERVISOR SIGN-OFF & DISPATCH AUTHORIZATION</h1>
            </div>
            <p className="text-xs text-gray-400">
              Case Ref: <strong className="text-amber-400">{caseData.caseId}</strong> | Final Statutory Approval
            </p>
          </div>

          <span className={`mt-4 md:mt-0 px-3 py-1 rounded text-xs font-mono font-bold ${
            supervisorStatus === 'SIGNED_DISPATCHED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
          }`}>
            STATUS: {supervisorStatus}
          </span>
        </div>

        {/* 5-STEP SIGNING CONFIRMATION FLOW */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-6 font-mono text-xs">
          
          {/* Progress Indicator */}
          <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
            {['1. Review', '2. Re-Auth', '3. Type Name', '4. Recipient', '5. Dispatch'].map((lbl, idx) => (
              <div
                key={idx}
                className={`py-1.5 rounded border ${
                  confirmStep === idx + 1 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold' : confirmStep > idx + 1 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-[#0A0F1D] border-gray-800 text-gray-500'
                }`}
              >
                {lbl}
              </div>
            ))}
          </div>

          {/* STEP 1: REVIEW SUMMARY */}
          {confirmStep === 1 && (
            <div className="space-y-4 bg-[#0A0F1D] p-5 rounded-xl border border-gray-800">
              <span className="text-amber-400 font-bold block">STEP 1: REVIEW BASIS FOR DISPATCH</span>
              <div className="grid grid-cols-2 gap-2 text-gray-300">
                <div>Case Reference: <strong className="text-white">{caseData.caseId}</strong></div>
                <div>Trace Value: <strong className="text-amber-400">{caseData.traceValue}</strong></div>
                <div>Legal Mandate: <strong className="text-white">{authorityRecord.statuteRef}</strong></div>
                <div>Target VASP: <strong className="text-cyan-400">{caseData.nearestVasp.name} ({caseData.nearestVasp.confidence}%)</strong></div>
                <div>Inclusion Proofs: <strong className="text-emerald-400">4 / 4 Verified</strong></div>
                <div>Analyst Review: <strong className="text-emerald-400">ACCEPTED BY AN. SHARMA</strong></div>
              </div>
            </div>
          )}

          {/* STEP 2: RE-AUTH */}
          {confirmStep === 2 && (
            <div className="space-y-3 bg-[#0A0F1D] p-5 rounded-xl border border-gray-800">
              <span className="text-amber-400 font-bold block">STEP 2: SUPERVISOR MOCK RE-AUTHENTICATION</span>
              <p className="text-gray-300 font-sans text-xs">Enter hardware security token / secondary supervisor passcode:</p>
              <input
                type="password"
                value="••••••••••••"
                readOnly
                className="w-full bg-[#111A2E] border border-cyan-400/40 rounded-xl p-3 text-cyan-300"
              />
            </div>
          )}

          {/* STEP 3: TYPED-NAME CONFIRMATION */}
          {confirmStep === 3 && (
            <div className="space-y-3 bg-[#0A0F1D] p-5 rounded-xl border border-gray-800">
              <span className="text-amber-400 font-bold block">STEP 3: TYPED-NAME SIGNATURE CONFIRMATION</span>
              <p className="text-gray-300 font-sans text-xs">Type your full legal signature to confirm dispatch authorization:</p>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Type 'INSPECTOR A. SHARMA' exactly..."
                className="w-full bg-[#111A2E] border border-cyan-400 rounded-xl p-3 text-white font-bold"
              />
              <span className="text-[10px] text-gray-500">Required string: INSPECTOR A. SHARMA</span>
            </div>
          )}

          {/* STEP 4: FINAL RECIPIENT */}
          {confirmStep === 4 && (
            <div className="space-y-3 bg-[#0A0F1D] p-5 rounded-xl border border-gray-800">
              <span className="text-amber-400 font-bold block">STEP 4: CONFIRM DISPATCH RECIPIENT</span>
              <div className="text-gray-300 space-y-1">
                <div>Recipient: <strong className="text-cyan-400">VASP X Compliance Nodal Portal</strong></div>
                <div>Legal Instrument: <strong className="text-amber-300">Section 91 BNSS Formal Notice</strong></div>
                <div>Network Protocol: <strong className="text-emerald-400">SAHYOG Automated Interop Dispatch v2.4</strong></div>
              </div>
            </div>
          )}

          {/* STEP 5: FINAL DISPATCH */}
          {confirmStep === 5 && (
            <div className="space-y-3 bg-[#0A0F1D] p-5 rounded-xl border border-emerald-500/30 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <span className="text-emerald-400 font-bold text-sm block">READY TO SIGN AND DISPATCH LEGAL NOTICE</span>
              <p className="text-gray-300 font-sans text-xs">This action will record an immutable entry in the system audit log.</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-between items-center pt-2">
            <Link
              href={`/dossiers/PH-${caseData.caseId}`}
              className="text-cyan-400 hover:underline flex items-center"
            >
              <FileCheck2 className="w-4 h-4 mr-1" /> View Full Dossier
            </Link>

            <button
              onClick={handleStepNext}
              disabled={isSigning || supervisorStatus === 'SIGNED_DISPATCHED'}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 hover:opacity-90 disabled:opacity-50 text-black font-extrabold text-xs px-6 py-3 rounded-xl flex items-center space-x-2 shadow-[0_0_15px_rgba(255,179,0,0.3)]"
            >
              <span>{confirmStep === 5 ? 'EXECUTE SIGN AND DISPATCH' : 'CONTINUE TO NEXT STEP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </AppShell>
  );
}
