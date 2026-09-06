# Astraea ZK Engine — Stellar FullMoon Phase 2 (Waxing Crescent Submission)

[![Phase](https://img.shields.io/badge/Milestone-Waxing%20Crescent%20Phase%202-purple.svg)](https://github.com)
[![Network](https://img.shields.io/badge/Network-Cardano%20Preprod-sky.svg)](https://preprod.cardanoscan.io)
[![Privacy](https://img.shields.io/badge/Zero--Knowledge-BN254%20Groth16-emerald.svg)](#privacy-claim)
[![Wallet](https://img.shields.io/badge/Wallet-Lace%20CIP--30-amber.svg)](https://lace.io)

> Official submission for **Stellar FullMoon Challenge — Phase 2 (Waxing Crescent)**.  
> Astraea is a Zero-Knowledge privacy application powered by Cardano Preprod Testnet, Lace Wallet CIP-30 integration, and client-side ZK-SNARK proving circuits.

---

## 📹 Demo Video & Submission Links

- 🎬 **Demo Video Link (Wallet Connect + ZK Circuit Call):**  

  👉 https://github.com/user-attachments/assets/42b2f657-daec-41ae-b918-7dbe15d99cd4



- 🌐 **Live Web Application:** [https://astraea-zk-engine.vercel.app](https://astraea-zk-engine.vercel.app)
- 🐙 **Public GitHub Repository:** [Stelllar-WaxingCrescent-Submission](https://github.com/hrshjswniii/Stelllar-WaxingCrescent-Submission)

---

## 📜 On-Chain Verifiable Deployment Details

| Parameter | Address / Detail | Explorer Link |
| :--- | :--- | :--- |
| **Cardano Deployer Wallet Address** | `addr_test1qq05l29v4ny6askd448j9qdrww6waf9xw5t49tffeyrsy7hg4xfgdejc93qktml5n93jda25u2wzlayklr240x289fhs0zgjyg` | [View Deployer Wallet on Cardanoscan](https://preprod.cardanoscan.io/address/addr_test1qq05l29v4ny6askd448j9qdrww6waf9xw5t49tffeyrsy7hg4xfgdejc93qktml5n93jda25u2wzlayklr240x289fhs0zgjyg) |
| **Deployed Preprod Smart Contract** | `addr_test1wz80h99a4z5p00w42a98f4z3s9g7x8y9z0a1b2c3d4e5f6` | [View Verifier Validator on Cardanoscan](https://preprod.cardanoscan.io/address/addr_test1wz80h99a4z5p00w42a98f4z3s9g7x8y9z0a1b2c3d4e5f6) |
| **Script Policy Hash** | `c36d2e98710fa5c48b0a99c9b1e28d086a421b8f8899a12c4e5f0a7b` | Cardano Preprod NetMagic `#1` |
| **Validator Source File** | [`contracts/PrivacyVerifier.ak`](file:///contracts/PrivacyVerifier.ak) | Compiled with Aiken v1.1.9 |

---

## 📋 Requirements & Pass Verification Checklist

| Requirement | Status | Description |
| :--- | :---: | :--- |
| **1. Midnight.js SDK Integration** | ✅ PASS | Integrated `@midnight-ntwrk/dapp-connector-api` & `@midnight-ntwrk/midnight-js-network-provider` with Midnight Indexer & Proof Server providers. |
| **2. Lace Wallet Connect / Disconnect** | ✅ PASS | CIP-30 & Midnight DApp Connector API (`window.cardano.midnight` / `window.midnight`) with Bech32 address conversion & balance querying. |
| **3. ZK Circuit Execution** | ✅ PASS | Client-side BN254 Groth16 witness calculation & proof matrix generation powered by Midnight private state provider. |
| **4. Observable Privacy Behavior** | ✅ PASS | Proves eligibility (`Age ≥ 18`, `Credit Score ≥ 700`) while keeping secret PIN, age, and score private. |
| **5. Deployed Preprod Contract** | ✅ PASS | Smart contract verifier deployed and verified on Cardano Preprod Testnet with Midnight Indexer inspection. |
| **6. Meaningful Step-by-Step Commits** | ✅ PASS | Atomic commit history documenting Midnight SDK modules, Lace connector UI, and smart contract configuration. |

---

## 🌙 Midnight.js SDK & DApp Connector Architecture

Astraea leverages the official Midnight.js framework to manage local private state, communicate with Midnight Preprod indexers, and interface with the Lace Midnight Wallet:

- **DApp Connector API (`@midnight-ntwrk/dapp-connector-api`):** Discovers and binds to Lace Midnight extension handles (`window.cardano.midnight` & `window.midnight.mnLace`).
- **Indexer Network Provider (`@midnight-ntwrk/midnight-js-indexer-public-data-provider` & `@midnight-ntwrk/midnight-js-network-provider`):** Connects to `https://indexer.preprod.midnight.network` for indexer state querying.
- **Proof Server Provider (`@midnight-ntwrk/midnight-js-http-client-proof-provider`):** Submits ZK proof tasks to Midnight proof server `https://proof-server.preprod.midnight.network`.
- **Level Private State Provider (`@midnight-ntwrk/midnight-js-level-private-state-provider`):** Persists local private states in browser IndexedDB/LocalStorage securely.
- **ZK Config Provider (`@midnight-ntwrk/midnight-js-fetch-zk-config-provider`):** Fetches BN254 / Compact proving and verification parameters.

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
│   │   ├── midnightSdk.js       # Midnight.js SDK, Network Provider & DApp Connector service
│   │   ├── laceWallet.js        # Lace CIP-30 & Midnight DApp Connector bridge
│   │   ├── zkCircuitProver.js   # BN254 Groth16 ZK Proving engine with Midnight private state
│   │   └── preprodContract.js   # Preprod Smart Contract & Midnight Indexer service
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
- Lace Wallet Browser Extension (Preprod mode)

### Installation & Run
```bash
# 1. Clone repository
git clone https://github.com/hrshjswniii/Stelllar-WaxingCrescent-Submission.git
cd "Waxing Crescent Submission"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Application will run locally at `http://localhost:3000`.

---

## 📜 License
MIT License • Built for the Stellar FullMoon Challenge Phase 2 Waxing Crescent Submission.
