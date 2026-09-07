"use client";

import React from 'react';
import { Shield, LayoutDashboard, Search, FileText, Settings, LogOut, AlertTriangle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen nova-luminous-bg text-[#2A211C] font-sans flex overflow-hidden">
      
      {/* Editorial Beige/Cream Sidebar */}
      <aside className="w-64 nova-glass-card border-r border-[#E5DACB] flex flex-col z-20 shrink-0 shadow-lg">
        
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-[#E5DACB]">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center mr-3 shadow-sm bg-[#6B1E24] text-[#FAF5EE] border border-[#54171C]">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-[0.2em] text-[#5C1A1B] uppercase leading-tight select-none">
              PHANTASM
            </span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link 
            href="#" 
            className="flex items-center px-4 py-3 bg-[#EDE3D4] text-[#5C1A1B] border border-[#DFD2C0] font-bold shadow-sm rounded-2xl group transition-all"
          >
            <LayoutDashboard className="w-5 h-5 mr-3 text-[#B08D57]" />
            <span className="text-sm font-bold tracking-wide">Dashboard</span>
            <Sparkles className="w-3.5 h-3.5 ml-auto text-[#B08D57] animate-pulse" />
          </Link>
          
          <Link 
            href="#" 
            className="flex items-center px-4 py-3 text-[#756557] hover:text-[#5C1A1B] hover:bg-[#FAF4EC]/80 rounded-2xl transition-colors group"
          >
            <Search className="w-5 h-5 mr-3 text-[#99877A] group-hover:text-[#B08D57]" />
            <span className="text-sm font-semibold">Global Search</span>
          </Link>
          
          <Link 
            href="#" 
            className="flex items-center px-4 py-3 text-[#756557] hover:text-[#5C1A1B] hover:bg-[#FAF4EC]/80 rounded-2xl transition-colors group"
          >
            <FileText className="w-5 h-5 mr-3 text-[#99877A] group-hover:text-[#B08D57]" />
            <span className="text-sm font-semibold">Cases</span>
          </Link>
        </nav>
        
        {/* Settings */}
        <div className="p-4 border-t border-[#E5DACB]">
          <Link 
            href="#" 
            className="flex items-center px-4 py-3 text-[#756557] hover:text-[#5C1A1B] hover:bg-[#FAF4EC]/80 rounded-2xl transition-colors group"
          >
            <Settings className="w-5 h-5 mr-3 text-[#99877A] group-hover:text-[#B08D57]" />
            <span className="text-sm font-semibold">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* DEEP TAUPE/OLIVE MONOSPACE WARNING BAR */}
        <div className="w-full bg-[#38322B] border-b border-[#2A251F] text-[#F5EDE4] px-4 py-2 flex items-center justify-center font-mono text-xs shadow-sm z-30">
          <AlertTriangle className="w-3.5 h-3.5 mr-2 shrink-0 text-[#C58B2B]" />
          <span className="font-semibold tracking-wide text-[#F5EDE4]">
            MOCK SIMULATION MODE — NOT CONNECTED TO PRODUCTION SAHYOG
          </span>
        </div>

        {/* Top Header */}
        <header className="h-16 nova-glass-card-subtle border-b border-[#E5DACB] flex items-center justify-end px-8 z-20">
          {/* Officer Session Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-[#2A211C]">Offc. A. Sharma (IO)</span>
              <span className="text-xs text-[#B08D57] font-mono font-bold">ID: SHM-8891-ND</span>
            </div>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center border border-[#52161A] bg-[#6B1E24] font-serif font-bold text-sm text-[#FAF5EE] shadow-sm">
              AS
            </div>
            <button className="p-2 text-[#8A7A6E] hover:text-[#5C1A1B] transition-colors ml-1" title="End Session">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 relative">
          {children}
        </main>
      </div>
      
    </div>
  );
}

