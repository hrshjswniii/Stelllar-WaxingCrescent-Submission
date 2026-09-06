import React, { useState } from 'react';
import { FileCode, ExternalLink, CheckCircle2, Copy, Shield, Database, Hash, Sparkles } from 'lucide-react';
import { PREPROD_CONTRACT_CONFIG, preprodContractService } from '../services/preprodContract';

export default function ContractInspector() {
  const [copied, setCopied] = useState(false);
  const history = preprodContractService.getVerificationHistory();

  const copyAddr = () => {
    navigator.clipboard.writeText(PREPROD_CONTRACT_CONFIG.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.15)] space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Preprod Smart Contract Inspector</span>
              <span className="glass-pill text-[11px] text-purple-300 border-purple-500/30 bg-purple-500/10 font-mono">
                {PREPROD_CONTRACT_CONFIG.contractName}
              </span>
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Verifiable Aiken validator deployed on Cardano Preprod Testnet
            </p>
          </div>
        </div>

        <a
          href={PREPROD_CONTRACT_CONFIG.explorerUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary text-xs px-3 py-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Explorer</span>
        </a>
      </div>

      {/* Details Box */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-3 font-mono text-xs">
        
        {/* Address Row */}
        <div>
          <label className="text-[11px] uppercase tracking-wider text-slate-400 font-sans font-medium block mb-1">
            Verifiable Preprod Contract Address
          </label>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] text-purple-200">
            <span className="truncate mr-2">{PREPROD_CONTRACT_CONFIG.address}</span>
            <button
              onClick={copyAddr}
              className="p-1 hover:bg-white/10 rounded text-purple-400 hover:text-purple-200 shrink-0 font-sans"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">Policy / Script Hash:</span>
            <span className="text-[11px] text-sky-300 truncate block">{PREPROD_CONTRACT_CONFIG.scriptHash.slice(0, 16)}...</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">Compiler & Language:</span>
            <span className="text-[11px] text-emerald-300 block">{PREPROD_CONTRACT_CONFIG.compiler}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">Network Environment:</span>
            <span className="text-[11px] text-purple-300 block">{PREPROD_CONTRACT_CONFIG.network}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
            <span className="text-[10px] text-emerald-400 font-sans block">Midnight Network Provider:</span>
            <span className="text-[11px] text-emerald-300 block font-bold">Indexer Provider Active</span>
          </div>
        </div>

      </div>

      {/* Verified On-Chain Transactions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-purple-400" />
            <span>Recent On-Chain Proof Verifications</span>
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            {history.length} Record(s) Logged
          </span>
        </div>

        <div className="space-y-2">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.status}
                  </span>
                  <span className="text-slate-400 text-[11px]">Block #{item.blockNo}</span>
                </div>
                <div className="text-sky-300 text-[11px] truncate max-w-xs sm:max-w-md">
                  Tx: {item.txHash}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] text-slate-400">
                <span>Fee: {item.feeAda} tADA</span>
                <a
                  href={`${PREPROD_CONTRACT_CONFIG.txExplorerPrefix}${item.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 hover:text-purple-300 p-1 hover:bg-purple-500/10 rounded font-sans"
                  title="View Transaction on Cardanoscan"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
