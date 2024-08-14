import React from 'react';
import { Button, View } from 'react-native';
import { useSignMessage } from 'wagmi';
import { PrimaryText } from '../components/PrimaryText';
import { textStyle } from '../theme/styles';

/**
 * Section to sign hardcoded message.
 */
function SignMessageSection(): React.JSX.Element {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'random message to be signed',
  });

  return (
    <View>
      <PrimaryText style={textStyle.sectionHeader}>
        Sign Message Section
      </PrimaryText>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          title="Sign message"
          onPress={() => signMessage()}
          disabled={isLoading}
        />
      </View>
      {isSuccess && <PrimaryText>Signature: {data}</PrimaryText>}
      {isError && <PrimaryText>Error signing message</PrimaryText>}
    </View>
  );
}

export default SignMessageSection;
