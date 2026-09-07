"use client";

import React from 'react';
import { X, ShieldAlert, Lock, AlertTriangle } from 'lucide-react';
import { DEMO_CASE_DATA } from '@/app/lib/mockData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreezeNoticeModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111A2E] border border-red-500/40 rounded-2xl w-full max-w-2xl flex flex-col shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-500/30 bg-[#0A0F1D] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />
            <h3 className="text-base font-bold text-gray-100">EMERGENCY WALLET FREEZE ORDER</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 font-sans space-y-6 text-sm text-gray-300">
          <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center space-x-3 text-xs text-red-300">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>
              <strong>URGENT FREEZE ACTION:</strong> Directs VASP X to place immediate administrative hold on proceeds of crime (0.1125 BTC / ₹8,40,000 equivalent) under Sec 102 BNSS.
            </span>
          </div>

          <div className="bg-[#0A0F1D] p-5 rounded-xl border border-gray-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Target VASP Node:</span>
              <span className="text-cyan-400 font-bold">VASP X Custodial Deposit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Target Deposit Address:</span>
              <span className="text-amber-400">bc1qvaspxcustodial9928374829104829</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Encumbered Value:</span>
              <span className="text-red-400 font-bold">₹8,40,000 (0.1125 BTC)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Attribution Score:</span>
              <span className="text-cyan-400 font-bold">91% Confidence</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-[#1E2D4A] bg-[#0A0F1D] flex justify-end space-x-3">
          <button
            onClick={() => {
              alert("Emergency Freeze Directive transmitted to VASP X Risk & Compliance API.");
              onClose();
            }}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold font-mono flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)]"
          >
            <Lock className="w-4 h-4" />
            <span>TRANSMIT EMERGENCY FREEZE ORDER</span>
          </button>
        </div>
      </div>
    </div>
  );
}
