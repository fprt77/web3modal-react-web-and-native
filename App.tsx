/**
 * React Native App with Web support and WalletConnect
 *
 * @format
 */
import './polyfills';
import 'react-native-gesture-handler';

import React, { PropsWithChildren } from 'react';
import { ScrollView, StatusBar, useColorScheme, View } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WagmiConfig, useAccount, useBalance } from 'wagmi';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TestingPlatform } from './src/test';
// import { Button, View } from 'ofetch';

import {
  wagmiConfig,
  W3mButton,
  Web3Modal,
  updateAccountBalance,
} from './src/web3modal';
import LoadAccountSection from './src/sections/LoadAccountSection';
import SignMessageSection from './src/sections/SignMessageSection';
import ContractReadSection from './src/sections/ContractReadSection';
import SendTransactionSection from './src/sections/SendTransactionSection';
import DeployContractSection from './src/sections/DeployContractSection';
import ContractWriteSection from './src/sections/ContractWriteSection';
import { PrimaryText } from './src/components/PrimaryText';
import { containerStyle } from './src/theme/styles';
import { PrivyProvider } from './src/privy';
import PrivyAuthSection from './src/sections/PrivyAuthSection';

const Stack = createNativeStackNavigator();

/**
 * Entry point of our application.
 */
function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222222' : '#DDDDDD',
  };

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PrivyProvider>
        <WagmiConfig config={wagmiConfig}>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <Stack.Navigator>
              <Stack.Screen name="Main Screen" component={MainScreen} />
            </Stack.Navigator>
            <Web3Modal />
          </SafeAreaProvider>
        </WagmiConfig>
      </PrivyProvider>
    </NavigationContainer>
  );
}

/**
 * Our main and only navigation screen.
 */
function MainScreen(): React.JSX.Element {
  const Theme = useTheme();
  return (
    <View style={{ backgroundColor: Theme.colors.background }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Section>
          <PrimaryText style={{ color: Theme.colors.text }}>
            Testing text
          </PrimaryText>
          <TestingPlatform />
        </Section>
        <CryptoSections />
      </ScrollView>
    </View>
  );
}

/**
 * List of different sections that work with Crypto.
 */
function CryptoSections(): React.JSX.Element {
  const { address } = useAccount();
  const { data: balance, refetch } = useBalance({ address: address });
  // W3mButtons need updated value to be set manually
  updateAccountBalance(balance?.formatted, balance?.symbol);

  return (
    <View>
      <Section>
        <W3mButton />
      </Section>
      <Section>
        <PrivyAuthSection />
      </Section>
      <Section>
        <LoadAccountSection balanceFormatted={balance?.formatted} />
      </Section>
      {address && (
        <Section>
          <SignMessageSection />
        </Section>
      )}
      {address && (
        <Section>
          <SendTransactionSection onSent={refetch} />
        </Section>
      )}
      {address && (
        <Section>
          <DeployContractSection onDeployed={refetch} />
        </Section>
      )}
      {address && (
        <Section>
          <ContractReadSection />
        </Section>
      )}
      {address && (
        <Section>
          <ContractWriteSection onWritten={refetch} />
        </Section>
      )}
    </View>
  );
}

export function Section({ children }: PropsWithChildren) {
  return <View style={containerStyle.section}>{children}</View>;
}

export default App;
