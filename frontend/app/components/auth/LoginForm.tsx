"use client";

import { useState } from "react";

export default function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Integration logic stub
    if (!userId || !password || !totp) {
      setError("Please fill in all fields including MFA code.");
      return;
    }
    // Proceed to authenticate with backend...
  };

  return (
    <div className="flex items-center justify-center min-h-screen warm-editorial-bg p-4">
      <div className="p-8 nova-glass-card rounded-3xl w-full max-w-md border border-[#E5DACB] shadow-lg">
        <h1 className="text-2xl font-serif font-semibold text-[#5C1A1B] mb-6 text-center">
          PHANTASM Secure Login
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-[#F5ECE8] border border-[#DFC4BE] rounded-xl text-[#7D2924] text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#2A211C] text-xs uppercase tracking-wider font-bold mb-1.5">
              User ID / Badge Number
            </label>
            <input 
              type="text" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full nova-glass-input rounded-xl px-4 py-3 text-sm font-semibold text-[#2A211C] placeholder:text-[#A19488] focus:outline-none" 
              placeholder="e.g. IO-10492"
            />
          </div>

          <div>
            <label className="block text-[#2A211C] text-xs uppercase tracking-wider font-bold mb-1.5">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full nova-glass-input rounded-xl px-4 py-3 text-sm font-semibold text-[#2A211C] placeholder:text-[#A19488] focus:outline-none" 
            />
          </div>

          <div>
            <label className="block text-[#2A211C] text-xs uppercase tracking-wider font-bold mb-1.5">
              MFA Authenticator Code
            </label>
            <input 
              type="text" 
              value={totp}
              onChange={(e) => setTotp(e.target.value)}
              className="w-full nova-glass-input rounded-xl px-4 py-3 text-sm font-mono tracking-widest text-[#2A211C] placeholder:text-[#A19488] focus:outline-none" 
              placeholder="000 000"
              maxLength={6}
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-6 py-3.5 nova-btn-primary font-bold rounded-full text-xs tracking-wider uppercase shadow-md transition duration-200"
          >
            Authenticate & Proceed
          </button>
        </form>
      </div>
    </div>
  );
}

