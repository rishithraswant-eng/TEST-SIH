"use client";

import React, { useState } from 'react';
import { 
  Network, 
  FileText, 
  CheckCircle2, 
  Activity, 
  Play, 
  ArrowLeft,
  Sparkles,
  Clock,
  RefreshCw,
  Eye,
  FileCheck2,
  Lock
} from 'lucide-react';

interface CaseWorkspaceProps {
  authority?: {
    statuteRef: string;
    firNumber: string;
    policeStation: string;
    ioDesignation: string;
  };
  seedAddress?: string;
  detectedChain?: string;
  investigationMode?: 'standard' | 'deep_ml';
  onReset?: () => void;
}

export default function CaseWorkspace({
  authority = {
    statuteRef: 'Sec 94 BNSS',
    firNumber: 'FIR-2026/08/891',
    policeStation: 'Special Cyber Crime Branch',
    ioDesignation: 'Inspector A. Sharma'
  },
  seedAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  detectedChain = 'Bitcoin',
  investigationMode = 'deep_ml',
  onReset = () => {}
}: CaseWorkspaceProps) {
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingested, setIngested] = useState(false);
  const [dossierSigned, setDossierSigned] = useState(false);
  const [ingestionStep, setIngestionStep] = useState(0);
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    label: string;
    type: string;
    taint: number;
    volume: string;
    hops: number;
    flag: string;
  } | null>({
    id: seedAddress || '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    label: 'Root Seed Target',
    type: 'Origin UTXO',
    taint: 0.94,
    volume: '42.85 BTC (~$2.91M)',
    hops: 0,
    flag: 'CRITICAL_EXTORTION_SEED'
  });
  const [filterType, setFilterType] = useState('all');

  const steps = [
    'Connecting to Decentralized Blockchain RPC Gateways...',
    'Extracting UTXO & Token Balance Histories...',
    'Executing Hawkes Process Temporal Intensity Scoring...',
    'Running Elliptic Graph Neural Network (GNN) Attribution...',
    'Materializing Sharded Clusters into Neo4j Graph Database...'
  ];

  const handleStartIngestion = () => {
    setIsIngesting(true);
    setIngestionStep(0);
    
    const interval = setInterval(() => {
      setIngestionStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsIngesting(false);
          setIngested(true);
          return prev;
        }
      });
    }, 600);
  };

  const graphNodes = [
    { id: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', label: 'Seed Origin', type: 'Seed', taint: 0.95, volume: '42.85 BTC', hops: 0, flag: 'PRIMARY_TARGET', x: 70, y: 120, color: '#B08D57' },
    { id: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy', label: 'Peeling Chain Alpha', type: 'Hop 1', taint: 0.88, volume: '28.10 BTC', hops: 1, flag: 'SPLITTER', x: 150, y: 60, color: '#6B1E24' },
    { id: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', label: 'Intermediary Relay', type: 'Hop 1', taint: 0.82, volume: '14.75 BTC', hops: 1, flag: 'RELAY', x: 150, y: 180, color: '#6B1E24' },
    { id: '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo', label: 'Mixer Inflow Hub', type: 'Mixer', taint: 0.91, volume: '19.40 BTC', hops: 2, flag: 'TORNADO_STYLE_MIXER', x: 260, y: 80, color: '#5C1A1B' },
    { id: '1NDyJtNTjmwk5xPNhjgAMu4HDHigtobu1s', label: 'Cashout Broker', type: 'Hop 2', taint: 0.74, volume: '12.20 BTC', hops: 2, flag: 'P2P_BROKER', x: 260, y: 160, color: '#A85332' },
    { id: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE', label: 'Offshore Exchange VASP', type: 'VASP', taint: 0.98, volume: '38.50 BTC', hops: 3, flag: 'OFFSHORE_VASP_DEPOSIT', x: 360, y: 120, color: '#801824' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-2">
      <div className="nova-glass-card rounded-[32px] p-6 sm:p-7 flex flex-col md:flex-row justify-between items-start md:items-center shadow-md border border-[#E5DACB] gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-2xl bg-[#FAF5EE] text-[#5C1A1B] border border-[#E5DACB] hover:bg-[#F2EAE0] transition-all shadow-none flex items-center space-x-1.5 font-bold text-xs"
              title="Return to Case Wizard"
            >
              <ArrowLeft className="w-4 h-4 text-[#B08D57]" />
              <span>EDIT SETUP</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-[#5C1A1B] tracking-tight">
              Case: {authority?.firNumber || 'FIR-2026/08/891'}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-[#6B1E24] tracking-wide bg-[#F5ECE8] border border-[#DFC4BE]">
              ACTIVE MANDATE
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#736357]">
            <span className="flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1 text-[#B08D57]" />
              Mandate: <strong className="ml-1 text-[#2A211C]">{authority?.statuteRef || 'Sec 94 BNSS'}</strong>
            </span>
            <span>•</span>
            <span>Unit: <strong className="text-[#2A211C]">{authority?.policeStation || 'Special Cyber Crime Branch'}</strong></span>
            <span>•</span>
            <span>IO: <strong className="text-[#2A211C]">{authority?.ioDesignation || 'Inspector A. Sharma'}</strong></span>
          </div>
        </div>
        <div className="flex flex-col md:items-end space-y-1.5">
          <div className="px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 text-xs font-bold text-[#4B5E40] bg-[#F2F5EE] border border-[#D5DFC8]">
            <CheckCircle2 className="w-4 h-4 text-[#5A734C]" />
            <span>Lawful Chain of Custody Verified</span>
          </div>
          <div className="text-xs font-mono font-medium text-[#2A211C] flex items-center space-x-1.5 bg-[#FAF5EE] px-3 py-1 rounded-xl border border-[#E5DACB]">
            <span className="font-bold text-[#B08D57]">{detectedChain}:</span>
            <span className="truncate max-w-[240px]">{seedAddress}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 nova-glass-card rounded-[32px] overflow-hidden shadow-md border border-[#E5DACB] flex flex-col min-h-[560px]">
          <div className="bg-[#F2EAE0]/70 px-6 py-4 border-b border-[#E5DACB] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <Network className="w-5 h-5 text-[#B08D57]" />
              <h2 className="text-xs font-bold text-[#2A211C] tracking-[0.15em] uppercase font-sans">
                Graph Resolution Engine (Neo4j Shard)
              </h2>
            </div>
            <div className="flex items-center space-x-1.5">
              {['all', 'seeds', 'mixers', 'vasps'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setFilterType(filter)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold uppercase transition-all ${
                    filterType === filter
                      ? 'bg-[#6B1E24] text-[#FAF5EE] shadow-none'
                      : 'bg-[#FAF5EE] text-[#736357] border border-[#E5DACB] hover:bg-[#F2EAE0]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 relative flex flex-col justify-between p-6 bg-gradient-to-b from-[#FAF5EE]/70 to-[#F2EAE0]/50 overflow-hidden">
            {!ingested && !isIngesting ? (
              <div className="m-auto text-center z-10 space-y-4 max-w-lg py-12">
                <div className="w-20 h-20 rounded-3xl bg-[#FAF5EE] border border-[#E5DACB] flex items-center justify-center mx-auto shadow-sm">
                  <Activity className="w-10 h-10 text-[#B08D57] animate-pulse" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#5C1A1B]">
                  Attribution Engine Initialized & Idle
                </h3>
              </div>
            ) : isIngesting ? (
              <div className="m-auto text-center z-10 space-y-6 max-w-md py-12">
                <RefreshCw className="w-12 h-12 text-[#6B1E24] mx-auto animate-spin" />
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[#2A211C] uppercase tracking-[0.15em] font-sans">
                    Pipeline Execution in Progress ({ingestionStep + 1}/{steps.length})
                  </h3>
                  <p className="text-xs font-mono font-medium text-[#5C1A1B] bg-[#FAF5EE] p-2.5 rounded-xl border border-[#E5DACB]">
                    {steps[ingestionStep]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-between z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between text-xs font-medium text-[#2A211C] bg-[#FAF5EE] p-3 rounded-2xl border border-[#E5DACB] shadow-none">
                  <span className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-[#5A734C] mr-1.5" />
                    Ingestion Complete: <strong className="ml-1 text-[#2A211C]">6 Key Entities Clustered</strong>
                  </span>
                  <span className="font-mono font-bold text-[#6B1E24]">Taint Density: 94.2%</span>
                </div>
                <div className="relative w-full aspect-[16/9] rounded-3xl p-4 flex items-center justify-center border border-[#E5DACB] shadow-inner bg-[#FAF7F2]">
                  <svg className="w-full h-full" viewBox="0 0 440 240">
                    <line x1="70" y1="120" x2="150" y2="60" stroke="#B08D57" strokeWidth="2" strokeDasharray="4,4" />
                    <line x1="70" y1="120" x2="150" y2="180" stroke="#B08D57" strokeWidth="2" strokeDasharray="4,4" />
                    <line x1="150" y1="60" x2="260" y2="80" stroke="#6B1E24" strokeWidth="2.5" />
                    <line x1="150" y1="180" x2="260" y2="160" stroke="#6B1E24" strokeWidth="2.5" />
                    <line x1="260" y1="80" x2="360" y2="120" stroke="#801824" strokeWidth="3" />
                    <line x1="260" y1="160" x2="360" y2="120" stroke="#801824" strokeWidth="3" />
                    {graphNodes.map((node) => (
                      <g key={node.id} onClick={() => setSelectedNode(node)} className="cursor-pointer group">
                        <circle cx={node.x} cy={node.y} r={selectedNode?.id === node.id ? 22 : 17} fill={node.color} stroke="#FAF5EE" strokeWidth={selectedNode?.id === node.id ? 3 : 2} className="transition-all duration-300" />
                        <text x={node.x} y={node.y + 4} fill="#FAF5EE" fontSize="8" fontWeight="bold" textAnchor="middle" className="pointer-events-none font-mono">{node.type.toUpperCase().slice(0, 4)}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            )}
            {ingested && selectedNode && (
              <div className="mt-4 rounded-2xl p-4 border border-[#E5DACB] bg-[#FAF5EE] shadow-none space-y-2">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-[#B08D57]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2A211C] font-sans">
                    Node Inspector: {selectedNode.label}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <div className="nova-glass-card rounded-[32px] p-7 shadow-md border border-[#E5DACB] space-y-5">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#B08D57]" />
              <span className="text-xs font-bold tracking-[0.15em] text-[#B08D57] uppercase font-sans">
                FORENSIC ACTIONS
              </span>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-serif font-semibold text-[#5C1A1B]">
                {ingested ? 'Cryptographic Court Dossier' : 'Ingest Blockchain Seed'}
              </h4>
            </div>
            {!ingested ? (
              <button 
                onClick={handleStartIngestion}
                disabled={isIngesting}
                className="w-full bg-[#6B1E24] text-[#FAF5EE] font-bold py-4 rounded-full flex items-center justify-center space-x-2 text-xs tracking-wider uppercase transition-all"
              >
                <span>{isIngesting ? 'INGESTING...' : 'START INGESTION PIPELINE'}</span>
              </button>
            ) : (
              <button 
                onClick={() => setDossierSigned(true)}
                className={`w-full font-bold py-4 rounded-full flex items-center justify-center space-x-2 text-xs tracking-wider uppercase transition-all ${
                  dossierSigned ? 'bg-[#4B5E40] text-[#FAF5EE]' : 'bg-[#6B1E24] text-[#FAF5EE]'
                }`}
              >
                {dossierSigned ? <><FileCheck2 className="w-4 h-4" /> <span>DOSSIER SIGNED</span></> : <><Lock className="w-4 h-4" /> <span>GENERATE COURT DOSSIER</span></>}
              </button>
            )}
            <div className="pt-4 border-t border-[#E5DACB] flex justify-between items-center text-xs font-medium text-[#736357]">
              <span>Resolution Pipeline:</span>
              <span className="font-mono font-bold text-[#6B1E24]">Hawkes + Elliptic GNN</span>
            </div>
          </div>
          
          <div className="nova-glass-card rounded-[32px] p-7 shadow-md border border-[#E5DACB] flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.15em] text-[#2A211C] uppercase font-sans">
                AUDIT TRAIL
              </span>
              <Clock className="w-4 h-4 text-[#B08D57]" />
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl p-3.5 space-y-1 bg-[#FAF5EE] border border-[#E5DACB]">
                <div className="flex justify-between text-[10px] font-mono text-[#8A7B70]">
                  <span>10:42 AM</span>
                  <span className="text-[#4B5E40] font-bold">MANDATE_REGISTERED</span>
                </div>
                <p className="text-xs font-semibold text-[#2A211C]">Mandate validated.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
