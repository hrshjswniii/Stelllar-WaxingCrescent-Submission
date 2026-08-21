import React from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle, HelpCircle, ArrowRight, Zap } from 'lucide-react';

export default function PrivacyBehaviorDemo({ privateInputs, targetCommitment }) {
  return (
    <div className="glass-card p-6 border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.15)] relative overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-sky-500/20 border border-purple-500/30 text-purple-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Observable Privacy Behavior</span>
              <span className="glass-pill text-[11px] text-emerald-300 border-emerald-500/30 bg-emerald-500/10">
                Zero-Knowledge Proof
              </span>
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Proving qualification eligibility without revealing private sensitive data
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Client Private Vault */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-rose-500/20 relative group">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-500/20">
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Private Vault (Client-Side Only)
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
              NEVER TRANSMITTED
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Secret Identity PIN:</span>
              <span className="font-bold text-rose-400">{privateInputs.secretPin || '9842'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Exact User Age:</span>
              <span className="font-bold text-rose-400">{privateInputs.userAge || '24'} Years Old</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Exact Credit Score:</span>
              <span className="font-bold text-rose-400">{privateInputs.creditScore || '780'} Points</span>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-rose-300/70 italic flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>These values remain inside your browser and are never uploaded to any server or blockchain.</span>
          </p>
        </div>

        {/* Right Side: Public Observable On-Chain View */}
        <div className="p-5 rounded-2xl bg-purple-950/20 border border-emerald-500/30 relative">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Verifier & Smart Contract View
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              PUBLICLY OBSERVABLE
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-slate-300">Identity Commitment:</span>
              <span className="font-semibold text-sky-400 truncate max-w-[160px]" title={targetCommitment}>
                {targetCommitment ? `${targetCommitment.slice(0, 10)}...` : '0x7f83a910...'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-slate-300">Claim 1 (Age ≥ 18):</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> PROVEN (TRUE)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-slate-300">Claim 2 (Score ≥ 700):</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> PROVEN (TRUE)
              </span>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-emerald-300/80 italic flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>The verifier mathematically confirms qualification without acquiring any private numbers.</span>
          </p>
        </div>

      </div>

    </div>
  );
}
