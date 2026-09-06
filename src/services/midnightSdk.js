/**
 * Midnight.js SDK & DApp Connector Integration Service
 * Standard implementation using @midnight-ntwrk/dapp-connector-api and Midnight.js Network Providers.
 */

import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';

// Midnight Preprod Network Configuration
export const MIDNIGHT_PREPROD_CONFIG = {
  networkId: 'preprod',
  networkName: 'Midnight Preprod Testnet',
  indexerUri: 'https://indexer.preprod.midnight.network/api/v1/graphql',
  indexerWsUri: 'wss://indexer.preprod.midnight.network/api/v1/graphql/ws',
  proofServerUri: 'https://proof-server.preprod.midnight.network',
  nodeRpcUri: 'https://rpc.preprod.midnight.network',
  zkConfigUri: 'https://zk-config.preprod.midnight.network',
  dappConnectorId: 'lace-midnight'
};

class MidnightSdkService {
  constructor() {
    this.isInitialized = false;
    this.networkProvider = null;
    this.proofProvider = null;
    this.privateStateProvider = null;
    this.zkConfigProvider = null;
    this.dappConnector = null;
    this.activeSession = null;
  }

  /**
   * Initialize Midnight.js Network Providers and DApp Connector API
   */
  async initialize() {
    if (this.isInitialized) return this.getStatus();

    try {
      // 1. Initialize Public Data / Indexer Network Provider
      this.networkProvider = indexerPublicDataProvider({
        url: MIDNIGHT_PREPROD_CONFIG.indexerUri,
        wsUrl: MIDNIGHT_PREPROD_CONFIG.indexerWsUri
      });

      // 2. Initialize HTTP Client Proof Provider
      this.proofProvider = httpClientProofProvider(MIDNIGHT_PREPROD_CONFIG.proofServerUri);

      // 3. Initialize Browser Level Private State Provider
      this.privateStateProvider = levelPrivateStateProvider({
        privateStateStoreName: 'astreae_midnight_private_state'
      });

      // 4. Initialize ZK Config Provider for Proving & Verifying Keys
      this.zkConfigProvider = new FetchZkConfigProvider(MIDNIGHT_PREPROD_CONFIG.zkConfigUri);

      this.isInitialized = true;
      console.log('Midnight.js SDK initialized successfully with Preprod providers.');

      return this.getStatus();
    } catch (err) {
      console.warn('Midnight.js SDK initialized with offline fallback mode:', err.message);
      this.isInitialized = true;
      return this.getStatus();
    }
  }

  /**
   * Detect Lace Midnight DApp Connector API in browser window
   */
  detectDAppConnector() {
    if (typeof window === 'undefined') return null;

    if (window.midnight && window.midnight.mnLace) {
      return { id: 'mnLace', provider: window.midnight.mnLace, name: 'Lace Midnight Connector' };
    }
    if (window.cardano && window.cardano.midnight) {
      return { id: 'cardano-midnight', provider: window.cardano.midnight, name: 'Lace Wallet (Midnight API)' };
    }
    if (window.cardano && window.cardano.lace) {
      return { id: 'lace', provider: window.cardano.lace, name: 'Lace CIP-30 Connector' };
    }

    return null;
  }

  /**
   * Connect to Lace Midnight DApp Connector
   */
  async connectWallet() {
    await this.initialize();
    const connector = this.detectDAppConnector();

    if (!connector) {
      return {
        success: false,
        error: 'Midnight DApp Connector API not detected. Please install or unlock Lace Wallet.'
      };
    }

    try {
      const api = await connector.provider.enable();
      this.activeSession = {
        api,
        connectorId: connector.id,
        connectedAt: new Date().toISOString()
      };

      return {
        success: true,
        connectorName: connector.name,
        session: this.activeSession
      };
    } catch (err) {
      return {
        success: false,
        error: err?.message || 'Failed to connect via Midnight DApp Connector API.'
      };
    }
  }

  /**
   * Get current SDK Status & Configuration
   */
  getStatus() {
    const connector = this.detectDAppConnector();
    return {
      isInitialized: this.isInitialized,
      network: MIDNIGHT_PREPROD_CONFIG.networkName,
      networkId: MIDNIGHT_PREPROD_CONFIG.networkId,
      hasDAppConnector: !!connector,
      connectorName: connector ? connector.name : 'Not Detected',
      indexerUri: MIDNIGHT_PREPROD_CONFIG.indexerUri,
      proofServerUri: MIDNIGHT_PREPROD_CONFIG.proofServerUri,
      hasPrivateStateProvider: !!this.privateStateProvider,
      hasProofProvider: !!this.proofProvider
    };
  }
}

export const midnightSdk = new MidnightSdkService();
