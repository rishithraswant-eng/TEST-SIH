"use client";

import React, { useState } from 'react';
import AppShell from '@/app/components/layout/AppShell';
import InteractiveGraph from '@/app/components/portal/InteractiveGraph';
import { useInvestigationStore } from '@/app/lib/store';
import { GraphNode } from '@/app/lib/mockData';

import {
  Network,
  Table,
  SlidersHorizontal,
  X,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Eye,
  RefreshCw,
  Layers,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export default function TraceGraphResultPage() {
  const {
    caseData,
    selectedNode,
    setSelectedNode,
    reclassifyNode,
  } = useInvestigationStore();

  const [viewMode, setViewMode] = useState<'GRAPH' | 'TABLE'>('GRAPH');
  const [selectedPathId, setSelectedPathId] = useState('path-1');
  const [showInspector, setShowInspector] = useState(true);

  // Toggle Filters
  const [showPrimary, setShowPrimary] = useState(true);
  const [showAlternate, setShowAlternate] = useState(true);
  const [showPruned, setShowPruned] = useState(false);
  const [newLabelInput, setNewLabelInput] = useState("");
  const [isReclassifying, setIsReclassifying] = useState(false);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
    setShowInspector(true);
  };

  const handleApplyReclassify = () => {
    if (!newLabelInput) return;
    reclassifyNode(selectedNode.id, newLabelInput);
    setNewLabelInput("");
    setIsReclassifying(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header Bar & View Toggle */}
        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-5 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-xl font-black text-white font-mono">INTERACTIVE GRAPH RESOLUTION RESULT</h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-xs font-mono font-bold">
                PATH #1: 91.3% CONFIDENCE
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">
              Target Seed Address: <strong className="text-amber-400">{caseData.targetAddress}</strong>
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3 font-mono text-xs">
            {/* View Mode Toggle (Graph / Table) */}
            <div className="bg-[#0A0F1D] border border-[#1E2D4A] p-1 rounded-xl flex space-x-1">
              <button
                onClick={() => setViewMode('GRAPH')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                  viewMode === 'GRAPH' ? 'bg-[#1E2D4A] text-cyan-400 font-bold border border-cyan-500/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Network className="w-4 h-4" />
                <span>GRAPH VIEW</span>
              </button>

              <button
                onClick={() => setViewMode('TABLE')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                  viewMode === 'TABLE' ? 'bg-[#1E2D4A] text-cyan-400 font-bold border border-cyan-500/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Table className="w-4 h-4" />
                <span>TABLE VIEW</span>
              </button>
            </div>
          </div>
        </div>

        {/* MAIN GRAPH WORKSPACE - 3 COLUMN LAYOUT */}
        {viewMode === 'GRAPH' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* LEFT PANEL (1 COL): PATH SELECTION & TOGGLES */}
            <div className="space-y-4 font-mono text-xs">
              
              {/* Path List */}
              <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-5 shadow-xl space-y-3">
                <span className="text-gray-400 font-bold block border-b border-[#1E2D4A] pb-2">
                  EVALUATED PATHWAYS
                </span>

                <div className="space-y-2">
                  {caseData.paths.map((p) => {
                    const isSelected = selectedPathId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPathId(p.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#0A0F1D] border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                            : 'bg-[#0A0F1D]/50 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white text-[11px]">{p.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.confidence >= 75 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {p.confidence}%
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {p.hops} Hops • {p.terminalEntity}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-5 shadow-xl space-y-3">
                <span className="text-gray-400 font-bold block border-b border-[#1E2D4A] pb-2">
                  FILTER TOGGLES
                </span>

                <div className="space-y-2 text-gray-300">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={showPrimary} onChange={(e) => setShowPrimary(e.target.checked)} className="rounded text-amber-400" />
                    <span>Primary Path (Gold)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={showAlternate} onChange={(e) => setShowAlternate(e.target.checked)} className="rounded text-cyan-400" />
                    <span>Alternate Paths</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={showPruned} onChange={(e) => setShowPruned(e.target.checked)} className="rounded text-gray-500" />
                    <span>Show Pruned Edges</span>
                  </label>
                </div>
              </div>

            </div>

            {/* CENTER PANEL (2 COLS OR 3 COLS IF INSPECTOR CLOSED): INTERACTIVE GRAPH */}
            <div className={showInspector ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-4 shadow-xl">
                <InteractiveGraph
                  selectedNodeId={selectedNode.id}
                  onSelectNode={handleNodeClick}
                />
              </div>
            </div>

            {/* RIGHT PANEL (1 COL): NODE INSPECTOR DRAWER */}
            {showInspector && (
              <div className="bg-[#111A2E] border border-cyan-500/40 rounded-2xl p-5 shadow-2xl space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-[#1E2D4A] pb-2">
                  <span className="font-bold text-cyan-400 text-xs uppercase">NODE INSPECTOR DRAWER</span>
                  <button onClick={() => setShowInspector(false)} className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 block text-[10px]">ADDRESS / IDENTIFIER</span>
                    <span className="text-amber-400 font-bold break-all">{selectedNode.address}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">CLASSIFICATION:</span>
                    <span className="text-white font-bold">{selectedNode.label}</span>
                  </div>

                  {/* Confidence Distribution */}
                  <div className="space-y-2 pt-2 border-t border-gray-800">
                    <span className="text-gray-400 text-[10px] block">CONFIDENCE DISTRIBUTION</span>
                    {selectedNode.classificationDistribution?.map((cd, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-gray-300">{cd.label}</span>
                          <span className="text-cyan-400 font-bold">{cd.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${cd.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* On-Chain Summary */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-800 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-400">First Seen:</span>
                      <span className="text-gray-300">{selectedNode.firstSeen}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">In Degree / Out Degree:</span>
                      <span className="text-gray-300">{selectedNode.inDegree} in / {selectedNode.outDegree} out</span>
                    </div>
                  </div>

                  {/* Reclassify Action */}
                  <div className="pt-3 border-t border-gray-800 space-y-2">
                    {!isReclassifying ? (
                      <button
                        onClick={() => setIsReclassifying(true)}
                        className="w-full bg-[#0A0F1D] hover:bg-[#1E2D4A] text-cyan-400 border border-cyan-500/30 font-bold py-2 rounded-xl"
                      >
                        RECLASSIFY NODE
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={newLabelInput}
                          onChange={(e) => setNewLabelInput(e.target.value)}
                          placeholder="Enter override label..."
                          className="w-full bg-[#0A0F1D] border border-cyan-400 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                        <div className="flex space-x-2">
                          <button onClick={handleApplyReclassify} className="flex-1 bg-cyan-400 text-black font-bold py-1.5 rounded-lg">
                            Save
                          </button>
                          <button onClick={() => setIsReclassifying(false)} className="flex-1 bg-gray-800 text-gray-300 py-1.5 rounded-lg">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* MANDATORY TABLE VIEW */
          <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <span className="text-gray-400 font-bold block border-b border-[#1E2D4A] pb-2">
              EQUIVALENT GRAPH DATA TABLE VIEW (UNFILTERED)
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono">
                <thead className="bg-[#0A0F1D] text-gray-400 border-b border-[#1E2D4A]">
                  <tr>
                    <th className="p-3">Node Label</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Chain</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Risk Score</th>
                    <th className="p-3">Classification Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {caseData.nodes.map((n) => (
                    <tr key={n.id} onClick={() => handleNodeClick(n)} className="hover:bg-white/5 cursor-pointer">
                      <td className="p-3 text-cyan-400 font-bold">{n.label}</td>
                      <td className="p-3 text-amber-400">{n.address}</td>
                      <td className="p-3 text-gray-300">{n.chain}</td>
                      <td className="p-3 text-white">{n.amount}</td>
                      <td className="p-3 text-red-400">{n.riskScore}/100</td>
                      <td className="p-3 text-emerald-400 font-bold">{n.confidence ? `${n.confidence}%` : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
