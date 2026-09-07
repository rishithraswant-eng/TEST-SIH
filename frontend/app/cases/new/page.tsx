"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/app/components/layout/AppShell';
import { useInvestigationStore } from '@/app/lib/store';

import {
  ShieldCheck,
  Search,
  Link2,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Building2,
  Sparkles
} from 'lucide-react';

export default function NewCasePage() {
  const router = useRouter();
  const { setAuthorityRecord } = useInvestigationStore();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Case Details
  const [caseDetails, setCaseDetails] = useState({
    caseRef: "IND-28491",
    caseType: "Cyber Financial Fraud",
    description: "Fraudulent diversion of victim funds into unclassified cryptocurrency wallets.",
    jurisdiction: "Cyber Crime Cell, Delhi Police",
    priority: "HIGH",
  });

  // Step 2: Lawful Authority
  const [authority, setAuthority] = useState({
    statuteRef: "Section 94 BNSS",
    firNumber: "FIR-2026/08/891",
    policeStation: "Cyber Crime Unit, Special Cell, Delhi",
    ioDesignation: "Inspector A. Sharma",
    authorityType: "FIR",
  });
  const [isAuthorityRecorded, setIsAuthorityRecorded] = useState(false);

  // Step 3: Seed Address Validation
  const [seedAddress, setSeedAddress] = useState("0xA827F391bc4428e9B712A5d081190412347F3");
  const [validationState, setValidationState] = useState<'IDLE' | 'VALID' | 'INVALID' | 'AMBIGUOUS'>('IDLE');
  const [detectedChain, setDetectedChain] = useState("Ethereum (ERC-20)");

  const handleRecordAuthority = () => {
    if (!authority.statuteRef || !authority.firNumber) return;
    setAuthorityRecord(authority);
    setIsAuthorityRecorded(true);
  };

  const handleValidateAddress = () => {
    if (!seedAddress) return;
    if (seedAddress.startsWith("0x") && seedAddress.length === 42) {
      setValidationState('VALID');
      setDetectedChain("Ethereum (ERC-20)");
    } else if (seedAddress.startsWith("1") || seedAddress.startsWith("3") || seedAddress.startsWith("bc1")) {
      setValidationState('VALID');
      setDetectedChain("Bitcoin (UTXO)");
    } else {
      setValidationState('AMBIGUOUS');
    }
  };

  const handleCreateCase = () => {
    router.push(`/cases/${caseDetails.caseRef}/overview`);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#1E2D4A] pb-4">
          <h1 className="text-2xl font-black text-white">MULTI-STEP CASE INITIALIZATION WIZARD</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Establish lawful statutory authority and seed suspect target addresses.
          </p>
        </div>

        {/* Step Navigation Dots */}
        <div className="grid grid-cols-3 gap-4 font-mono text-xs">
          <div className={`p-3 rounded-xl border flex items-center space-x-2 ${currentStep === 1 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 font-bold' : 'bg-[#111A2E] border-[#1E2D4A] text-gray-400'}`}>
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">1</span>
            <span>Case Details</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center space-x-2 ${currentStep === 2 ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold' : 'bg-[#111A2E] border-[#1E2D4A] text-gray-400'}`}>
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">2</span>
            <span>Lawful Authority Gate</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center space-x-2 ${currentStep === 3 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold' : 'bg-[#111A2E] border-[#1E2D4A] text-gray-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">3</span>
            <span>Seed Validation</span>
          </div>
        </div>

        {/* STEP 1: CASE DETAILS */}
        {currentStep === 1 && (
          <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-sm font-bold font-mono text-cyan-400">STEP 1 — CASE METADATA & INCIDENT TYPE</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-400">Case Reference</label>
                <input
                  type="text"
                  value={caseDetails.caseRef}
                  onChange={(e) => setCaseDetails({ ...caseDetails, caseRef: e.target.value })}
                  className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-amber-400 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400">Case Type</label>
                <select
                  value={caseDetails.caseType}
                  onChange={(e) => setCaseDetails({ ...caseDetails, caseType: e.target.value })}
                  className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-3 py-2.5 text-gray-200"
                >
                  <option value="Cyber Financial Fraud">Cyber Financial Fraud</option>
                  <option value="Ransomware Extortion">Ransomware Extortion</option>
                  <option value="Illegal Drug Trafficking">Illegal Drug Trafficking</option>
                  <option value="Money Laundering / Structuring">Money Laundering / Structuring</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-gray-400">Incident Description</label>
                <textarea
                  value={caseDetails.description}
                  onChange={(e) => setCaseDetails({ ...caseDetails, description: e.target.value })}
                  className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl p-3 text-gray-200 h-20"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs font-mono px-6 py-3 rounded-xl flex items-center space-x-2 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              >
                <span>Proceed to Authority Gate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LAWFUL AUTHORITY GATE */}
        {currentStep === 2 && (
          <div className="bg-[#111A2E] border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#1E2D4A] pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h2 className="text-sm font-bold font-mono text-amber-400">STEP 2 — STATUTORY AUTHORITY GATE</h2>
              </div>
              {isAuthorityRecorded && (
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded text-xs font-mono font-bold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> AUTHORITY RECORDED
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-400">Statutory Reference</label>
                <select
                  value={authority.statuteRef}
                  onChange={(e) => setAuthority({ ...authority, statuteRef: e.target.value })}
                  className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-3 py-2.5 text-gray-200"
                >
                  <option value="Section 94 BNSS">Section 94 BNSS (Mandatory Document Production)</option>
                  <option value="Section 79(3)(b) IT Act">Section 79(3)(b) IT Act</option>
                  <option value="Section 102 BNSS">Section 102 BNSS (Property Seizure)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400">FIR / NCRP / DD Number</label>
                <input
                  type="text"
                  value={authority.firNumber}
                  onChange={(e) => setAuthority({ ...authority, firNumber: e.target.value })}
                  className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-amber-400 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400">Police Station / Unit</label>
                <input
                  type="text"
                  value={authority.policeStation}
                  onChange={(e) => setAuthority({ ...authority, policeStation: e.target.value })}
                  className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-gray-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400">IO Designation & ID</label>
                <input
                  type="text"
                  value={authority.ioDesignation}
                  onChange={(e) => setAuthority({ ...authority, ioDesignation: e.target.value })}
                  className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-gray-200"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleRecordAuthority}
                className="bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs font-mono px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(255,179,0,0.3)]"
              >
                RECORD STATUTORY MANDATE
              </button>

              <button
                disabled={!isAuthorityRecorded}
                onClick={() => setCurrentStep(3)}
                className="bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-extrabold text-xs font-mono px-6 py-3 rounded-xl flex items-center space-x-2 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              >
                <span>Proceed to Seed Validation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SEED ADDRESS VALIDATION */}
        {currentStep === 3 && (
          <div className="bg-[#111A2E] border border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-sm font-bold font-mono text-emerald-400">STEP 3 — SEED ADDRESS VALIDATION & DISAMBIGUATION</h2>

            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-400">Suspect Seed Address</label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={seedAddress}
                    onChange={(e) => {
                      setSeedAddress(e.target.value);
                      setValidationState('IDLE');
                    }}
                    className="flex-1 bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-3 text-cyan-300 font-mono text-sm"
                  />
                  <button
                    onClick={handleValidateAddress}
                    className="bg-[#1E2D4A] hover:bg-gray-700 text-cyan-400 border border-cyan-500/30 px-5 py-3 rounded-xl font-bold"
                  >
                    VALIDATE ADDRESS
                  </button>
                </div>
              </div>

              {/* Validation Result Box */}
              {validationState === 'VALID' && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl space-y-1">
                  <div className="text-emerald-400 font-bold flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> VALID SEED ADDRESS
                  </div>
                  <div className="text-gray-300 text-xs">
                    Auto-detected Chain: <strong className="text-cyan-400">{detectedChain}</strong>
                  </div>
                </div>
              )}

              {validationState === 'AMBIGUOUS' && (
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl space-y-2">
                  <div className="text-amber-400 font-bold flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" /> CHAIN DISAMBIGUATION REQUIRED
                  </div>
                  <p className="text-gray-300 text-xs">Address format matched multiple chains. Select target network:</p>
                  <div className="flex space-x-3 pt-1">
                    <button onClick={() => { setDetectedChain("Ethereum (ERC-20)"); setValidationState('VALID'); }} className="px-3 py-1.5 bg-[#1E2D4A] text-cyan-400 rounded border border-cyan-500/30 font-bold">Ethereum (ERC-20)</button>
                    <button onClick={() => { setDetectedChain("Polygon"); setValidationState('VALID'); }} className="px-3 py-1.5 bg-[#1E2D4A] text-cyan-400 rounded border border-cyan-500/30 font-bold">Polygon</button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-[#1E2D4A]">
              <button
                disabled={validationState !== 'VALID'}
                onClick={handleCreateCase}
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 disabled:opacity-50 text-black font-extrabold text-sm font-mono px-8 py-3.5 rounded-xl flex items-center space-x-2 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              >
                <span>CREATE CASE & LAUNCH WORKSPACE</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
