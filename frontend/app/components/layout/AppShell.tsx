"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useInvestigationStore } from '@/app/lib/store';

import {
  Shield,
  LayoutDashboard,
  FolderPlus,
  Search,
  Network,
  Users,
  Building2,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Settings,
  LogOut,
  AlertTriangle,
  History,
  HelpCircle,
  FileCheck2,
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const {
    officerName,
    officerId,
    caseData,
    logout,
    auditEvents,
  } = useInvestigationStore();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/cases/new', label: 'New Case', icon: FolderPlus, badge: 'WIZARD' },
    { href: `/cases/${caseData.caseId}/overview`, label: 'Case Workspace', icon: FileText },
    { href: `/cases/${caseData.caseId}/traces/${caseData.caseId}-trace-1/graph`, label: 'Graph View', icon: Network },
    { href: '/paths', label: 'Path Comparison', icon: Layers },
    { href: '/confidence', label: 'Confidence Explainer', icon: HelpCircle },
    { href: '/evidence', label: 'Evidence & Proofs', icon: CheckCircle2, badge: '4/4' },
    { href: `/dossiers/PH-${caseData.caseId}`, label: 'Dossier Builder', icon: FileCheck2 },
    { href: `/requests/REQ-${caseData.caseId}`, label: 'Disclosure Request', icon: Building2 },
    { href: '/review', label: 'Analyst Review', icon: Users, badge: '1 QUEUED' },
    { href: `/approval/${caseData.caseId}`, label: 'Supervisor Sign-off', icon: ShieldCheck },
    { href: '/vasps', label: 'VASP Registry', icon: Building2 },
    { href: '/audit', label: 'Audit Log', icon: History },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050912] text-gray-100 font-sans flex overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#111A2E] border-r border-[#1E2D4A] flex flex-col z-20 shrink-0">
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1E2D4A]">
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <Shield className="w-7 h-7 text-cyan-400" />
            <div>
              <span className="font-extrabold text-base tracking-wider text-gray-100 block leading-none">PHANTASM</span>
              <span className="text-[9px] text-cyan-400 font-mono tracking-widest">GRAPH ENGINE</span>
            </div>
          </Link>
          <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold border border-cyan-500/30">
            DEMO
          </span>
        </div>

        {/* Active Case Badge */}
        <div className="p-3 border-b border-[#1E2D4A] bg-[#0A0F1D]/60">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-1">
            <span>ACTIVE CASE</span>
            <span className="text-amber-400 font-bold">{caseData.caseId}</span>
          </div>
          <div className="text-xs font-mono font-bold text-cyan-300 truncate">
            {caseData.targetAddress}
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1 pt-1 border-t border-gray-800">
            <span>Trace Value:</span>
            <span className="text-amber-400 font-bold">{caseData.traceValue}</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#1E2D4A] text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,255,0.15)] font-bold'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded font-bold shrink-0">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Cinematic Flow Link */}
        <div className="p-3 border-t border-[#1E2D4A] bg-[#0A0F1D]/60">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 text-xs font-mono text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20 py-2 px-3 rounded-lg transition-all hover:bg-amber-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cinematic Intro</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* NON-DISMISSIBLE DEMO CHIP */}
        <div className="w-full bg-[#FFB300]/15 border-b border-[#FFB300]/30 text-[#FFB300] px-4 py-1.5 flex items-center justify-between text-xs font-mono shadow-md z-30 shrink-0">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-[#FFB300] shrink-0" />
            <span className="font-bold">DEMO / MOCK ENVIRONMENT</span>
            <span className="text-gray-400 font-sans hidden md:inline">| SAHYOG Interoperability Layer v2.4</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="bg-[#FFB300]/20 px-2 py-0.5 rounded text-amber-300 font-semibold">SAHYOG COMPLIANT</span>
            <span className="text-cyan-400 font-bold">Sec 94 BNSS Active</span>
          </div>
        </div>

        {/* Header Bar */}
        <header className="h-14 bg-[#111A2E]/90 backdrop-blur-sm border-b border-[#1E2D4A] flex items-center justify-between px-6 z-20 shrink-0">
          <div className="flex items-center space-x-3 font-mono text-xs text-gray-400">
            <span>CASE: <strong className="text-amber-400">{caseData.caseId}</strong></span>
            <span>•</span>
            <span>STATUS: <strong className="text-cyan-400">{caseData.status}</strong></span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block font-mono">
              <div className="text-xs font-semibold text-gray-200">{officerName}</div>
              <div className="text-[10px] text-cyan-400">ID: {officerId}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1E2D4A] border border-cyan-500/40 flex items-center justify-center font-bold text-xs text-cyan-400">
              AS
            </div>
            <button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="p-1.5 text-gray-400 hover:text-amber-400 transition-colors"
              title="End Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative">
          {children}
        </main>
      </div>

    </div>
  );
}
