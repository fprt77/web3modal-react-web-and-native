import React from 'react';
import {
  PrivyProvider as PrivyProviderLib,
  useLogin,
  useLogout,
  usePrivy,
} from '@privy-io/react-auth';
import { Button, View } from 'react-native';
import { PrimaryText } from '../components/PrimaryText';
import { activeChain, privyAppId, PrivyProviderProps } from './common';

const PrivyProvider = ({ children }: PrivyProviderProps) => (
  <PrivyProviderLib
    appId={privyAppId}
    config={{
      embeddedWallets: {
        createOnLogin: 'users-without-wallets',
      },
      defaultChain: activeChain,
      supportedChains: [activeChain],
    }}>
    {children}
  </PrivyProviderLib>
);

function PrivyAuth(): React.JSX.Element {
  const { authenticated, ready, user } = usePrivy();

  const { login } = useLogin();

  const { logout } = useLogout({
    onSuccess: () => {
      // nothing for now
    },
  });

  return (
    <View>
      {authenticated && (
        <View>
          {ready && (
            <View>
              <PrimaryText>Privy user ID: {user.id}</PrimaryText>
              <PrimaryText>Wallet address: {user.wallet?.address}</PrimaryText>
            </View>
          )}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Button title="Logout" onPress={() => logout()} />
          </View>
        </View>
      )}
      {!authenticated && (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Button title="Login" onPress={() => login()} />
        </View>
      )}
    </View>
  );
}

export { PrivyProvider, usePrivy, PrivyAuth };
