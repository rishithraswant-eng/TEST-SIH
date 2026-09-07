"use client";

import React from 'react';
import { X, Building2, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { DEMO_CASE_DATA } from '@/app/lib/mockData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DisclosureNoticeModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1E2D4A] bg-[#0A0F1D] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-gray-100">FORMAL DISCLOSURE NOTICE (SECTION 91 BNSS)</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto font-sans space-y-6 text-sm text-gray-300">
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-300">
              <strong>STATUTORY LEGAL NOTICE:</strong> Directed to Compliance Officer, <strong>VASP X (Custodial Exchange)</strong> requesting immediate disclosure of KYC details & deposit account records under Section 91 BNSS (Section 91 CrPC equivalent).
            </div>
          </div>

          <div className="bg-[#0A0F1D] p-6 rounded-xl border border-gray-800 space-y-4 font-mono text-xs text-gray-300">
            <div><strong>TO:</strong> Designated Nodal Compliance Officer, VASP X</div>
            <div><strong>FROM:</strong> Cyber Crime Unit, Special Cell, New Delhi</div>
            <div><strong>REF:</strong> FIR-2026/08/891 | CASE ID: IND-28491</div>

            <div className="pt-2 border-t border-gray-800 leading-relaxed text-gray-300 font-sans">
              Take notice that an investigation into cyber fraud under Indian law is currently being conducted. In accordance with powers vested under Section 91 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), you are hereby directed to furnish within 24 hours:
            </div>

            <ul className="list-disc pl-5 space-y-1 text-cyan-300">
              <li>KYC / User Identity records associated with deposit wallet <span className="text-amber-400">bc1qvaspxcustodial9928374829104829104829</span>.</li>
              <li>Complete account transaction logs, IP access logs & linked bank payout accounts for deposit tx <span className="text-amber-400">7a8b9c0d1e2f3a...</span>.</li>
              <li>Freeze status confirmation for current account balance of <span className="text-amber-400">0.1125 BTC</span>.</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-[#1E2D4A] bg-[#0A0F1D] flex justify-between items-center">
          <span className="text-xs font-mono text-gray-400 flex items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" /> SAHYOG Automated Nodal Dispatch Ready
          </span>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                alert("Section 91 BNSS Disclosure Request dispatched to VASP X Nodal Officer!");
                onClose();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:opacity-90 text-black rounded-lg text-xs font-bold font-mono flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(255,179,0,0.3)]"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Notice via SAHYOG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
