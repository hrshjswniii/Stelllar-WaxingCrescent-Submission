import React, { useState } from 'react';
import Header from './components/Header';
import LaceWalletModal from './components/LaceWalletModal';
import PrivacyBehaviorDemo from './components/PrivacyBehaviorDemo';
import CircuitRunner from './components/CircuitRunner';
import ContractInspector from './components/ContractInspector';
import { Moon, ShieldCheck, CheckCircle2, Cpu, ExternalLink, Sparkles, GitCommit, Play, Layers } from 'lucide-react';
import { PREPROD_CONTRACT_CONFIG } from './services/preprodContract';

export default function App() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [targetCommitment, setTargetCommitment] = useState('');
  
  const [privateInputs, setPrivateInputs] = useState({
    secretPin: '9842',
    userAge: 24,
    creditScore: 780
  });

  const [proofHistory, setProofHistory] = useState([]);

  const handleProofGenerated = (proofObj) => {
    setProofHistory(prev => [proofObj, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Navigation Header */}
      <Header onOpenWalletModal={() => setIsWalletModalOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Banner */}
        <section className="glass-card p-8 border-purple-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="glass-pill text-xs text-purple-300 border-purple-500/30 bg-purple-500/10 font-mono">
                🌙 Stellar FullMoon • Phase 2
              </span>
              <span className="glass-pill text-xs text-sky-300 border-sky-500/30 bg-sky-500/10 font-mono">
                Waxing Crescent Submission
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Astraea Zero-Knowledge <br />
              <span className="gradient-text">Privacy & Verification Engine</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Demonstrating observable client-side privacy proofs on Cardano Preprod Testnet with Lace Wallet integration, BN254 Groth16 witness calculation, and on-chain contract verification.
            </p>

            {/* Quick Requirement Pass Checklist Badge */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium">
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-2 text-purple-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1. Lace Wallet CIP-30</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-2 text-purple-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2. ZK Circuit Execution</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-2 text-purple-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3. Observable Privacy</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-2 text-purple-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>4. Preprod Deployed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Observable Privacy Behavior */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Requirement 3: Observable Privacy Behavior</span>
          </div>
          <PrivacyBehaviorDemo 
            privateInputs={privateInputs}
            targetCommitment={targetCommitment}
          />
        </section>

        {/* Section 2: ZK Proving Circuit Runner */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-sky-300 font-mono">
            <Cpu className="w-4 h-4 text-sky-400" />
            <span>Requirement 2: Frontend Circuit Execution</span>
          </div>
          <CircuitRunner 
            privateInputs={privateInputs}
            setPrivateInputs={setPrivateInputs}
            onProofGenerated={handleProofGenerated}
            setTargetCommitment={setTargetCommitment}
          />
        </section>

        {/* Section 3: Preprod Smart Contract Inspector */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300 font-mono">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Requirement 4: Deployed Preprod Smart Contract</span>
          </div>
          <ContractInspector />
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[var(--border-subtle)] bg-[var(--bg-dark)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400" />
            <span>Stellar FullMoon Challenge • Phase 2 (Waxing Crescent)</span>
          </div>
          <div className="font-mono flex items-center gap-4">
            <span>Preprod NetMagic #1</span>
            <span>•</span>
            <a 
              href={PREPROD_CONTRACT_CONFIG.explorerUrl}
              target="_blank" 
              rel="noreferrer"
              className="hover:text-purple-300 transition"
            >
              Preprod Address: addr_test1wz80h...
            </a>
          </div>
        </div>
      </footer>

      {/* Lace Wallet Modal */}
      <LaceWalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />

    </div>
  );
}
