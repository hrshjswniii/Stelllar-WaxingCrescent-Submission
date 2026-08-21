import React, { useState, useEffect } from 'react';
import { Moon, ShieldCheck, Wallet, ChevronDown, Activity, ExternalLink } from 'lucide-react';
import { laceWalletService, PREPROD_NETWORK_ID } from '../services/laceWallet';
import { PREPROD_CONTRACT_CONFIG } from '../services/preprodContract';

export default function Header({ onOpenWalletModal }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    setWallet(laceWalletService.getWalletInfo());
    const unsubscribe = laceWalletService.subscribe((updatedWallet) => {
      setWallet(updatedWallet);
    });
    return unsubscribe;
  }, []);

  const formatAddr = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-dark)]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Milestone Tag */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/30 to-sky-500/20 border border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            <Moon className="w-6 h-6 text-purple-300 animate-pulse-glow" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--bg-dark)]" title="Network Active" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight gradient-text">Astraea ZK</h1>
              <span className="glass-pill text-xs text-purple-300 border-purple-500/30 bg-purple-500/10">
                Phase 2: Waxing Crescent
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mt-0.5">
              <span>Stellar FullMoon Challenge</span>
              <span>•</span>
              <span className="text-sky-400 font-mono">Preprod Testnet</span>
            </p>
          </div>
        </div>

        {/* Network & Wallet Controls */}
        <div className="flex items-center gap-3">
          
          {/* Preprod Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300">
            <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Preprod NetMagic #1</span>
          </div>

          {/* Wallet Connect/Disconnect Button */}
          {wallet ? (
            <button
              onClick={onOpenWalletModal}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-sm font-medium transition-all shadow-sm"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-purple-200">{wallet.name}</span>
                <span className="text-[11px] font-mono text-purple-300/70">{formatAddr(wallet.address)}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-purple-400 ml-1" />
            </button>
          ) : (
            <button
              onClick={onOpenWalletModal}
              className="btn-primary text-sm shadow-purple-600/20"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Lace Wallet</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
