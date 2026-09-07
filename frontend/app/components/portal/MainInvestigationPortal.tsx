"use client";

import React, { useState } from 'react';
import PortalHeader from './PortalHeader';
import PortalSidebar from './PortalSidebar';
import InteractiveGraph from './InteractiveGraph';
import ForensicReportModal from './ForensicReportModal';
import DisclosureNoticeModal from './DisclosureNoticeModal';
import FreezeNoticeModal from './FreezeNoticeModal';
import ExplainAttributionModal from './ExplainAttributionModal';
import { DEMO_CASE_DATA, GraphNode } from '@/app/lib/mockData';

import {
  Search,
  Network,
  ShieldCheck,
  Building2,
  Activity,
  CheckCircle2,
  FileText,
  Lock,
  Send,
  HelpCircle,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
  Layers,
  FileSpreadsheet,
  Share2,
  ExternalLink
} from 'lucide-react';

export default function MainInvestigationPortal() {
  const [activeTab, setActiveTab] = useState('investigation');

  // Input states
  const [inputWallet, setInputWallet] = useState(DEMO_CASE_DATA.targetAddress);
  const [selectedChain, setSelectedChain] = useState('Ethereum');
  const [isIngesting, setIsIngesting] = useState(false);

  // Selected graph node state
  const [selectedNode, setSelectedNode] = useState<GraphNode>(DEMO_CASE_DATA.nodes[0]);

  // Modal open states
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);
  const [isFreezeOpen, setIsFreezeOpen] = useState(false);
  const [isExplainOpen, setIsExplainOpen] = useState(false);

  // Simulates executing a new trace
  const handleStartTrace = () => {
    setIsIngesting(true);
    setTimeout(() => {
      setIsIngesting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050912] text-gray-100 font-sans flex flex-col overflow-hidden">
      {/* Top Header */}
      <PortalHeader currentTab={activeTab} />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <PortalSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
          
          {/* SECTION 1: WALLET INVESTIGATION INPUT */}
          <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E2D4A] pb-3">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-gray-100 tracking-wide">
                  1. SEED WALLET INVESTIGATION GATE
                </h2>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                BNSS Mandate Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-mono text-gray-400">Target Wallet Address</label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputWallet}
                    onChange={(e) => setInputWallet(e.target.value)}
                    placeholder="Enter 0x or BTC wallet address..."
                    className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-4 py-2.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <div className="absolute right-3 top-2.5 text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
                    ETH / BTC
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400">Blockchain / Network</label>
                <select
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value)}
                  className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl px-3 py-2.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Ethereum">Ethereum (ERC-20)</option>
                  <option value="Bitcoin">Bitcoin (UTXO)</option>
                  <option value="Multi-Chain">Multi-Chain (DeBridge)</option>
                  <option value="Solana">Solana</option>
                  <option value="Polygon">Polygon</option>
                </select>
              </div>

              <button
                onClick={handleStartTrace}
                disabled={isIngesting}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 text-black font-extrabold text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isIngesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>TRACING GRAPH...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    <span>EXECUTE TRACE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* SECTION 2: INVESTIGATION OVERVIEW METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-[#111A2E] border border-[#1E2D4A] p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-mono text-gray-400">TARGET WALLET</span>
              <div className="text-xs font-mono font-bold text-cyan-300 truncate">
                {DEMO_CASE_DATA.targetAddress.slice(0, 10)}...
              </div>
            </div>

            <div className="bg-[#111A2E] border border-amber-500/30 p-4 rounded-xl space-y-1 shadow-[0_0_15px_rgba(255,179,0,0.1)]">
              <span className="text-[11px] font-mono text-amber-400 font-bold">TRACE VALUE</span>
              <div className="text-lg font-black text-amber-300 font-mono">
                {DEMO_CASE_DATA.traceValue}
              </div>
              <div className="text-[10px] text-gray-400 font-mono">{DEMO_CASE_DATA.traceValueUsd}</div>
            </div>

            <div className="bg-[#111A2E] border border-[#1E2D4A] p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-mono text-gray-400">NUMBER OF HOPS</span>
              <div className="text-lg font-black text-white font-mono">{DEMO_CASE_DATA.hops} Direct Hops</div>
            </div>

            <div className="bg-[#111A2E] border border-[#1E2D4A] p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-mono text-gray-400">CHAINS SPANNED</span>
              <div className="text-lg font-black text-cyan-400 font-mono">
                {DEMO_CASE_DATA.chains} (ETH & BTC)
              </div>
            </div>

            <div className="bg-[#111A2E] border border-cyan-500/30 p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-mono text-cyan-400 font-bold">NEAREST VASP</span>
              <div className="text-base font-extrabold text-white">
                {DEMO_CASE_DATA.nearestVasp.name} ({DEMO_CASE_DATA.nearestVasp.confidence}%)
              </div>
            </div>
          </div>

          {/* MAIN TWO-COLUMN WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN (2 COLS): TRANSACTION GRAPH & BEHAVIORAL SIGNALS */}
            <div className="lg:col-span-2 space-y-6">

              {/* SECTION 3: PRIMARY TRANSACTION GRAPH */}
              <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Network className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-gray-100">
                      3. PRIMARY FORENSIC TRANSACTION GRAPH
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-gray-400">
                    Click node to inspect entity signals
                  </div>
                </div>

                <InteractiveGraph
                  selectedNodeId={selectedNode.id}
                  onSelectNode={(node) => setSelectedNode(node)}
                />
              </div>

              {/* SECTION 6: BEHAVIORAL SIGNALS */}
              <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E2D4A] pb-3">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-gray-100">
                      6. ANALYTICAL BEHAVIORAL SIGNALS
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    Pattern Heuristics (Non-Proof Analytics)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DEMO_CASE_DATA.behavioralSignals.map((sig) => (
                    <div
                      key={sig.id}
                      className="bg-[#0A0F1D] border border-gray-800 p-4 rounded-xl space-y-2 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold text-white">{sig.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sig.severity === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {sig.metric}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        {sig.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 7: EVIDENCE PANEL */}
              <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E2D4A] pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-gray-100">
                      7. CRYPTOGRAPHIC EVIDENCE PANELS
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> All Evidence Cryptographically Verified
                  </span>
                </div>

                <div className="space-y-3">
                  {DEMO_CASE_DATA.evidence.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#0A0F1D] border border-gray-800 p-4 rounded-xl flex items-start justify-between text-xs font-mono"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-bold text-gray-200">{item.title}</span>
                          <span className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded text-[10px]">{item.type}</span>
                        </div>
                        <p className="text-gray-400 font-sans text-xs pt-1">{item.details}</p>
                      </div>
                      <div className="text-right shrink-0 font-mono text-[11px] text-cyan-400">
                        {item.hash.slice(0, 14)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (1 COL): ENTITY DETAILS, VASP ATTRIBUTION, ACTIONS */}
            <div className="space-y-6">

              {/* SECTION 4: SELECTED ENTITY DETAILS PANEL */}
              <div className="bg-[#111A2E] border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E2D4A] pb-3">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                    4. ENTITY DETAILS PANEL
                  </span>
                  <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
                    {selectedNode.type.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">ADDRESS / IDENTIFIER</span>
                    <span className="text-amber-400 font-bold break-all">{selectedNode.address}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">CLASSIFICATION:</span>
                    <span className="text-white font-bold">{selectedNode.label}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">BLOCKCHAIN:</span>
                    <span className="text-cyan-400">{selectedNode.chain}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">TIMESTAMP:</span>
                    <span className="text-gray-300">{selectedNode.timestamp}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">BEHAVIORAL RISK SCORE:</span>
                    <span className="text-red-400 font-bold">{selectedNode.riskScore} / 100</span>
                  </div>

                  <div className="pt-2 border-t border-gray-800 font-sans text-xs text-gray-300 leading-relaxed">
                    {selectedNode.details}
                  </div>
                </div>
              </div>

              {/* SECTION 5: VASP ATTRIBUTION PANEL */}
              <div className="bg-[#111A2E] border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,229,255,0.15)] space-y-5">
                <div className="flex items-center justify-between border-b border-[#1E2D4A] pb-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-gray-100">
                      5. VASP ATTRIBUTION PANEL
                    </h3>
                  </div>
                </div>

                <div className="bg-[#0A0F1D] border border-cyan-500/30 p-5 rounded-xl text-center space-y-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                    ATTRIBUTED RECIPIENT VASP
                  </span>
                  <div className="text-3xl font-extrabold text-white">VASP X</div>
                  <div className="text-3xl font-black text-cyan-400 font-mono">
                    91% CONFIDENCE
                  </div>
                  <div className="text-[11px] font-mono text-amber-300 pt-1">
                    Regulated Custodial Cryptocurrency Institution
                  </div>
                </div>

                {/* Section 9 trigger inside VASP attribution panel */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsExplainOpen(true)}
                    className="w-full bg-[#1E2D4A] hover:bg-gray-700 text-cyan-400 border border-cyan-500/30 font-bold font-mono text-xs py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-all"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Explain Attribution</span>
                  </button>
                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs py-2.5 rounded-xl flex items-center justify-center space-x-1 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                  >
                    <span>VIEW EVIDENCE</span>
                  </button>
                </div>
              </div>

              {/* SECTION 8: INVESTIGATION ACTIONS */}
              <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E2D4A] pb-3">
                  <h3 className="text-sm font-bold text-gray-100">
                    8. STATUTORY INVESTIGATION ACTIONS
                  </h3>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="w-full bg-[#0A0F1D] hover:bg-[#1E2D4A] border border-cyan-500/30 text-gray-200 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>GENERATE FORENSIC REPORT</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setIsDisclosureOpen(true)}
                    className="w-full bg-[#0A0F1D] hover:bg-[#1E2D4A] border border-amber-500/30 text-gray-200 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>PREPARE DISCLOSURE REQUEST</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setIsFreezeOpen(true)}
                    className="w-full bg-[#0A0F1D] hover:bg-red-500/10 border border-red-500/40 text-red-300 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <Lock className="w-4 h-4 text-red-400" />
                      <span>PREPARE FREEZE REQUEST</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* MODAL DIALOGS */}
      <ForensicReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      <DisclosureNoticeModal isOpen={isDisclosureOpen} onClose={() => setIsDisclosureOpen(false)} />
      <FreezeNoticeModal isOpen={isFreezeOpen} onClose={() => setIsFreezeOpen(false)} />
      <ExplainAttributionModal isOpen={isExplainOpen} onClose={() => setIsExplainOpen(false)} />
    </div>
  );
}
