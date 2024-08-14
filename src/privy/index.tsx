// Import the PrivyProvider
import React, { useState } from 'react';
import {
  OAuthProviderType,
  PrivyProvider as PrivyProviderLib,
  useLoginWithOAuth,
  usePrivy,
} from '@privy-io/expo';
import { Button, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { PrimaryText } from '../components/PrimaryText';
import { privyAppId, PrivyProviderProps } from './common';

const PrivyProvider = ({ children }: PrivyProviderProps) => (
  <PrivyProviderLib appId={privyAppId}>{children}</PrivyProviderLib>
);

function PrivyAuth(): React.JSX.Element {
  const options = [
    { label: 'Google', value: 'google' },
    { label: 'Twitter', value: 'twitter' },
  ];
  const [authType, setAuthType] = useState(options[0]);

  const { user } = usePrivy();
  const { state, login } = useLoginWithOAuth();

  return (
    <View>
      {state.status === 'done' && (
        <View>
          <PrimaryText>You logged in with {authType.label}</PrimaryText>
          <PrimaryText>{JSON.stringify(user)}</PrimaryText>
        </View>
      )}
      {state.status !== 'done' && (
        <View>
          <Dropdown
            data={options}
            labelField="label"
            valueField="value"
            value={authType}
            onChange={item => {
              setAuthType(item);
            }}
          />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              title={`Login with ${authType.label}`}
              onPress={() =>
                login({ provider: authType.value as OAuthProviderType })
              }
              disabled={state.status === 'loading'}
            />
          </View>

          {state.status === 'loading' && (
            // Only renders while OAuth flow is in progress
            <PrimaryText>Logging in...</PrimaryText>
          )}

          {state.status === 'error' && (
            // Only renders while OAuth flow is in progress
            <PrimaryText>Error: {state.error.message}</PrimaryText>
          )}
        </View>
      )}
    </View>
  );
}

export { PrivyProvider, usePrivy, PrivyAuth };
