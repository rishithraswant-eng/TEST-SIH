"use client";

import React from 'react';
import { X, HelpCircle, CheckCircle2, ShieldCheck, Activity, Layers, ArrowRight } from 'lucide-react';
import { DEMO_CASE_DATA } from '@/app/lib/mockData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExplainAttributionModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111A2E] border border-cyan-500/40 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,229,255,0.2)] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1E2D4A] bg-[#0A0F1D] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-gray-100">EXPLAINABLE VASP ATTRIBUTION MODEL</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto font-sans space-y-6 text-sm text-gray-300">
          <div className="bg-[#0A0F1D] border border-cyan-500/30 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-gray-400 block">TARGET VASP ENTITY</span>
              <span className="text-2xl font-bold text-white">VASP X (Custodial Exchange)</span>
              <span className="text-xs font-mono text-cyan-400 block mt-1">Node ID: vasp-x</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-gray-400 block">COMPOSITE ATTRIBUTION SCORE</span>
              <span className="text-4xl font-black text-cyan-400 font-mono">91%</span>
              <span className="text-[10px] font-mono text-emerald-400 block font-bold">HIGH CONFIDENCE</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              MATHEMATICAL CONFIDENCE FACTOR WEIGHTING
            </h4>

            {DEMO_CASE_DATA.attributionBreakdown.map((item, idx) => (
              <div key={idx} className="bg-[#0A0F1D] border border-gray-800 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-200 font-bold flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2" />
                    {item.factor}
                  </span>
                  <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    +{item.weight}% Weight
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full"
                    style={{ width: `${(item.weight / 40) * 100}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl text-xs text-cyan-300 font-mono leading-relaxed">
            <strong>AUDIT TRAIL VERIFICATION:</strong> Every attribution weight calculation is cryptographically backed by on-chain UTXO graphs & DeBridge cross-chain lock logs, ensuring complete legal evidentiary admissibility under Section 65B IE Act / BNSS.
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-[#1E2D4A] bg-[#0A0F1D] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs rounded-lg transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
}
