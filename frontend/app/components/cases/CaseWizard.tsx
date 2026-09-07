"use client";

import React, { useState } from 'react';
import { ShieldCheck, Search, Link2, AlertCircle, ArrowRight } from 'lucide-react';

export default function CaseWizard({ onInitialize }: { onInitialize?: () => void }) {
  const [authority, setAuthority] = useState({
    statuteRef: '',
    firNumber: '',
    policeStation: '',
    ioDesignation: ''
  });

  const [seedAddress, setSeedAddress] = useState('');
  
  const isAuthorityValid = authority.statuteRef.trim() !== '' && 
                           authority.firNumber.trim() !== '' && 
                           authority.policeStation.trim() !== '' && 
                           authority.ioDesignation.trim() !== '';

  const detectChain = (addr: string) => {
    if (!addr) return null;
    if (addr.startsWith('0x')) return 'Ethereum';
    if (addr.startsWith('1') || addr.startsWith('3') || addr.toLowerCase().startsWith('bc1')) return 'Bitcoin';
    return 'Unknown';
  };

  const detectedChain = detectChain(seedAddress);

  return (
    <div className="max-w-4xl mx-auto space-y-8 select-none">
      
      {/* Page Heading - Warm Editorial Serif */}
      <div className="mb-8 space-y-2">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#5C1A1B] tracking-tight">
            Initialize New Investigation
          </h1>
          {/* Bronze/Gold star sparkle */}
          <div className="absolute -top-3 -right-7 pointer-events-none animate-pulse">
            <svg
              className="w-6 h-6 text-[#B08D57] drop-shadow-[0_0_6px_rgba(176,141,87,0.35)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
        </div>
        <p className="text-sm sm:text-base font-medium text-[#736357] tracking-normal font-sans">
          Establish lawful authority and seed the graph resolution engine.
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Statutory Authority Gate Card */}
        <div className="nova-glass-card rounded-[28px] overflow-hidden shadow-md border border-[#E5DACB] transition-all">
          <div className="bg-[#F2EAE0]/70 px-6 py-4 border-b border-[#E5DACB] flex items-center">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mr-3 shadow-sm bg-[#FAF5EE] border border-[#E2D6C5]">
              <ShieldCheck className="w-5 h-5 text-[#B08D57]" />
            </div>
            <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[#2A211C] font-sans">
              Statutory Authority Gate
            </h2>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#2A211C] font-sans">
                Statutory Reference <span className="text-[#B08D57]">*</span>
              </label>
              <div className="relative">
                <select 
                  className="w-full nova-glass-input rounded-xl px-4 py-3 text-sm font-semibold text-[#2A211C] focus:outline-none cursor-pointer appearance-none bg-white"
                  value={authority.statuteRef}
                  onChange={e => setAuthority({...authority, statuteRef: e.target.value})}
                >
                  <option value="">Select Reference...</option>
                  <option value="Sec 94 BNSS">Section 94 BNSS</option>
                  <option value="Sec 79(3)(b) IT Act">Section 79(3)(b) IT Act</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#736357] font-black text-xs">
                  ▼
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#2A211C] font-sans">
                FIR / DD Number <span className="text-[#B08D57]">*</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g., FIR-2026/08/891"
                className="w-full nova-glass-input rounded-xl px-4 py-3 text-sm font-semibold text-[#2A211C] placeholder:text-[#A19488] focus:outline-none"
                value={authority.firNumber}
                onChange={e => setAuthority({...authority, firNumber: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#2A211C] font-sans">
                Police Station / Unit <span className="text-[#B08D57]">*</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g., Cyber Cell, Delhi"
                className="w-full nova-glass-input rounded-xl px-4 py-3 text-sm font-semibold text-[#2A211C] placeholder:text-[#A19488] focus:outline-none"
                value={authority.policeStation}
                onChange={e => setAuthority({...authority, policeStation: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#2A211C] font-sans">
                IO Designation & ID <span className="text-[#B08D57]">*</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g., Inspector, ID: 8891"
                className="w-full nova-glass-input rounded-xl px-4 py-3 text-sm font-semibold text-[#2A211C] placeholder:text-[#A19488] focus:outline-none"
                value={authority.ioDesignation}
                onChange={e => setAuthority({...authority, ioDesignation: e.target.value})}
              />
            </div>
          </div>
          
          {!isAuthorityValid && (
            <div className="px-6 pb-6">
              <div className="border border-[#E5D2AF] bg-[#FAF3E5] rounded-xl p-3.5 flex items-start shadow-none">
                <AlertCircle className="w-5 h-5 text-[#B08D57] mt-0.5 mr-3 shrink-0" />
                <p className="text-xs sm:text-sm font-medium text-[#7D5514] leading-relaxed">
                  You must establish lawful authority before seeding addresses into the graph engine.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Seed Address Configuration Card */}
        <div className={`transition-all duration-300 ${!isAuthorityValid ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <div className="nova-glass-card rounded-[28px] overflow-hidden shadow-md border border-[#E5DACB]">
            <div className="bg-[#F2EAE0]/70 px-6 py-4 border-b border-[#E5DACB] flex items-center">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mr-3 shadow-sm bg-[#FAF5EE] border border-[#E2D6C5]">
                <Link2 className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[#2A211C] font-sans">
                Seed Address Configuration
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-2 relative">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#2A211C] font-sans">
                  Target Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-[#B08D57]" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Bitcoin or Ethereum address..."
                    className="w-full nova-glass-input rounded-xl pl-12 pr-4 py-3.5 text-sm font-mono font-semibold text-[#2A211C] placeholder:text-[#A19488] focus:outline-none"
                    value={seedAddress}
                    onChange={e => setSeedAddress(e.target.value)}
                  />
                  {detectedChain && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shadow-none ${
                        detectedChain === 'Bitcoin' ? 'bg-[#FAF0E1] text-[#8A5C14] border-[#E6D4AF]' : 
                        detectedChain === 'Ethereum' ? 'bg-[#F5ECE8] text-[#7A2824] border-[#DFC4BE]' : 
                        'bg-[#ECE6DE] text-[#594F47] border-[#D9D0C5]'
                      }`}>
                        {detectedChain}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-[#857468] mt-2">
                  Auto-detects Bitcoin (Base58/Bech32/Bech32m) and Ethereum (0x).
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => {
                    if (onInitialize) onInitialize();
                  }}
                  disabled={!isAuthorityValid || !seedAddress.trim()}
                  className="nova-btn-primary font-bold px-7 py-3.5 rounded-full flex items-center space-x-2 text-xs tracking-wider uppercase transition-all"
                >
                  <span>INITIALIZE GRAPH ENGINE</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

