import { hardhat } from 'viem/chains';

const privyAppId = process.env.PRIVY_APP_ID;

export const activeChain = hardhat;

interface PrivyProviderProps {
    children: React.ReactNode;
}

export { privyAppId, PrivyProviderProps };
