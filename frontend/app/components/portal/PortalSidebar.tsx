"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Search, 
  Network, 
  Users, 
  Building2, 
  FileText, 
  Settings, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface PortalSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function PortalSidebar({ activeTab, setActiveTab }: PortalSidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'investigation', label: 'Investigations', icon: Search, badge: 'ACTIVE' },
    { id: 'graph', label: 'Graph View', icon: Network },
    { id: 'entities', label: 'Entities', icon: Users },
    { id: 'vasps', label: 'VASPs', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#111A2E] border-r border-[#1E2D4A] flex flex-col z-20 shrink-0">
      <div className="p-4 border-b border-[#1E2D4A]">
        <div className="bg-[#0A0F1D] border border-cyan-500/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-bold">CYBER CRIME CELL</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1 font-sans">
            Specialized Crypto Forensics Platform
          </p>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#1E2D4A] text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,255,0.15)] font-bold'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer link to landing page */}
      <div className="p-4 border-t border-[#1E2D4A] bg-[#0A0F1D]/50">
        <Link
          href="/"
          className="flex items-center justify-center space-x-2 text-xs font-mono text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20 py-2.5 px-3 rounded-lg transition-all hover:bg-amber-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Cinematic Story Mode</span>
        </Link>
      </div>
    </aside>
  );
}
