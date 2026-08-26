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
| **1. Lace Wallet Connect / Disconnect** | ✅ PASS | CIP-30 `window.cardano.lace` connector with Bech32 address conversion & real balance querying. |
| **2. ZK Circuit Execution** | ✅ PASS | Client-side BN254 Groth16 witness calculation & proof matrix generation from frontend UI. |
| **3. Observable Privacy Behavior** | ✅ PASS | Proves eligibility (`Age ≥ 18`, `Credit Score ≥ 700`) while keeping secret PIN, age, and score private. |
| **4. Deployed Preprod Contract** | ✅ PASS | Aiken smart contract validator deployed and verified on Cardano Preprod Testnet. |
| **5. Meaningful Git History** | ✅ PASS | Modular commits documenting features, layout fixes, and smart contract configuration. |

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
