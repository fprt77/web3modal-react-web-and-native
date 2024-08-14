import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { useTheme } from '@react-navigation/native';
import { inputStyle, textStyle } from '../theme/styles';
import { PrimaryText } from '../components/PrimaryText';

interface SendTransactionSectionProps {
  onSent: () => void;
}

/**
 * Section to perform simple transaction. User is expected to enter address of target account into TextInput.
 */
function SendTransactionSection(
  props: SendTransactionSectionProps,
): React.JSX.Element {
  const Theme = useTheme();
  const [target, setTarget] = useState('');
  const { data, error, isError, isLoading, isSuccess, sendTransactionAsync } =
    useSendTransaction();

  async function submit() {
    await sendTransactionAsync({ to: target, value: parseEther('0.000001') });
  }

  const waitResult = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      props.onSent();
    },
  });

  return (
    <View>
      <PrimaryText style={textStyle.sectionHeader}>
        Send transaction Section
      </PrimaryText>
      <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
        <PrimaryText>Target: </PrimaryText>
        <TextInput
          accessibilityLabel="Target Address input field"
          style={[
            inputStyle.input,
            { borderColor: Theme.colors.border, color: Theme.colors.text },
          ]}
          onChangeText={setTarget}
          value={target}
        />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Button title="Send" onPress={() => submit()} disabled={isLoading} />
      </View>
      {isLoading && <PrimaryText>Loading</PrimaryText>}
      {isSuccess && <PrimaryText>Response TX: {data?.hash}</PrimaryText>}
      {isError && (
        <PrimaryText>Error sending transaction: {error?.message}</PrimaryText>
      )}
      {waitResult.isLoading && <PrimaryText>Waiting</PrimaryText>}
      {waitResult.isSuccess && (
        <PrimaryText>
          Wait Response: {waitResult.data?.transactionHash}
        </PrimaryText>
      )}
      {waitResult.isError && (
        <PrimaryText>
          Error sending transaction: {waitResult.error?.message}
        </PrimaryText>
      )}
    </View>
  );
}

export default SendTransactionSection;
