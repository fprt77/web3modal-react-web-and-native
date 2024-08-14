import {
  mainnet,
  polygon,
  arbitrum,
  sepolia,
  hardhat,
  foundry,
} from 'viem/chains';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.WALLETCONNECT_CLOUD_PROJECT_ID;

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [mainnet, polygon, arbitrum, sepolia, hardhat, foundry];

export { projectId, metadata, chains };
