"use client";

import { useState } from "react";

interface SignOffPanelProps {
  confidenceScore: number;
  recipientDesignation: string;
  onSignOff: (mfaCode: string) => void;
}

export default function SignOffPanel({ confidenceScore, recipientDesignation, onSignOff }: SignOffPanelProps) {
  const [totp, setTotp] = useState("");

  const handleSignOff = () => {
    if (totp.length === 6) {
      onSignOff(totp);
    }
  };

  return (
    <div className="p-7 nova-glass-card rounded-[28px] border border-[#E5DACB] shadow-lg max-w-lg mx-auto space-y-5">
      <h2 className="text-xl font-serif font-semibold text-[#5C1A1B] border-b border-[#E5DACB] pb-3">
        Supervisor SAHYOG Sign-Off
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3.5 bg-[#FAF5EE] rounded-xl border border-[#E5DACB]">
          <span className="text-[#736357] text-xs uppercase tracking-wider font-bold">Algorithmic Confidence</span>
          <span className={`font-mono font-bold ${confidenceScore >= 0.85 ? 'text-[#4B5E40]' : 'text-[#8A5C14]'}`}>
            {(confidenceScore * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3.5 bg-[#FAF5EE] rounded-xl border border-[#E5DACB]">
          <span className="text-[#736357] text-xs uppercase tracking-wider font-bold">Named Recipient</span>
          <span className="text-[#2A211C] font-semibold text-sm">{recipientDesignation}</span>
        </div>
      </div>

      <div className="p-4 bg-[#F5ECE8] border border-[#DFC4BE] rounded-xl">
        <p className="text-xs font-medium text-[#7D2924] mb-3 leading-relaxed">
          To authorize this dispatch, please re-authenticate using your MFA token. This action will be immutably recorded in the audit log.
        </p>
        <input 
          type="text" 
          value={totp}
          onChange={(e) => setTotp(e.target.value)}
          placeholder="6-digit MFA"
          className="w-full nova-glass-input rounded-xl px-4 py-3 text-sm font-mono tracking-widest text-[#2A211C] placeholder:text-[#A19488] focus:outline-none"
          maxLength={6}
        />
      </div>

      <button 
        onClick={handleSignOff}
        disabled={totp.length !== 6}
        className="w-full py-3.5 nova-btn-primary font-bold text-xs tracking-wider uppercase rounded-full shadow-md transition"
      >
        Authorize SAHYOG Dispatch
      </button>
    </div>
  );
}

