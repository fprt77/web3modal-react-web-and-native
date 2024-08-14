import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Address, isAddress } from 'viem';
import { useTheme } from '@react-navigation/native';
import lockJson from '../../contracts/Lock.json';
import { inputStyle, textStyle } from '../theme/styles';
import { PrimaryText } from '../components/PrimaryText';

interface ContractWriteSectionProps {
  onWritten: () => void;
}

/**
 * Section to perform write on deployed contract. User is expected to enter address of contract into TextInput.
 */
function ContractWriteSection(
  props: ContractWriteSectionProps,
): React.JSX.Element {
  const Theme = useTheme();
  const [contractAddress, setContractAddress] = useState('');
  let hexAddress: Address = isAddress(contractAddress) ? contractAddress : null;

  return (
    <View>
      <PrimaryText style={textStyle.sectionHeader}>
        Write Contract Section
      </PrimaryText>
      <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
        <PrimaryText>Address: </PrimaryText>
        <TextInput
          accessibilityLabel="Withdraw Address input field"
          style={[
            inputStyle.input,
            { borderColor: Theme.colors.border, color: Theme.colors.text },
          ]}
          onChangeText={setContractAddress}
          value={contractAddress}
        />
      </View>
      {hexAddress && (
        <ContractWriteSectionWIthAddress
          address={hexAddress}
          onWritten={props.onWritten}
        />
      )}
    </View>
  );
}

interface HexAddressProps {
  address: Address;
  onWritten: () => void;
}

function ContractWriteSectionWIthAddress(
  props: HexAddressProps,
): React.JSX.Element {
  const abi = lockJson.abi;
  const { config } = usePrepareContractWrite({
    address: props.address,
    abi: abi,
    functionName: 'withdraw',
    onError: err => {
      console.log(err);
    },
  });
  const { data, isLoading, isSuccess, isError, write } =
    useContractWrite(config);

  const waitResult = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      props.onWritten();
    },
  });
  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          title="Write"
          onPress={() => write()}
          disabled={isLoading || waitResult.isLoading}
        />
      </View>
      {isLoading && <PrimaryText>Loading</PrimaryText>}
      {isSuccess && <PrimaryText>Response: {data?.hash}</PrimaryText>}
      {isError && <PrimaryText>Error writing to contract</PrimaryText>}
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

export default ContractWriteSection;
