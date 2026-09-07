"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/app/components/layout/AppShell';
import {
  Sliders,
  ShieldCheck,
  Zap,
  Layers,
  Database,
  CheckCircle,
  AlertTriangle,
  FileText,
  Activity,
  RotateCcw,
  Save,
  Server,
  Info,
  ExternalLink
} from 'lucide-react';

export default function SettingsPage() {
  // Operational Settings State
  const [traceDepth, setTraceDepth] = useState<number>(6);
  const [crossChainEnabled, setCrossChainEnabled] = useState<boolean>(true);
  const [requiredConfirmations, setRequiredConfirmations] = useState<number>(12);
  const [attributionThreshold, setAttributionThreshold] = useState<number>(75);
  const [merkleVerification, setMerkleVerification] = useState<boolean>(true);
  const [sourceAgreement, setSourceAgreement] = useState<boolean>(true);
  const [confirmationCheck, setConfirmationCheck] = useState<boolean>(true);

  // Data Sources Detail Modal State
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const dataSources = [
    {
      id: 'eth-rpc',
      name: 'Ethereum RPC Node',
      type: 'Primary Mainnet RPC',
      status: 'ONLINE',
      latency: '18ms',
      blockHeight: '#19482910',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      id: 'btc-rpc',
      name: 'Bitcoin Core RPC',
      type: 'UTXO Indexer Service',
      status: 'ONLINE',
      latency: '34ms',
      blockHeight: '#834912',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      id: 'intel-api',
      name: 'Blockchain Intelligence API',
      type: 'Heuristic Cluster Provider',
      status: 'MOCK / DEMO',
      latency: '4ms',
      blockHeight: 'Active Sync',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
    },
    {
      id: 'vasp-registry',
      name: 'VASP Intelligence Registry',
      type: 'FIU-IND Verified Database',
      status: 'VERIFIED',
      latency: '12ms',
      blockHeight: '3,491 Entities',
      color: 'text-[#91f0fa] border-[#5de8f2]/30 bg-[#91f0fa]/10'
    }
  ];

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3500);
  };

  const handleReset = () => {
    setTraceDepth(6);
    setCrossChainEnabled(true);
    setRequiredConfirmations(12);
    setAttributionThreshold(75);
    setMerkleVerification(true);
    setSourceAgreement(true);
    setConfirmationCheck(true);
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8 pb-12 font-sans">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1E2D4A] pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#5de8f2]/10 border border-[#5de8f2]/30 text-[#91f0fa]">
                <Sliders className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black tracking-wide text-white font-mono uppercase">
                INVESTIGATION CONFIGURATION
              </h1>
            </div>
            <p className="text-xs text-[#338499] font-mono mt-1">
              Trace execution, evidence validation and attribution parameters.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-gray-700 bg-[#0f172a] hover:bg-gray-800 text-gray-300 text-xs font-mono font-bold flex items-center space-x-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET TO DEFAULTS</span>
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#91f0fa] to-[#0088cc] hover:from-[#5de8f2] hover:to-[#006699] text-black font-mono font-extrabold text-xs flex items-center space-x-2 shadow-[0_0_20px_rgba(145,240,250,0.3)] transition"
            >
              <Save className="w-4 h-4" />
              <span>SAVE CONFIGURATION</span>
            </button>
          </div>
        </div>

        {/* Save Confirmation Toast Banner */}
        {saveToast && (
          <div className="bg-[#052c1e] border border-emerald-500/50 rounded-xl p-4 flex items-center justify-between text-emerald-300 font-mono text-xs shadow-lg animate-pulse">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-bold block">CONFIGURATION SAVED SUCCESSFULLY</span>
                <span className="text-[11px] text-emerald-400/80">Updated trace depth, threshold, and evidence verification parameters across node memory.</span>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800 text-emerald-400">ACTIVE</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Controls (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* SECTION 1: TRACE ENGINE DEPTH */}
            <div className="bg-[#0b1728] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-[#91f0fa]" />
                  <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">SECTION 1 — TRACE ENGINE</h2>
                </div>
                <span className="text-xs font-mono text-[#91f0fa] font-extrabold bg-[#5de8f2]/10 px-3 py-1 rounded-full border border-[#5de8f2]/30">
                  {traceDepth} HOPS MAX
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Maximum search depth for heuristic path expansion across UTXO and account-based ledgers.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-mono text-gray-400">
                  <span>3 Hops (Fast)</span>
                  <span className="text-white font-bold">{traceDepth} Hops</span>
                  <span>10 Hops (Deep Inspection)</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={traceDepth}
                  onChange={(e) => setTraceDepth(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#122238] rounded-lg appearance-none cursor-pointer accent-[#91f0fa]"
                />
                <div className="flex justify-between font-mono text-[10px] text-gray-500">
                  {[3, 4, 5, 6, 7, 8, 9, 10].map((h) => (
                    <button
                      key={h}
                      onClick={() => setTraceDepth(h)}
                      className={`px-2 py-0.5 rounded ${traceDepth === h ? 'bg-[#91f0fa] text-black font-bold' : 'hover:text-white'}`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 2: CROSS-CHAIN ANALYSIS */}
            <div className="bg-[#0b1728] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">SECTION 2 — CROSS-CHAIN ANALYSIS</h2>
                </div>
                <button
                  onClick={() => setCrossChainEnabled(!crossChainEnabled)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition flex items-center space-x-2 ${
                    crossChainEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${crossChainEnabled ? 'bg-emerald-400 animate-ping' : 'bg-red-400'}`} />
                  <span>{crossChainEnabled ? 'STATUS: ENABLED' : 'STATUS: DISABLED'}</span>
                </button>
              </div>

              {!crossChainEnabled ? (
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3.5 text-amber-300 text-xs font-mono flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>WARNING:</strong> Cross-chain bridge correlation will not be included in new trace runs. Synthetic bridge swaps will be flagged as unlinked endpoints.
                  </span>
                </div>
              ) : (
                <p className="text-xs text-gray-400">
                  Cross-chain bridge heuristic tracking enabled across DeBridge, Wormhole, Stargate, and ThorChain protocols.
                </p>
              )}
            </div>

            {/* SECTION 3: EVIDENCE FINALITY */}
            <div className="bg-[#0b1728] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">SECTION 3 — EVIDENCE FINALITY</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setRequiredConfirmations(Math.max(1, requiredConfirmations - 1))}
                    className="w-7 h-7 rounded bg-[#162942] hover:bg-cyan-900 text-white font-bold font-mono text-sm border border-gray-700"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-bold text-white bg-[#051120] px-3 py-1 rounded border border-[#1E2D4A]">
                    {requiredConfirmations} CONFIRMATIONS
                  </span>
                  <button
                    onClick={() => setRequiredConfirmations(requiredConfirmations + 1)}
                    className="w-7 h-7 rounded bg-[#162942] hover:bg-cyan-900 text-white font-bold font-mono text-sm border border-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Minimum on-chain block confirmations required before immutability proof generation.
              </p>
            </div>

            {/* SECTION 4: ATTRIBUTION THRESHOLD */}
            <div className="bg-[#0b1728] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">SECTION 4 — ATTRIBUTION THRESHOLD</h2>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                    attributionThreshold >= 75
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {attributionThreshold}% — {attributionThreshold >= 75 ? 'ACTIONABLE' : 'REVIEW REQUIRED'}
                </span>
              </div>

              <div className="space-y-3">
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={attributionThreshold}
                  onChange={(e) => setAttributionThreshold(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#122238] rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
                <div className="flex justify-between text-xs font-mono text-gray-400">
                  <span>50% Threshold</span>
                  <span>Below 75%: <span className="text-amber-400 font-bold">REVIEW REQUIRED</span></span>
                  <span>75%+: <span className="text-emerald-400 font-bold">ACTIONABLE</span></span>
                </div>
              </div>
            </div>

            {/* SECTION 5: DATA SOURCES */}
            <div className="bg-[#0b1728] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Server className="w-5 h-5 text-[#91f0fa]" />
                  <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">SECTION 5 — DATA SOURCES STATUS</h2>
                </div>
                <span className="text-[11px] font-mono text-gray-400">4 Active Adapters</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {dataSources.map((src) => (
                  <button
                    key={src.id}
                    onClick={() => setSelectedSource(src.name)}
                    className="p-3.5 rounded-xl bg-[#07111e] border border-[#1E2D4A] hover:border-[#5de8f2]/40 text-left transition space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white group-hover:text-[#91f0fa] transition">{src.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${src.color}`}>
                        {src.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>{src.type}</span>
                      <span className="text-[#338499]">{src.latency}</span>
                    </div>
                  </button>
                ))}
              </div>

              {selectedSource && (
                <div className="bg-[#051120] border border-[#5de8f2]/40 rounded-xl p-4 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between text-[#91f0fa]">
                    <span className="font-bold flex items-center">
                      <Info className="w-4 h-4 mr-2" /> DATA SOURCE DETAILS: {selectedSource}
                    </span>
                    <button onClick={() => setSelectedSource(null)} className="text-gray-400 hover:text-white">✕</button>
                  </div>
                  <p className="text-gray-300 text-[11px]">
                    Verified dual-indexing connection providing real-time mempool inspection, UTXO spending graph reconstruction, and zero-knowledge evidence proof synchronization.
                  </p>
                </div>
              )}
            </div>

            {/* SECTION 6: EVIDENCE VERIFICATION TOGGLES */}
            <div className="bg-[#0b1728] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" /> SECTION 6 — EVIDENCE VERIFICATION PROTOCOLS
              </h2>

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#07111e] border border-[#1E2D4A]">
                  <div>
                    <span className="font-bold text-white block">MERKLE PROOF VERIFICATION</span>
                    <span className="text-[11px] text-gray-400">Cryptographically verify block inclusion via Merkle branch validation.</span>
                  </div>
                  <button
                    onClick={() => setMerkleVerification(!merkleVerification)}
                    className={`px-3 py-1 rounded text-xs font-bold ${merkleVerification ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-gray-800 text-gray-400'}`}
                  >
                    {merkleVerification ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#07111e] border border-[#1E2D4A]">
                  <div>
                    <span className="font-bold text-white block">SOURCE AGREEMENT CHECK</span>
                    <span className="text-[11px] text-gray-400">Cross-reference attribution across minimum 2 independent intelligence sources.</span>
                  </div>
                  <button
                    onClick={() => setSourceAgreement(!sourceAgreement)}
                    className={`px-3 py-1 rounded text-xs font-bold ${sourceAgreement ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-gray-800 text-gray-400'}`}
                  >
                    {sourceAgreement ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#07111e] border border-[#1E2D4A]">
                  <div>
                    <span className="font-bold text-white block">CONFIRMATION DEPTH CHECK</span>
                    <span className="text-[11px] text-gray-400">Enforce minimum depth checks before releasing formal Dossier proofs.</span>
                  </div>
                  <button
                    onClick={() => setConfirmationCheck(!confirmationCheck)}
                    className={`px-3 py-1 rounded text-xs font-bold ${confirmationCheck ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-gray-800 text-gray-400'}`}
                  >
                    {confirmationCheck ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Case Context & Active Session) */}
          <div className="space-y-6">
            
            {/* SECTION 7: DEMO CASE CONTEXT */}
            <div className="bg-[#0b1728] border border-[#5de8f2]/30 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#1E2D4A] pb-3">
                <span className="text-xs font-bold text-[#91f0fa] uppercase tracking-wider flex items-center">
                  <FileText className="w-4 h-4 mr-2" /> DEMO CASE CONTEXT
                </span>
                <span className="bg-[#91f0fa]/10 text-[#91f0fa] text-[10px] px-2 py-0.5 rounded border border-[#5de8f2]/30 font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between py-1 border-b border-[#16263d]">
                  <span className="text-gray-400">CASE ID:</span>
                  <span className="text-white font-extrabold">IND-28491</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#16263d]">
                  <span className="text-gray-400">TARGET WALLET:</span>
                  <span className="text-[#91f0fa] font-bold">0xA82...7F3</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#16263d]">
                  <span className="text-gray-400">TRACE VALUE:</span>
                  <span className="text-amber-400 font-extrabold text-sm">₹8,40,000</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#16263d]">
                  <span className="text-gray-400">ATTRIBUTED VASP:</span>
                  <span className="text-emerald-400 font-bold">VASP X</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-gray-400">CONFIDENCE:</span>
                  <span className="text-[#91f0fa] font-extrabold">91.3% (95% CI)</span>
                </div>
              </div>
            </div>

            {/* SECTION 8: SESSION / AUDIT */}
            <div className="bg-[#0b1728] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
              <div className="border-b border-[#1E2D4A] pb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center">
                  <Database className="w-4 h-4 mr-2 text-cyan-400" /> SESSION & AUDIT
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 block text-[11px]">CURRENT SESSION:</span>
                  <span className="text-white font-bold text-sm block pt-0.5">INSPECTOR A. SHARMA</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">SESSION STATUS:</span>
                  <span className="text-emerald-400 font-bold flex items-center pt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping" />
                    ACTIVE & AUTHENTICATED
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">AUDIT LOGGING:</span>
                  <span className="text-cyan-400 font-bold pt-0.5 block">ENABLED (TAMPER-EVIDENT)</span>
                </div>

                <div className="pt-2">
                  <Link
                    href="/audit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#12243d] hover:bg-[#1a3356] border border-[#5de8f2]/30 text-[#91f0fa] font-bold flex items-center justify-center space-x-2 transition"
                  >
                    <span>VIEW AUDIT LOG</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </AppShell>
  );
}
