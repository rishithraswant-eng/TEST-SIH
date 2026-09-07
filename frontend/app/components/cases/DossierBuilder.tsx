"use client";

import React, { useState } from 'react';
import { ArrowLeft, Lock, CheckSquare, Square, Download, FileText, ChevronDown, CheckCircle, AlertTriangle } from 'lucide-react';

interface DossierBuilderProps {
  onBack: () => void;
}

export default function DossierBuilder({ onBack }: DossierBuilderProps) {
  const [includeAlternates, setIncludeAlternates] = useState(false);
  const [includeRawEvidence, setIncludeRawEvidence] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1500);
  };

  return (
    <div className="flex flex-1 h-full bg-[#070A0E] text-gray-200 overflow-hidden font-sans relative">
      
      {/* COMPOSITION CONTROLS (Left Pane - 35%) */}
      <div className="w-[35%] bg-phantasm-surface border-r border-phantasm-border flex flex-col h-full flex-shrink-0 z-10 shadow-xl overflow-y-auto">
        <div className="p-4 border-b border-phantasm-border flex items-center sticky top-0 bg-phantasm-surface z-20">
          <button onClick={onBack} className="mr-3 text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-gray-100 uppercase tracking-wider">Dossier Composition</h2>
        </div>
        
        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Document Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Language</label>
                <div className="relative">
                  <select className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 text-sm appearance-none outline-none focus:border-phantasm-cyan">
                    <option>English (India)</option>
                    <option>Hindi (Official)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Template Version</label>
                <div className="relative">
                  <select className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded px-3 py-2 text-sm appearance-none outline-none focus:border-phantasm-cyan">
                    <option>v2.4 (Current Standard)</option>
                    <option>v2.3 (Legacy Formatting)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Certifying Officer</label>
                <input 
                  type="text" 
                  value="Inspector R. Sharma (Badge #48921)"
                  readOnly
                  className="w-full bg-gray-800/50 border border-gray-700 text-gray-400 rounded px-3 py-2 text-sm cursor-not-allowed"
                />
                <p className="text-[10px] text-gray-500 mt-1">Populated from active secure session.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Mandatory Sections</h3>
            <div className="space-y-3">
              {[
                'Cover page with dossier hash',
                'Case and authority reference',
                'Statutory certificate (Sec 63 BSA / 65B)',
                'Hop-by-hop attribution table',
                'Per-transaction evidence and proofs',
                'Confidence analysis',
                'Independent verification appendix'
              ].map((section, i) => (
                <div key={i} className="flex items-start group">
                  <div className="mt-0.5 relative">
                    <CheckSquare className="w-4 h-4 text-phantasm-cyan opacity-50" />
                  </div>
                  <span className="ml-2 text-sm text-gray-400 flex-1">{section}</span>
                  <span title="Mandatory section cannot be removed.">
                    <Lock className="w-3.5 h-3.5 text-gray-600 ml-2 mt-0.5 group-hover:text-phantasm-amber transition-colors" />
                  </span>
                </div>
              ))}
              
              <div className="flex items-start bg-red-950/20 border border-red-900/30 p-2 rounded -mx-2 group">
                <div className="mt-0.5 relative">
                  <CheckSquare className="w-4 h-4 text-red-500 opacity-50" />
                </div>
                <span className="ml-2 text-sm font-semibold text-red-400 flex-1">LIMITATIONS AND KNOWN FAILURE MODES</span>
                <span title="Critical legal requirement. Cannot be removed.">
                  <Lock className="w-3.5 h-3.5 text-red-500/50 ml-2 mt-0.5 group-hover:text-red-400 transition-colors" />
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Optional Annexures</h3>
            <div className="space-y-3">
              <label className="flex items-start cursor-pointer group">
                <div className="mt-0.5 relative">
                  {includeAlternates ? (
                    <CheckSquare className="w-4 h-4 text-phantasm-cyan" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-500 group-hover:text-gray-400" />
                  )}
                  <input type="checkbox" className="hidden" checked={includeAlternates} onChange={() => setIncludeAlternates(!includeAlternates)} />
                </div>
                <div className="ml-2 flex-1">
                  <span className={`text-sm ${includeAlternates ? 'text-gray-200' : 'text-gray-400'}`}>Alternate paths considered</span>
                  <p className="text-[10px] text-gray-500 mt-0.5">Includes detailed analysis of lower-probability paths.</p>
                </div>
              </label>

              <label className="flex items-start cursor-pointer group">
                <div className="mt-0.5 relative">
                  {includeRawEvidence ? (
                    <CheckSquare className="w-4 h-4 text-phantasm-cyan" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-500 group-hover:text-gray-400" />
                  )}
                  <input type="checkbox" className="hidden" checked={includeRawEvidence} onChange={() => setIncludeRawEvidence(!includeRawEvidence)} />
                </div>
                <div className="ml-2 flex-1">
                  <span className={`text-sm ${includeRawEvidence ? 'text-gray-200' : 'text-gray-400'}`}>Full raw evidence annexure</span>
                  <p className="text-[10px] text-gray-500 mt-0.5">Attaches complete JSON proofs and raw block headers (significantly increases file size).</p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="pt-4 border-t border-phantasm-border sticky bottom-0 bg-phantasm-surface pb-6">
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || isGenerated}
              className={`w-full font-bold py-3 rounded-lg flex items-center justify-center transition-all ${
                isGenerated ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 
                'bg-phantasm-cyan text-[#0A0F1D] hover:bg-opacity-90 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isGenerating ? (
                <span className="flex items-center"><div className="w-4 h-4 border-2 border-[#0A0F1D] border-t-transparent rounded-full animate-spin mr-2"></div> GENERATING PDF...</span>
              ) : isGenerated ? (
                <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> READY TO DOWNLOAD</span>
              ) : (
                <span className="flex items-center"><FileText className="w-4 h-4 mr-2" /> COMPILE DOSSIER</span>
              )}
            </button>
            {isGenerated && (
              <button className="w-full mt-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold py-2.5 rounded-lg flex items-center justify-center transition-colors text-sm">
                <Download className="w-4 h-4 mr-2" /> Download Dossier (4.2 MB)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LIVE PREVIEW (Right Pane - 65%) */}
      <div className="flex-1 bg-gray-900 p-8 overflow-y-auto relative">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center text-gray-500 text-xs font-semibold tracking-widest mb-4">
            LIVE PDF PREVIEW (LIGHT THEME FOR PRINT)
          </div>
          
          {/* MOCK PDF PAGE 1: Cover & Methodology */}
          <div className="bg-white text-black p-12 min-h-[1056px] shadow-2xl rounded">
             {/* Header */}
             <div className="border-b-2 border-gray-800 pb-4 mb-8 text-center">
                <h1 className="text-3xl font-serif font-bold tracking-tight">FORENSIC ATTRIBUTION DOSSIER</h1>
                <p className="text-sm font-sans text-gray-600 mt-2 font-semibold">PHANTASM GRAPH RESOLUTION ENGINE v2.4</p>
             </div>
             
             {/* Case Reference */}
             <div className="grid grid-cols-2 gap-8 mb-10 text-sm font-sans border border-gray-300 p-6 rounded">
                <div>
                  <div className="text-gray-500 text-xs font-semibold uppercase mb-1">Case Reference</div>
                  <div className="font-bold text-lg">PHT-8991</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-semibold uppercase mb-1">Legal Authority</div>
                  <div className="font-bold">Sec 94 BNSS (FIR-2026/08/891)</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-semibold uppercase mb-1">Seed Address</div>
                  <div className="font-mono text-sm break-all">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-semibold uppercase mb-1">Dossier Hash (SHA-256)</div>
                  <div className="font-mono text-xs text-gray-600 break-all bg-gray-100 p-1.5 rounded inline-block">a8f9c2e4...b7d1</div>
                </div>
             </div>
             
             {/* Certificate */}
             <div className="mb-10 text-sm font-sans leading-relaxed text-justify">
                <h2 className="font-bold text-lg mb-3">Statutory Certificate</h2>
                <p className="mb-2 italic border-l-4 border-gray-300 pl-4 py-1 text-gray-700">
                  Certified under Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly 65B of IEA) that this dossier was generated by the PHANTASM system during lawful execution of duties...
                </p>
             </div>
             
             {/* Confidence Analysis */}
             <div className="mb-10">
                <h2 className="font-bold text-lg mb-4 font-sans">Confidence & Calibration</h2>
                <div className="bg-gray-50 p-6 rounded border border-gray-200 font-sans">
                  <div className="flex items-end mb-6 border-b border-gray-200 pb-4">
                     <div className="text-5xl font-light tracking-tighter mr-4">91.3%</div>
                     <div className="pb-1 text-sm text-gray-600 max-w-sm">
                       confidence that this path terminates at the identified custodial service.
                     </div>
                  </div>
                  
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">How it was calculated</h3>
                  <p className="text-sm text-gray-800 mb-6 leading-relaxed">
                    We simulated 10,000 random traversals of the transaction graph, weighted by transfer value and recency. 9,130 of them terminated at this service. The credible interval [87.1% – 94.0%] reflects the spread of those simulations.
                  </p>
                  
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">What drove it up and down</h3>
                  <div className="space-y-2 text-sm font-mono bg-white p-4 border border-gray-200 rounded">
                     <div className="flex justify-between items-center"><span className="w-48">Classification certainty</span><span className="flex-1 h-3 bg-gray-200 mx-4 relative"><div className="absolute top-0 left-0 h-full bg-black w-5/6"></div></span><span>+ strong</span></div>
                     <div className="flex justify-between items-center"><span className="w-48">Source corroboration</span><span className="flex-1 h-3 bg-gray-200 mx-4 relative"><div className="absolute top-0 left-0 h-full bg-black w-full"></div></span><span>+ strong</span></div>
                     <div className="flex justify-between items-center"><span className="w-48">Temporal coherence</span><span className="flex-1 h-3 bg-gray-200 mx-4 relative"><div className="absolute top-0 left-0 h-full bg-black w-1/2"></div></span><span>+ moderate</span></div>
                     <div className="flex justify-between items-center"><span className="w-48">Path length (4 hops)</span><span className="flex-1 h-3 bg-gray-200 mx-4 relative"><div className="absolute top-0 left-0 h-full bg-black w-1/3"></div></span><span>− slight</span></div>
                  </div>
                </div>
             </div>
          </div>
          
          {/* MOCK PDF PAGE 2: Evidence & Limitations */}
          <div className="bg-white text-black p-12 min-h-[1056px] shadow-2xl rounded font-sans">
             
             {/* Evidence Integrity */}
             <div className="mb-12">
                <h2 className="font-bold text-lg mb-4 border-b border-gray-300 pb-2">Evidence Integrity</h2>
                <div className="flex items-center text-green-700 bg-green-50 px-4 py-3 border border-green-200 rounded font-semibold mb-6">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  4 of 4 cited transactions have verified inclusion proofs.
                </div>
                
                {/* Proof Block */}
                <div className="border border-gray-300 rounded p-5 mb-4">
                  <div className="flex justify-between items-center mb-4">
                     <div className="font-mono font-bold">tx a3f9...c21b</div>
                     <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold border border-green-300">✓ Verified</div>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] gap-y-2 text-sm">
                     <div className="text-gray-500">Context</div><div>Block 812,441 · 143 confirmations · Bitcoin</div>
                     <div className="text-gray-500">Proof type</div><div>Transaction Merkle branch (double SHA-256)</div>
                     <div className="text-gray-500">Merkle root</div><div className="font-mono text-xs">4a7df0e2... (matches block header)</div>
                     <div className="text-gray-500">Path depth</div><div>12 hashes</div>
                  </div>
                </div>
             </div>
             
             {/* LIMITATIONS */}
             <div className="border-t-4 border-red-600 pt-6 mt-12 bg-red-50/50 p-6 rounded-b">
                <h2 className="font-bold text-lg text-red-800 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  LIMITATIONS AND KNOWN FAILURE MODES
                </h2>
                <div className="text-sm text-gray-800 space-y-4 leading-relaxed">
                  <p>
                    <strong>1. Model Calibration:</strong> The classification model was evaluated on a standard dataset that is known to be unrepresentative of specific regional typologies, including Indian sub-continent laundering patterns.
                  </p>
                  <p>
                    <strong>2. Zero-Day Wallets:</strong> Accuracy on sparse or zero-day wallets is materially lower. The system's confidence scores may overestimate certainty when dealing with completely novel entities that mimic known exchange behaviors.
                  </p>
                  <p>
                    <strong>3. Not a Statement of Control:</strong> The terminus identified in this dossier represents the flow of value through the transaction path. It is not a measure of anyone's guilt, and it is not a statement about who controls any address.
                  </p>
                </div>
             </div>

             {/* Optional Sections Rendering */}
             {includeAlternates && (
               <div className="mt-12 pt-8 border-t border-gray-300">
                  <h2 className="font-bold text-lg mb-4 text-gray-800">Annexure A: Alternate Paths Considered</h2>
                  <p className="text-sm text-gray-600 italic">This section includes the 2 lower-probability paths that were analyzed and rejected as the primary terminus.</p>
               </div>
             )}
             
             {includeRawEvidence && (
               <div className="mt-12 pt-8 border-t border-gray-300">
                  <h2 className="font-bold text-lg mb-4 text-gray-800">Annexure B: Raw Evidence & Proof JSON</h2>
                  <p className="text-sm text-gray-600 italic">Attached: 14 pages of raw block headers and Merkle branch JSON payloads.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
