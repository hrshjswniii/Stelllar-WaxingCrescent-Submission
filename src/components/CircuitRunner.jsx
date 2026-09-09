import React, { useState, useEffect } from 'react';
import { Cpu, Play, CheckCircle2, AlertCircle, Loader2, KeyRound, UserCheck, ShieldCheck, ArrowRight, FileCode2, Send } from 'lucide-react';
import { zkProver } from '../services/zkCircuitProver';
import { preprodContractService } from '../services/preprodContract';
import { laceWalletService } from '../services/laceWallet';

export default function CircuitRunner({ privateInputs, setPrivateInputs, onProofGenerated, setTargetCommitment }) {
  const [minAge, setMinAge] = useState(18);
  const [minCreditScore, setMinCreditScore] = useState(700);

  const [isRunning, setIsRunning] = useState(false);
  const [progressLogs, setProgressLogs] = useState([]);
  const [proofResult, setProofResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [submittingOnChain, setSubmittingOnChain] = useState(false);
  const [onChainTx, setOnChainTx] = useState(null);
  const [onChainError, setOnChainError] = useState(null);

  // Automatically compute target commitment whenever secretPin changes
  useEffect(() => {
    async function updateHash() {
      if (privateInputs.secretPin) {
        const hash = await zkProver.computeCommitment(privateInputs.secretPin);
        setTargetCommitment(hash);
      }
    }
    updateHash();
  }, [privateInputs.secretPin, setTargetCommitment]);

  const handleInputChange = (field, val) => {
    setPrivateInputs(prev => ({ ...prev, [field]: val }));
    setProofResult(null);
    setErrorMsg(null);
    setOnChainTx(null);
    setOnChainError(null);
  };

  const runCircuit = async () => {
    setIsRunning(true);
    setProgressLogs([]);
    setErrorMsg(null);
    setProofResult(null);
    setOnChainTx(null);

    const publicInputs = {
      minAge: Number(minAge),
      minCreditScore: Number(minCreditScore),
    };

    try {
      const result = await zkProver.executeCircuit(
        privateInputs,
        publicInputs,
        (logObj) => {
          setProgressLogs(prev => [...prev, logObj]);
        }
      );

      if (result.success) {
        setProofResult(result);
        if (onProofGenerated) onProofGenerated(result);
      } else {
        setErrorMsg(result.error);
      }
    } catch (err) {
      setErrorMsg(err.message || "Circuit execution failed.");
    } finally {
      setIsRunning(false);
    }
  };

  const submitToPreprodContract = async () => {
    if (!proofResult) return;
    setSubmittingOnChain(true);
    setOnChainError(null);

    try {
      const wallet = laceWalletService.getWalletInfo();
      const address = wallet?.address;
      const res = await preprodContractService.submitProofOnChain(proofResult, address);
      setOnChainTx(res);
    } catch (err) {
      setOnChainError(err.message || 'Preprod submission is not configured.');
    } finally {
      setSubmittingOnChain(false);
    }
  };

  return (
    <div className="glass-card p-6 border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.15)] space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Frontend ZK Proving Circuit</span>
              <span className="glass-pill text-[11px] text-sky-300 border-sky-500/30 bg-sky-500/10 font-mono">
                WaxingCrescentPrivacyProof.circom
              </span>
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              BN254 Groth16 witness calculation & proof matrix generation
            </p>
          </div>
        </div>
      </div>

      {/* Input Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Private Inputs */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-purple-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-purple-400" />
              <span>Private Witness Inputs</span>
            </label>
            <span className="text-[10px] text-slate-400 font-mono">Client-Side Witness</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Secret Identity PIN:</span>
              <input
                type="password"
                value={privateInputs.secretPin}
                onChange={(e) => handleInputChange('secretPin', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-purple-500 text-purple-200 font-mono text-xs outline-none"
                placeholder="Enter secret PIN"
              />
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Exact User Age:</span>
              <input
                type="number"
                value={privateInputs.userAge}
                onChange={(e) => handleInputChange('userAge', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-purple-500 text-purple-200 font-mono text-xs outline-none"
              />
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Exact Credit Score:</span>
              <input
                type="number"
                value={privateInputs.creditScore}
                onChange={(e) => handleInputChange('creditScore', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-purple-500 text-purple-200 font-mono text-xs outline-none"
              />
            </div>
          </div>
        </div>

        {/* Public Constraints */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-sky-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-sky-400" />
              <span>Public Verification Thresholds</span>
            </label>
            <span className="text-[10px] text-slate-400 font-mono">Verifier Constraints</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Minimum Age Required:</span>
              <input
                type="number"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-sky-500 text-sky-200 font-mono text-xs outline-none"
              />
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Minimum Credit Score Required:</span>
              <input
                type="number"
                value={minCreditScore}
                onChange={(e) => setMinCreditScore(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] focus:border-sky-500 text-sky-200 font-mono text-xs outline-none"
              />
            </div>
            <div className="pt-2">
              <button
                onClick={runCircuit}
                disabled={isRunning}
                className="btn-primary w-full justify-center text-xs py-2.5"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
                    <span>Calculating Witness & Proof...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Execute ZK Proving Circuit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Execution Logs */}
      {progressLogs.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950/90 border border-purple-500/20 font-mono text-xs space-y-2">
          <div className="text-purple-300 font-semibold flex items-center justify-between">
            <span>Prover Terminal Execution Stream</span>
            {isRunning && <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />}
          </div>
          <div className="space-y-1 text-slate-300">
            {progressLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px]">
                <span className="text-purple-400 font-bold">[{log.step}/4]</span>
                <span>{log.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error View */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex gap-2.5 items-start">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-rose-200">Circuit Execution Failed</div>
            <div className="mt-0.5">{errorMsg}</div>
          </div>
        </div>
      )}

      {/* Proof Success & On-Chain Submit */}
      {proofResult && proofResult.success && (
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-200">ZK Proof Generated & Verified Successfully!</span>
            </div>
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
              Completed in {proofResult.elapsedSeconds}s
            </span>
          </div>

          {/* Proof Payload Matrix */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-slate-300 text-[11px] font-semibold uppercase">Groth16 Proof Points (BN254):</div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] space-y-1 text-slate-400">
              <div><strong className="text-purple-300">pi_a:</strong> {proofResult.proof.pi_a[0].slice(0, 30)}...</div>
              <div><strong className="text-purple-300">pi_b:</strong> [{proofResult.proof.pi_b[0][0].slice(0, 24)}..., {proofResult.proof.pi_b[1][0].slice(0, 24)}...]</div>
              <div><strong className="text-purple-300">pi_c:</strong> {proofResult.proof.pi_c[0].slice(0, 30)}...</div>
            </div>
          </div>

          {/* Submit On-Chain Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-emerald-300/80">
              Ready to submit Groth16 proof to Preprod Smart Contract validator.
            </div>
            <button
              onClick={submitToPreprodContract}
              disabled={submittingOnChain}
              className="btn-primary text-xs py-2 px-4 shadow-emerald-500/20"
            >
              {submittingOnChain ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting to Preprod...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Proof On-Chain</span>
                </>
              )}
            </button>
          </div>

          {/* On-Chain Result */}
          {onChainTx && (
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-purple-300 font-bold">
                <span>On-Chain Preprod Tx Confirmed!</span>
                <span className="text-[10px] text-emerald-400 font-sans px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                  Block #{onChainTx.blockNo}
                </span>
              </div>
              <div className="text-[11px] text-purple-200/90 truncate">
                Tx Hash: <span className="text-sky-300">{onChainTx.txHash}</span>
              </div>
              <a
                href={onChainTx.explorerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1 font-sans"
              >
                View on Cardanoscan Preprod Explorer &rarr;
              </a>
            </div>
          )}

          {onChainError && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <strong>On-chain submission unavailable:</strong> {onChainError}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
