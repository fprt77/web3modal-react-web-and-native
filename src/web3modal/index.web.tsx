import React from 'react';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
} from '@web3modal/wagmi/react';
import { AccountController } from '@web3modal/core';
import { projectId, metadata, chains } from './common';

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

// On web, export W3mButton as the globally-available web component
const W3mButton = () => <w3m-button />;

// On web, modal doesn't need to be rendered because it's a globally-available web component
const Web3Modal = () => null;

function updateAccountBalance(balance: string, symbol: string) {
  AccountController.setBalance(balance, symbol);
}

// Re-export components
export {
  wagmiConfig,
  useWeb3Modal,
  W3mButton,
  Web3Modal,
  updateAccountBalance,
};
