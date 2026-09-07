"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, FileText } from "lucide-react";

type AuditLog = {
  id: string;
  userId: string;
  role: string;
  action: string;
  targetCase: string;
  timestamp: string;
  integrityValid: boolean;
};

const MOCK_LOGS: AuditLog[] = [
  { id: "A-1092", userId: "IO-10492", role: "OFFICER", action: "POST /cases/123/trace", targetCase: "CASE-123", timestamp: "2026-09-01T10:23:44Z", integrityValid: true },
  { id: "A-1093", userId: "SUP-001", role: "SUPERVISOR", action: "POST /cases/123/dispatch", targetCase: "CASE-123", timestamp: "2026-09-01T10:45:11Z", integrityValid: true },
];

export default function AuditExplorer() {
  const [filterCase, setFilterCase] = useState("");
  const [filterUser, setFilterUser] = useState("");

  const filteredLogs = MOCK_LOGS.filter(log => 
    (filterCase === "" || log.targetCase.includes(filterCase)) &&
    (filterUser === "" || log.userId.includes(filterUser))
  );

  return (
    <div className="p-8 warm-editorial-bg min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-serif font-semibold text-[#5C1A1B] flex items-center gap-3">
          <FileText className="w-7 h-7 text-[#B08D57]" />
          Audit Log Explorer
        </h1>

        {/* Filters */}
        <div className="flex gap-4 p-5 nova-glass-card rounded-2xl border border-[#E5DACB]">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2A211C] mb-1.5">Filter by Case</label>
            <input 
              type="text" 
              value={filterCase}
              onChange={(e) => setFilterCase(e.target.value)}
              placeholder="e.g. CASE-123"
              className="nova-glass-input rounded-xl px-4 py-2 text-sm text-[#2A211C] placeholder:text-[#A19488]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-[#2A211C] mb-1.5">Filter by User</label>
            <input 
              type="text" 
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              placeholder="e.g. IO-10492"
              className="nova-glass-input rounded-xl px-4 py-2 text-sm text-[#2A211C] placeholder:text-[#A19488]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="nova-glass-card rounded-2xl border border-[#E5DACB] overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm text-[#2A211C]">
            <thead className="bg-[#F2EAE0]/80 text-[#736357] text-xs uppercase font-bold tracking-wider border-b border-[#E5DACB]">
              <tr>
                <th className="px-6 py-3.5 font-bold">Log ID</th>
                <th className="px-6 py-3.5 font-bold">Timestamp (UTC)</th>
                <th className="px-6 py-3.5 font-bold">User / Role</th>
                <th className="px-6 py-3.5 font-bold">Action</th>
                <th className="px-6 py-3.5 font-bold">Case</th>
                <th className="px-6 py-3.5 font-bold text-center">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DACB]">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#FAF5EE]/60 transition">
                  <td className="px-6 py-4 font-mono font-semibold text-[#5C1A1B]">{log.id}</td>
                  <td className="px-6 py-4 text-[#736357] font-mono text-xs">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#2A211C]">{log.userId}</div>
                    <div className="text-xs text-[#8A7B70]">{log.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs bg-[#FAF5EE] text-[#5C1A1B] rounded px-2 py-1 border border-[#E5DACB]">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#B08D57]">{log.targetCase}</td>
                  <td className="px-6 py-4 text-center">
                    {log.integrityValid ? (
                      <span className="inline-flex items-center gap-1 text-[#4B5E40] px-2.5 py-1 rounded-full bg-[#F2F5EE] border border-[#D5DFC8] text-xs font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#5A734C]" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[#7D2924] px-2.5 py-1 rounded-full bg-[#F5ECE8] border border-[#DFC4BE] text-xs font-bold">
                        <ShieldAlert className="w-3.5 h-3.5 text-[#7D2924]" />
                        Corrupt
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#8A7B70]">
                    No matching audit records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

