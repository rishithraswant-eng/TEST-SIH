"use client";

import React, { useState } from 'react';
import AppShell from '@/app/components/layout/AppShell';
import { MOCK_VASPS } from '@/app/lib/mockData';

import { Building2, Search, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

export default function VaspRegistryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVasps = MOCK_VASPS.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.registration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="border-b border-[#1E2D4A] pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-white">SAHYOG VASP & INSTITUTIONAL REGISTRY</h1>
            <p className="text-xs text-gray-400 font-mono mt-1">
              Searchable registry of FIU-IND registered & SAHYOG onboarded Virtual Asset Service Providers.
            </p>
          </div>

          <div className="relative font-mono text-xs w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search VASP or FIU Reg..."
              className="w-full bg-[#0A0F1D] border border-[#1E2D4A] rounded-xl pl-9 pr-4 py-2 text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="bg-[#111A2E] border border-[#1E2D4A] rounded-2xl p-6 shadow-xl font-mono text-xs overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0A0F1D] text-gray-400 border-b border-[#1E2D4A]">
              <tr>
                <th className="p-3">VASP NAME</th>
                <th className="p-3">REGISTRATION</th>
                <th className="p-3">SAHYOG STATUS</th>
                <th className="p-3">JURISDICTION</th>
                <th className="p-3">NODAL OFFICER</th>
                <th className="p-3">KNOWN CLUSTERS</th>
                <th className="p-3">VERIFIED ON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredVasps.map((v) => (
                <tr key={v.id} className="hover:bg-white/5">
                  <td className="p-3 text-cyan-400 font-bold flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{v.name}</span>
                  </td>
                  <td className="p-3 text-gray-300">{v.registration}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      v.sahyogStatus === 'ONBOARDED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}>
                      {v.sahyogStatus}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300">{v.jurisdiction}</td>
                  <td className="p-3 text-gray-400">{v.nodalOfficer}</td>
                  <td className="p-3 text-amber-400 font-bold">{v.knownAddresses.toLocaleString()} addrs</td>
                  <td className="p-3 text-gray-500">{v.verifiedOn} {v.isStale && <span className="text-amber-400 font-bold">(STALE)</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
