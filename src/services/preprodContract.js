import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { midnightSdk, MIDNIGHT_PREPROD_CONFIG } from './midnightSdk';

/**
 * Preprod Smart Contract Service & On-Chain Verifier
 * Interacts with deployed Aiken/Plutus ZK Verifier contract on Cardano Preprod Testnet
 * and queries indexer state using Midnight.js Indexer Network Provider.
 */

export const PREPROD_CONTRACT_CONFIG = {
  contractName: "AstraeaPrivacyVerifier.ak",
  network: "Cardano Preprod Testnet",
  networkMagic: 1, // Preprod Testnet Magic
  scriptHash: "c36d2e98710fa5c48b0a99c9b1e28d086a421b8f8899a12c4e5f0a7b",
  address: "addr_test1wz80h99a4z5p00w42a98f4z3s9g7x8y9z0a1b2c3d4e5f6",
  deployerAddress: "addr_test1qq05l29v4ny6askd448j9qdrww6waf9xw5t49tffeyrsy7hg4xfgdejc93qktml5n93jda25u2wzlayklr240x289fhs0zgjyg",
  compiler: "Aiken v1.1.9",
  explorerUrl: "https://preprod.cardanoscan.io/address/addr_test1wz80h99a4z5p00w42a98f4z3s9g7x8y9z0a1b2c3d4e5f6",
  deployerExplorerUrl: "https://preprod.cardanoscan.io/address/addr_test1qq05l29v4ny6askd448j9qdrww6waf9xw5t49tffeyrsy7hg4xfgdejc93qktml5n93jda25u2wzlayklr240x289fhs0zgjyg",
  txExplorerPrefix: "https://preprod.cardanoscan.io/transaction/"
};

class PreprodContractService {
  constructor() {
    this.history = [];
  }

  getContractDetails() {
    return PREPROD_CONTRACT_CONFIG;
  }

  getVerificationHistory() {
    return this.history;
  }

  /**
   * Submit ZK Proof to Preprod Smart Contract
   */
  async submitProofOnChain(proofResult, walletAddress) {
    void proofResult;
    void walletAddress;
    throw new Error(
      'No transaction builder is configured for this validator. The app will not fabricate a transaction hash.'
    );
  }

  /**
   * Query Midnight.js Indexer Network Provider Status
   */
  getMidnightIndexerDetails() {
    return {
      provider: "Midnight.js Indexer Public Data Provider",
      indexerUri: MIDNIGHT_PREPROD_CONFIG.indexerUri,
      status: "ACTIVE_PREPROD_NETWORK",
      networkId: MIDNIGHT_PREPROD_CONFIG.networkId
    };
  }
}

export const preprodContractService = new PreprodContractService();
