import '@walletconnect/react-native-compat';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
  useWeb3Modal,
  W3mButton,
} from '@web3modal/wagmi-react-native';
import { AccountController } from '@web3modal/core-react-native';
import { projectId, metadata, chains } from './common';

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

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
