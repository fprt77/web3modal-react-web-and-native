import React from 'react';
import { View } from 'react-native';
import { useAccount } from 'wagmi';
import { PrimaryText } from '../components/PrimaryText';
import { textStyle } from '../theme/styles';

interface LoadAccountSectionProps {
  balanceFormatted: string;
}

/**
 * Section to show account address and balance.
 */
function LoadAccountSection(props: LoadAccountSectionProps): React.JSX.Element {
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <View>
      <PrimaryText style={textStyle.sectionHeader}>Account Section</PrimaryText>
      {isConnecting && <PrimaryText>Connecting…</PrimaryText>}
      {isDisconnected && <PrimaryText>Disconnected</PrimaryText>}
      {!isConnecting && !isDisconnected && (
        <View>
          <PrimaryText>{address}</PrimaryText>
          <PrimaryText>Balance is {props.balanceFormatted}</PrimaryText>
        </View>
      )}
    </View>
  );
}

export default LoadAccountSection;
