"use client";

import React, { useState } from 'react';
import { Layers, List, Search, Maximize, ZoomIn, ZoomOut, CheckCircle, AlertTriangle, ShieldAlert, ArrowLeft, Copy, Eye, X } from 'lucide-react';
import { GraphNode, GraphEdge, TracePath, NodeClass, ConfidenceBand } from './types';
import HopTableView from './HopTableView';

// --- MOCK DATA ---
const scenarioA_nodes: GraphNode[] = [
  {
    id: 'n1', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', chainKey: 'BTC', nodeClass: 'UNKNOWN',
    classProbabilities: { UNKNOWN: 0.99, VASP_DEPOSIT: 0, VASP_HOT: 0, MULE: 0, MIXER: 0, BRIDGE: 0, DEX_ROUTER: 0 },
    confidenceBand: 'high', isSeed: true, isAbsorption: false, flags: [], valueThroughBase: '100.0'
  },
  {
    id: 'n2', address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', chainKey: 'BTC', nodeClass: 'MULE',
    classProbabilities: { MULE: 0.85, UNKNOWN: 0.1, VASP_DEPOSIT: 0.05, VASP_HOT: 0, MIXER: 0, BRIDGE: 0, DEX_ROUTER: 0 },
    confidenceBand: 'medium', isSeed: false, isAbsorption: false, flags: [], valueThroughBase: '98.5'
  },
  {
    id: 'n3', address: '1Q2TWHE3GMyw7VyFdF48cF8R3fKqE4xNnc', chainKey: 'BTC', nodeClass: 'MIXER',
    classProbabilities: { MIXER: 0.95, UNKNOWN: 0.05, VASP_DEPOSIT: 0, VASP_HOT: 0, MULE: 0, BRIDGE: 0, DEX_ROUTER: 0 },
    confidenceBand: 'high', isSeed: false, isAbsorption: false, entityName: 'Wasabi Coordinator', flags: [], valueThroughBase: '95.0'
  },
  {
    id: 'n4', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', chainKey: 'BTC', nodeClass: 'VASP_DEPOSIT',
    classProbabilities: { VASP_DEPOSIT: 0.924, MULE: 0.041, UNKNOWN: 0.02, VASP_HOT: 0.015, MIXER: 0, BRIDGE: 0, DEX_ROUTER: 0 },
    confidenceBand: 'high', isSeed: false, isAbsorption: true, entityName: 'WazirX (deposit)', flags: [], valueThroughBase: '90.2'
  }
];

const scenarioA_edges: GraphEdge[] = [
  { id: 'e1', from: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', to: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', txHash: 'tx_a1b2', assetSymbol: 'BTC', valueBase: '98.5', isPruned: false, isInference: false, layer: 'primary' },
  { id: 'e2', from: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', to: '1Q2TWHE3GMyw7VyFdF48cF8R3fKqE4xNnc', txHash: 'tx_c3d4', assetSymbol: 'BTC', valueBase: '95.0', isPruned: false, isInference: false, layer: 'primary' },
  { id: 'e3', from: '1Q2TWHE3GMyw7VyFdF48cF8R3fKqE4xNnc', to: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', txHash: 'tx_e5f6', assetSymbol: 'BTC', valueBase: '90.2', isPruned: false, isInference: true, layer: 'primary' },
];

const scenarioA_paths: TracePath[] = [
  { rank: 1, confidencePoint: 0.913, ciLower: 0.871, ciUpper: 0.940, hopCount: 4, terminalEntity: 'WazirX', terminalClass: 'VASP_DEPOSIT', jurisdiction: 'FIU_REGISTERED_DOMESTIC', tracedValueFraction: 0.967, proofsVerified: 4, proofsTotal: 4, crossesMixer: true },
  { rank: 2, confidencePoint: 0.620, ciLower: 0.510, ciUpper: 0.730, hopCount: 3, terminalEntity: 'Binance', terminalClass: 'VASP_HOT', jurisdiction: 'OFFSHORE', tracedValueFraction: 0.021, proofsVerified: 3, proofsTotal: 3, crossesMixer: false },
  { rank: 3, confidencePoint: 0.481, ciLower: 0.350, ciUpper: 0.610, hopCount: 5, terminalEntity: 'Unknown Entity', terminalClass: 'UNKNOWN', jurisdiction: 'UNKNOWN_ENTITY', tracedValueFraction: 0.012, proofsVerified: 5, proofsTotal: 5, crossesMixer: false },
];

const scenarioB_nodes = scenarioA_nodes.slice(0, 3);
const scenarioB_edges = scenarioA_edges.slice(0, 2);
const scenarioB_paths: TracePath[] = [
  { rank: 1, confidencePoint: 0.950, ciLower: 0.920, ciUpper: 0.980, hopCount: 3, terminalEntity: 'Wasabi Coordinator', terminalClass: 'MIXER', jurisdiction: 'UNKNOWN_ENTITY', tracedValueFraction: 0.950, proofsVerified: 2, proofsTotal: 2, crossesMixer: true }
];

interface GraphCanvasViewProps {
  onBack: () => void;
  scenario: 'A' | 'B';
}

export default function GraphCanvasView({ onBack, scenario }: GraphCanvasViewProps) {
  const [isTableView, setIsTableView] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const nodes = scenario === 'A' ? scenarioA_nodes : scenarioB_nodes;
  const edges = scenario === 'A' ? scenarioA_edges : scenarioB_edges;
  const paths = scenario === 'A' ? scenarioA_paths : scenarioB_paths;
  
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Layout for SVG (Hierarchical mapping)
  const nodePositions = new Map<string, { x: number, y: number }>();
  nodes.forEach((n, idx) => {
    nodePositions.set(n.id, { x: 100 + idx * 250, y: 250 });
  });

  const getShape = (nodeClass: NodeClass) => {
    switch (nodeClass) {
      case 'VASP_DEPOSIT':
      case 'VASP_HOT': return 'polygon points="30,0 60,15 60,45 30,60 0,45 0,15"'; // Hexagon
      case 'MULE': return 'circle cx="30" cy="30" r="30"'; // Circle
      case 'MIXER': return 'polygon points="30,0 60,30 30,60 0,30"'; // Diamond
      case 'BRIDGE': return 'path d="M0,30 L20,10 L20,20 L40,20 L40,10 L60,30 L40,50 L40,40 L20,40 L20,50 Z"'; // Double Arrow
      case 'DEX_ROUTER': return 'polygon points="30,0 60,60 0,60"'; // Triangle
      case 'UNKNOWN': default: return 'circle cx="30" cy="30" r="30" stroke-dasharray="5,5"'; // Dashed circle
    }
  };

  const getColor = (nodeClass: NodeClass) => {
    switch (nodeClass) {
      case 'VASP_DEPOSIT':
      case 'VASP_HOT': return '#22c55e'; // green
      case 'MULE': return '#f97316'; // orange
      case 'MIXER': return '#a855f7'; // purple
      case 'BRIDGE': return '#06b6d4'; // cyan
      case 'DEX_ROUTER': return '#eab308'; // yellow
      case 'UNKNOWN': default: return '#64748b'; // slate
    }
  };

  if (isTableView) {
    return <HopTableView nodes={nodes} edges={edges} onClose={() => setIsTableView(false)} />;
  }

  return (
    <div className="flex flex-1 h-full bg-[#070A0E] text-gray-200 overflow-hidden font-sans relative">
      
      {/* LEFT PANEL */}
      <div className="w-[260px] bg-phantasm-surface border-r border-phantasm-border flex flex-col h-full flex-shrink-0 z-10 shadow-xl">
        <div className="p-4 border-b border-phantasm-border flex items-center">
          <button onClick={onBack} className="mr-3 text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-gray-100 uppercase tracking-wider">Trace Paths</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Paths */}
          <div className="p-4 space-y-3">
            {paths.map((p, i) => (
              <div key={i} className={`p-3 rounded-lg border ${p.rank === 1 ? 'bg-[#0A1A17] border-green-500/30' : 'bg-gray-800/50 border-gray-700'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold ${p.rank === 1 ? 'text-green-400' : 'text-gray-400'}`}>
                    PATH #{p.rank}
                  </span>
                  <span className="text-xs text-gray-400">{p.hopCount} hops</span>
                </div>
                
                {/* Confidence Meter */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300 font-medium">Confidence</span>
                    <span className="font-mono text-gray-200">{(p.confidencePoint * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden relative">
                    <div className={`absolute top-0 left-0 h-full ${p.rank === 1 ? 'bg-green-500' : 'bg-gray-500'}`} style={{ width: `${p.confidencePoint * 100}%` }}></div>
                  </div>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Traced value:</span>
                  <span className="text-white font-mono">{(p.tracedValueFraction * 100).toFixed(1)}%</span>
                </div>
                <div className="text-xs text-gray-400 mt-1 truncate">
                  Terminus: <span className="text-gray-200">{p.terminalEntity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-phantasm-border">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Layers</h3>
            <div className="space-y-2">
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" defaultChecked className="form-checkbox bg-gray-800 border-gray-700 text-phantasm-cyan rounded" />
                <span className="ml-2 text-gray-300">Primary</span>
              </label>
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" className="form-checkbox bg-gray-800 border-gray-700 text-phantasm-cyan rounded" />
                <span className="ml-2 text-gray-400">Alternates</span>
              </label>
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" className="form-checkbox bg-gray-800 border-gray-700 text-phantasm-cyan rounded" />
                <span className="ml-2 text-gray-400">Pruned (34)</span>
              </label>
              <label className="flex items-center text-sm cursor-pointer pt-1 border-t border-gray-800">
                <input type="checkbox" defaultChecked className="form-checkbox bg-gray-800 border-gray-700 text-phantasm-cyan rounded" />
                <span className="ml-2 text-gray-300">Labels</span>
              </label>
            </div>
          </div>
          
          <div className="px-4 py-3 border-t border-phantasm-border">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Legend</h3>
             <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center"><div className="w-4 h-4 mr-2 bg-green-500/20 border-2 border-green-500 clip-hexagon"></div> Custodial / VASP</div>
                <div className="flex items-center"><div className="w-4 h-4 mr-2 bg-orange-500/20 border-2 border-orange-500 rounded-full"></div> Mule</div>
                <div className="flex items-center"><div className="w-4 h-4 mr-2 bg-purple-500/20 border-2 border-purple-500 transform rotate-45"></div> Mixer</div>
                <div className="flex items-center"><div className="w-4 h-4 mr-2 border-2 border-slate-500 border-dashed rounded-full"></div> Unknown</div>
             </div>
          </div>
        </div>
      </div>

      {/* CENTER CANVAS (SVG Renderer) */}
      <div className="flex-1 relative bg-[#050810] overflow-hidden" tabIndex={0} onKeyDown={(e) => {
        // Basic keyboard navigation mock
        if (e.key === 'Tab') {
           e.preventDefault();
           const nextIdx = selectedNodeId ? (nodes.findIndex(n => n.id === selectedNodeId) + 1) % nodes.length : 0;
           setSelectedNodeId(nodes[nextIdx].id);
        }
        if (e.key === 'Escape') setSelectedNodeId(null);
      }}>
        {/* Toolbar */}
        <div className="absolute top-4 right-4 z-20 flex bg-phantasm-surface border border-gray-700 rounded-lg shadow-xl p-1 space-x-1">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors" title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors" title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors" title="Fit to View"><Maximize className="w-4 h-4" /></button>
          <div className="w-px h-8 bg-gray-700 my-auto mx-1"></div>
          <button onClick={() => setIsTableView(true)} className="flex items-center px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors text-xs font-semibold" title="Table View">
            <List className="w-4 h-4 mr-2" /> TABLE VIEW
          </button>
        </div>

        {/* MOCK SVG CANVAS */}
        <svg width="100%" height="100%" className="absolute inset-0 cursor-grab active:cursor-grabbing">
          {/* Edges */}
          {edges.map((e) => {
             const fromPos = nodePositions.get(nodes.find(n => n.address === e.from)!.id);
             const toPos = nodePositions.get(nodes.find(n => n.address === e.to)!.id);
             if (!fromPos || !toPos) return null;
             
             return (
               <g key={e.id}>
                  {/* Arrow marker definition (simplified inline for mock) */}
                  <defs>
                    <marker id={`arrow-${e.id}`} viewBox="0 0 10 10" refX="25" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill={e.isInference ? '#9ca3af' : '#4b5563'} />
                    </marker>
                  </defs>
                  <line 
                    x1={fromPos.x + 30} y1={fromPos.y + 30} 
                    x2={toPos.x + 30} y2={toPos.y + 30}
                    stroke={e.isInference ? '#9ca3af' : '#4b5563'} 
                    strokeWidth="3"
                    strokeDasharray={e.isInference ? "5,5" : "none"}
                    markerEnd={`url(#arrow-${e.id})`}
                  />
                  <text x={(fromPos.x + toPos.x)/2 + 30} y={(fromPos.y + toPos.y)/2 + 20} fill="#9ca3af" fontSize="10" textAnchor="middle" className="font-mono">
                    {e.valueBase} {e.assetSymbol}
                  </text>
               </g>
             );
          })}
          
          {/* Nodes */}
          {nodes.map(n => {
            const pos = nodePositions.get(n.id);
            if (!pos) return null;
            const color = getColor(n.nodeClass);
            const isSelected = selectedNodeId === n.id;
            
            return (
              <g 
                key={n.id} 
                transform={`translate(${pos.x}, ${pos.y})`} 
                className={`cursor-pointer transition-opacity duration-300 outline-none`}
                onClick={() => setSelectedNodeId(n.id)}
                tabIndex={-1}
              >
                {isSelected && (
                  <circle cx="30" cy="30" r="45" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.5" className="animate-pulse" />
                )}
                {n.isSeed && (
                  <circle cx="30" cy="30" r="40" fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.8" />
                )}
                
                <g fill={`${color}22`} stroke={color} strokeWidth={n.confidenceBand === 'high' ? "2" : "2"} strokeDasharray={n.confidenceBand === 'medium' ? "4,4" : "none"}>
                  <svg width="60" height="60" viewBox="0 0 60 60" dangerouslySetInnerHTML={{ __html: `<${getShape(n.nodeClass)} />` }} />
                </g>
                
                {/* Value / Icon centered inside */}
                <text x="30" y="34" fill="white" fontSize="11" textAnchor="middle" className="font-mono">{n.valueThroughBase}</text>
                
                {/* Label below */}
                <text x="30" y="80" fill="#cbd5e1" fontSize="12" textAnchor="middle" className="font-semibold drop-shadow-md">
                  {n.entityName || `${n.address.substring(0,6)}...`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* RIGHT DRAWER (Inspector) */}
      {selectedNode && (
        <div className="w-[380px] bg-phantasm-surface border-l border-phantasm-border h-full flex flex-col z-20 shadow-2xl animate-in slide-in-from-right-10 duration-200">
          <div className="p-4 border-b border-phantasm-border flex justify-between items-start bg-gray-900/50">
            <div>
              <div className="flex items-center text-sm text-gray-400 mb-1 font-semibold uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: getColor(selectedNode.nodeClass) }}></span>
                {selectedNode.nodeClass.replace('_', ' ')}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{selectedNode.entityName || 'Unknown Entity'}</h3>
              
              <div className="flex items-center group cursor-pointer bg-gray-800 hover:bg-gray-700 p-1.5 rounded w-max transition-colors">
                <span className="font-mono text-gray-300 text-xs mr-2">{selectedNode.address.substring(0,8)}...{selectedNode.address.substring(selectedNode.address.length - 6)}</span>
                <Copy className="w-3.5 h-3.5 text-gray-500 group-hover:text-phantasm-cyan" />
              </div>
            </div>
            <button onClick={() => setSelectedNodeId(null)} className="text-gray-500 hover:text-white p-1 rounded hover:bg-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
             <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Classification</h4>
                
                {/* Argmax */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-200">{selectedNode.nodeClass.replace('_', ' ')}</span>
                    <span className="font-mono font-bold text-white">{(selectedNode.classProbabilities[selectedNode.nodeClass] * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex">
                    <div className="h-full" style={{ width: `${selectedNode.classProbabilities[selectedNode.nodeClass] * 100}%`, backgroundColor: getColor(selectedNode.nodeClass) }}></div>
                  </div>
                </div>

                {/* Other possibilities */}
                <h5 className="text-xs text-gray-500 mb-2 mt-4">Other possibilities</h5>
                <div className="space-y-2">
                  {Object.entries(selectedNode.classProbabilities)
                    .filter(([c, p]) => c !== selectedNode.nodeClass && p > 0)
                    .sort((a, b) => b[1] - a[1])
                    .map(([c, p]) => (
                      <div key={c} className="flex justify-between text-xs">
                        <span className="text-gray-400">{c.replace('_', ' ')}</span>
                        <span className="font-mono text-gray-500">{(p * 100).toFixed(1)}%</span>
                      </div>
                  ))}
                </div>
             </div>
             
             <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">On-Chain Summary</h4>
                <div className="bg-gray-900/50 rounded-lg p-3 space-y-2 text-sm border border-gray-800">
                  <div className="flex justify-between"><span className="text-gray-500">First seen</span><span className="text-gray-300">2021-04-12</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Last activity</span><span className="text-gray-300">2024-05-18</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Tx count</span><span className="text-gray-300">12,402</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">In / Out degree</span><span className="text-gray-300">3,491 / 8,911</span></div>
                </div>
             </div>

             <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Evidence</h4>
                <div className="flex items-center text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded p-2">
                   <CheckCircle className="w-4 h-4 mr-2" />
                   100% Cryptographic Inclusion Proofs
                </div>
             </div>
          </div>
          
          <div className="p-4 border-t border-gray-800 grid grid-cols-2 gap-2 bg-gray-900/80">
            <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded text-sm font-medium transition-colors">
              Reclassify
            </button>
            <button className="bg-phantasm-cyan/10 hover:bg-phantasm-cyan/20 text-phantasm-cyan border border-phantasm-cyan/30 py-2 rounded text-sm font-medium transition-colors">
              View raw data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
