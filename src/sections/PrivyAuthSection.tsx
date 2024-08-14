import React from 'react';
import { View } from 'react-native';
import { PrivyAuth } from '../privy';
import { textStyle } from '../theme/styles';
import { PrimaryText } from '../components/PrimaryText';

/**
 * Section to show Privy Authentication.
 */
function PrivyAuthSection(): React.JSX.Element {
  return (
    <View>
      <PrimaryText style={textStyle.sectionHeader}>
        Privy Auth Section
      </PrimaryText>
      <PrivyAuth />
    </View>
  );
}

export default PrivyAuthSection;
