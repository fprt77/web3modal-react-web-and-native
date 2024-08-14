import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import {
  useAccount,
  useNetwork,
  usePublicClient,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi';
import { encodeDeployData, formatEther, Hex, parseEther } from 'viem';
import lockJson from '../../contracts/Lock.json';
import { PrimaryText } from '../components/PrimaryText';
import { textStyle } from '../theme/styles';

const abi = lockJson.abi;
const bytecode = lockJson.bytecode as Hex;

export const useGaseEstimate = () => {
  const { chain } = useNetwork();
  const [gasEstimate, setGasEstimate] = useState<bigint>(BigInt(0));
  const { address } = useAccount();
  const publicClient = usePublicClient({ chainId: chain?.id });

  useEffect(() => {
    const ONE_MINUTE_IN_SECS = 60;
    const unlockTimeSeconds =
      Math.floor(Date.now() / 1000) + ONE_MINUTE_IN_SECS;
    const estimateLoad = async () => {
      const data = encodeDeployData({
        abi: abi,
        bytecode: bytecode as Hex,
        args: [BigInt(unlockTimeSeconds)],
      });
      const result = await publicClient.estimateGas({
        account: address,
        data: data,
      });
      setGasEstimate(result);
    };
    estimateLoad();
    return () => { };
  }, [publicClient, address]);

  return gasEstimate;
};

interface DeployContractSectionProps {
  onDeployed: () => void;
}

/**
 * Section to perform deployment of contract. Additionally gas estimation is shown to user.
 */
function DeployContractSection(
  props: DeployContractSectionProps,
): React.JSX.Element {
  const { chain } = useNetwork();
  const gasEstimate = useGaseEstimate();
  const { address } = useAccount();
  const [hash, setHash] = useState<Hex>();
  const { data: walletClient } = useWalletClient({ chainId: chain?.id });

  async function submit() {
    const ONE_MINUTE_IN_SECS = 60;
    const unlockTimeSeconds =
      Math.floor(Date.now() / 1000) + ONE_MINUTE_IN_SECS;
    try {
      const hash = await walletClient.deployContract({
        account: address,
        chain: chain,
        abi: abi,
        bytecode: bytecode,
        args: [unlockTimeSeconds],
        value: parseEther('1'),
      });
      setHash(hash);
      props.onDeployed();
    } catch (e) {
      console.error(e);
    }
  }

  const waitResult = useWaitForTransaction({
    hash: hash,
  });

  return (
    <View>
      <PrimaryText style={textStyle.sectionHeader}>
        Deploy Contract Section
      </PrimaryText>
      <PrimaryText>
        Estimated gas price - {formatEther(gasEstimate)}
      </PrimaryText>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          title="Deploy"
          onPress={() => submit()}
          disabled={waitResult.isLoading}
        />
      </View>
      {waitResult.isLoading && <PrimaryText>Waiting</PrimaryText>}
      {waitResult.isError && (
        <PrimaryText>
          Error deploying contract: {waitResult.error?.message}
        </PrimaryText>
      )}
      {waitResult.isSuccess && (
        <PrimaryText>
          Contract deployed at ${waitResult.data?.contractAddress}
        </PrimaryText>
      )}
    </View>
  );
}

export default DeployContractSection;
