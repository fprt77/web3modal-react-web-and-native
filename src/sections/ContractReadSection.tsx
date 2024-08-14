import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useBalance, useContractRead } from 'wagmi';
import { Address, isAddress } from 'viem';
import { useTheme } from '@react-navigation/native';
import lockJson from '../../contracts/Lock.json';
import { inputStyle, textStyle } from '../theme/styles';
import { PrimaryText } from '../components/PrimaryText';

/**
 * Section to perform read on deployed contract. User is expected to enter address of contract into TextInput.
 */
function ContractReadSection(): React.JSX.Element {
  const Theme = useTheme();
  const [contractAddress, setContractAddress] = useState('');
  let hexAddress: Address = isAddress(contractAddress) ? contractAddress : null;

  return (
    <View>
      <PrimaryText style={textStyle.sectionHeader}>
        Read Contract Section
      </PrimaryText>
      <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
        <PrimaryText>Address: </PrimaryText>
        <TextInput
          accessibilityLabel="Contract Read Address input field"
          style={[
            inputStyle.input,
            { borderColor: Theme.colors.border, color: Theme.colors.text },
          ]}
          onChangeText={setContractAddress}
          value={contractAddress}
        />
      </View>
      {hexAddress && <ContractReadSectionFromAddress address={hexAddress} />}
    </View>
  );
}

interface HexAddressProps {
  address: Address;
}

function ContractReadSectionFromAddress(
  props: HexAddressProps,
): React.JSX.Element {
  const timeNow = Math.floor(Date.now() / 1000);
  const abi = lockJson.abi;
  const { data, isError, isLoading, isSuccess } = useContractRead({
    address: props.address,
    abi: abi,
    functionName: 'unlockTime',
    onError: err => {
      console.log(err);
    },
  });
  const { data: balance } = useBalance({
    address: props.address,
  });
  return (
    <View>
      <PrimaryText>Contract balance: {balance?.formatted}</PrimaryText>
      {isLoading && <PrimaryText>Loading</PrimaryText>}
      {isSuccess && <PrimaryText>Response: {data?.toString()}</PrimaryText>}
      {isSuccess && <PrimaryText>Time Now: {timeNow}</PrimaryText>}
      {isError && <PrimaryText>Error reading contract</PrimaryText>}
    </View>
  );
}

export default ContractReadSection;
