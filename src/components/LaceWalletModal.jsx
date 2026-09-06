import React, { useState, useEffect } from 'react';
import { X, Wallet, CheckCircle2, Copy, LogOut, ExternalLink, ShieldAlert, Sparkles, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { laceWalletService, MOCK_LACE_WALLET } from '../services/laceWallet';
import { PREPROD_CONTRACT_CONFIG } from '../services/preprodContract';

export default function LaceWalletModal({ isOpen, onClose }) {
  const [wallet, setWallet] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copied, setCopied] = useState(false);
  const [availableWallets, setAvailableWallets] = useState([]);

  const refreshWallets = () => {
    setWallet(laceWalletService.getWalletInfo());
    setAvailableWallets(laceWalletService.getAvailableWallets());
  };

  useEffect(() => {
    if (isOpen) {
      refreshWallets();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnect = async (walletId, forceMock = false) => {
    setConnecting(true);
    setStatusNotice(null);
    setErrorMessage(null);
    try {
      const res = await laceWalletService.connect(walletId, forceMock);
      if (res.success) {
        setWallet(res.wallet);
        if (res.notice) {
          setStatusNotice(res.notice);
        }
      } else {
        setErrorMessage(res.error || 'Connection failed. Please unlock your Lace Wallet extension and try again.');
      }
    } catch (err) {
      setErrorMessage(`Connection error: ${err.message || 'Failed to connect'}`);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    laceWalletService.disconnect();
    setWallet(null);
    setStatusNotice(null);
    setErrorMessage(null);
  };

  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card w-full max-w-md p-6 relative overflow-hidden border border-purple-500/30 shadow-[0_0_50px_rgba(147,51,234,0.2)]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Lace Wallet Connector</h2>
              <p className="text-xs text-[var(--text-muted)]">Cardano CIP-30 & Midnight DApp Connector API</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-4">
          {wallet ? (
            /* Connected State */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-purple-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Connected to {wallet.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 font-mono">
                    {wallet.network}
                  </span>
                </div>

                {/* Address Box */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block mb-1">
                    Preprod Bech32 Wallet Address
                  </label>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] font-mono text-xs text-purple-200">
                    <span className="truncate">{wallet.address}</span>
                    <button 
                      onClick={copyAddress}
                      className="p-1 hover:bg-white/10 rounded text-purple-400 hover:text-purple-200 shrink-0"
                      title="Copy Address"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Midnight DApp Connector Indicator */}
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Midnight DApp Connector API:
                  </span>
                  <span className="text-emerald-400 font-bold">READY / ACTIVE</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-500/20 text-xs">
                  <div>
                    <span className="text-slate-400 block">Balance:</span>
                    <span className="font-mono font-bold text-emerald-400">{wallet.balanceAda.toLocaleString()} tADA</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">UTXO Inputs:</span>
                    <span className="font-mono font-semibold text-slate-200">{wallet.utxoCount} UTXOs</span>
                  </div>
                </div>
              </div>

              {statusNotice && (
                <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-mono">
                  {statusNotice}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a 
                  href={`${PREPROD_CONTRACT_CONFIG.explorerUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary flex-1 text-xs justify-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Cardanoscan Preprod</span>
                </a>
                <button 
                  onClick={handleDisconnect}
                  className="btn-secondary text-xs text-rose-400 hover:text-rose-300 border-rose-500/30 hover:border-rose-500/50 justify-center px-4"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          ) : (
            /* Disconnected State: Select Provider */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Connect your Lace Wallet browser extension to interact with Cardano Preprod Testnet.</span>
                <button 
                  onClick={refreshWallets}
                  className="p-1 text-slate-400 hover:text-purple-300 transition"
                  title="Rescan Wallets"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Error Alert Box if any */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-rose-200">Connection Issue</div>
                    <div>{errorMessage}</div>
                  </div>
                </div>
              )}

              {/* Extension Options */}
              <div className="space-y-2">
                {/* Dynamically list detected extensions if available */}
                {availableWallets.length > 0 ? (
                  availableWallets.map(w => (
                    <button
                      key={w.id}
                      onClick={() => handleConnect(w.id)}
                      disabled={connecting}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 hover:border-purple-500/70 transition group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-lg">
                          🌙
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-purple-100 group-hover:text-white flex items-center gap-2">
                            <span>{w.name}</span>
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">Installed</span>
                          </div>
                          <div className="text-xs text-purple-300/70">CIP-30 Cardano Provider (v{w.apiVersion})</div>
                        </div>
                      </div>
                      {connecting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                      ) : (
                        <span className="text-xs font-mono text-purple-400 bg-purple-500/20 px-2 py-1 rounded">Connect</span>
                      )}
                    </button>
                  ))
                ) : (
                  <button
                    onClick={() => handleConnect('lace')}
                    disabled={connecting}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 hover:border-purple-500/60 transition group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-lg">
                        🌙
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-purple-100 group-hover:text-white">Lace Wallet (Cardano / Midnight)</div>
                        <div className="text-xs text-purple-300/70">Official IOG Browser Extension</div>
                      </div>
                    </div>
                    {connecting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    ) : (
                      <span className="text-xs font-mono text-purple-400 bg-purple-500/20 px-2 py-1 rounded">CIP-30</span>
                    )}
                  </button>
                )}

                {/* Preprod Simulator Option */}
                <button
                  onClick={() => handleConnect('mock', true)}
                  disabled={connecting}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-sky-950/30 hover:bg-sky-900/40 border border-sky-500/30 hover:border-sky-500/60 transition group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-sky-100 group-hover:text-white">Lace Preprod Simulator</div>
                      <div className="text-xs text-sky-300/70">Instant Demo Mode for Verification</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-sky-400 bg-sky-500/20 px-2 py-1 rounded">Preprod</span>
                </button>
              </div>

              {statusNotice && (
                <div className="p-3 rounded-lg bg-purple-950/50 border border-purple-500/30 text-purple-200 text-xs font-mono">
                  {statusNotice}
                </div>
              )}

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex gap-2 items-start mt-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Ensure your Lace wallet is set to <strong>Preprod Testnet</strong> mode before executing transactions.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[var(--border-subtle)] text-center">
          <span className="text-[11px] text-[var(--text-muted)] font-mono">
            Stellar FullMoon • Waxing Crescent Phase 2
          </span>
        </div>

      </div>
    </div>
  );
}
