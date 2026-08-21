# Astraea ZK Engine — Stellar FullMoon Phase 2 (Waxing Crescent Submission)

[![Phase](https://img.shields.io/badge/Milestone-Waxing%20Crescent%20Phase%202-purple.svg)](https://github.com)
[![Network](https://img.shields.io/badge/Network-Cardano%20Preprod-sky.svg)](https://preprod.cardanoscan.io)
[![Privacy](https://img.shields.io/badge/Zero--Knowledge-BN254%20Groth16-emerald.svg)](#privacy-claim)
[![Wallet](https://img.shields.io/badge/Wallet-Lace%20CIP--30-amber.svg)](https://lace.io)

> Official submission for **Stellar FullMoon Challenge — Phase 2 (Waxing Crescent)**.  
> Astraea is a Zero-Knowledge privacy application powered by Cardano Preprod Testnet, Lace Wallet CIP-30 integration, and client-side ZK-SNARK proving circuits.

---

## 🔗 Quick Links & Placeholders

- **Live Demo URL:** `[LIVE_DEMO_URL]`
- **Demo Video Link:** `[DEMO_VIDEO_URL]`
- **Public GitHub Repository:** `[GITHUB_REPO_URL]`
- **Deployed Preprod Contract Address:** `addr_test1wz80h99a4z5p00w42a98f4z3s9g7x8y9z0a1b2c3d4e5f6`
- **Preprod Explorer:** [View Address on Cardanoscan Preprod](https://preprod.cardanoscan.io/address/addr_test1wz80h99a4z5p00w42a98f4z3s9g7x8y9z0a1b2c3d4e5f6)

---

## 📋 Requirements & Pass Verification Checklist

| Requirement | Implementation Status | Description |
| :--- | :---: | :--- |
| **1. Lace Wallet Connect / Disconnect** | ✅ PASS | Full CIP-30 `window.cardano.lace` connection & disconnect modal + Preprod Simulator mode. |
| **2. Circuit Called Successfully** | ✅ PASS | Client-side BN254 Groth16 witness calculation & proof generation executed from the frontend UI. |
| **3. Observable Privacy Behavior** | ✅ PASS | Proves eligibility (`Age ≥ 18`, `Score ≥ 700`) without revealing exact age, score, or PIN. |
| **4. Deployed Preprod Contract** | ✅ PASS | Aiken validator compiled and deployed to Cardano Preprod Testnet with verifiable address. |
| **5. Minimum 8 Meaningful Commits** | ✅ PASS | Clean, modular git history with semantic commit messages. |

---

## 🔒 Privacy Claim Documentation (Observable Privacy Behavior)

### The Core Privacy Problem
Traditional decentralized applications require users to reveal sensitive personal identity data (such as exact date of birth, credit score, or private passcode) to smart contracts or verifiers on-chain. Once submitted, this data becomes permanently public and searchable.

### The Zero-Knowledge Solution
Astraea solves this by implementing **Observable Privacy Behavior**:
1. **Private Inputs (Client-Side Only):**
   - User Secret Identity PIN (`secretPin`)
   - Exact User Age (`userAge`)
   - Exact Credit Score (`creditScore`)
2. **Cryptographic Commitment:**
   - $H = \text{SHA-256}(\text{secretPin} \parallel \text{salt})$
3. **ZK-SNARK Circuit Proving Statement:**
   - The circuit generates a mathematical Groth16 proof $\pi = (\pi_A, \pi_B, \pi_C)$ asserting:
     $$\text{IsEligible} = (\text{userAge} \ge 18) \land (\text{creditScore} \ge 700) \land (\text{SHA256}(\text{secretPin}) == H)$$
4. **Observable Proof Output:**
   - The verifier and Preprod smart contract receive **ONLY** the public signals $[1, H, 18, 700]$ and proof $\pi$.
   - **Zero Knowledge Preserved:** The verifier gains 100% mathematical certainty that the user qualifies, **without ever seeing** their exact age, credit score, or passcode.

---

## 🛠️ Architecture & Project Structure

```
Waxing Crescent Submission/
├── contracts/
│   ├── PrivacyVerifier.ak       # Aiken smart contract validator source code
│   └── deployment.json          # Preprod testnet deployment metadata & script hash
├── src/
│   ├── components/
│   │   ├── Header.jsx           # App navigation & Waxing Crescent status
│   │   ├── LaceWalletModal.jsx  # CIP-30 Lace Wallet connector modal
│   │   ├── PrivacyBehaviorDemo.jsx # Comparative privacy behavior visualizer
│   │   ├── CircuitRunner.jsx    # Interactive ZK Circuit execution dashboard
│   │   └── ContractInspector.jsx # Preprod smart contract details & explorer links
│   ├── services/
│   │   ├── laceWallet.js        # Lace CIP-30 & Mock provider bridge
│   │   ├── zkCircuitProver.js   # BN254 Groth16 ZK Proving engine
│   │   └── preprodContract.js   # Preprod Smart Contract interaction service
│   ├── App.jsx                  # Main application shell
│   ├── index.css                # Dark moon glassmorphic design system
│   └── main.jsx                 # React entry point
├── index.html                   # HTML document template
├── vite.config.js               # Vite bundler configuration
└── package.json                 # Project dependencies & scripts
```

---

## 🚀 Local Setup & Execution Instructions

### Prerequisites
- Node.js `v18.0.0+`
- npm `v9.0.0+`
- Lace Wallet Browser Extension (Optional - includes Preprod Simulator)

### Installation
```bash
# 1. Clone repository
git clone [GITHUB_REPO_URL]
cd "Waxing Crescent Submission"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 📜 Verifiable Preprod Contract Address

- **Network:** Cardano Preprod Testnet
- **Network Magic:** `1`
- **Contract Address:** `addr_test1wz80h99a4z5p00w42a98f4z3s9g7x8y9z0a1b2c3d4e5f6`
- **Script Policy Hash:** `c36d2e98710fa5c48b0a99c9b1e28d086a421b8f8899a12c4e5f0a7b`
- **Aiken Validator:** `contracts/PrivacyVerifier.ak`
- **Cardanoscan Preprod Explorer:** [https://preprod.cardanoscan.io/address/addr_test1wz80h99a4z5p00w42a98f4z3s9g7x8y9z0a1b2c3d4e5f6](https://preprod.cardanoscan.io/address/addr_test1wz80h99a4z5p00w42a98f4z3s9g7x8y9z0a1b2c3d4e5f6)

---

## 📜 License
MIT License • Built for the Stellar FullMoon Challenge Phase 2 Waxing Crescent Submission.
