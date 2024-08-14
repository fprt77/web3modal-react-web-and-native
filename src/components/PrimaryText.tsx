import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TextProps } from 'react-native';

/**
 * Styled Text to take its color from Theme.colors.primary
 */
export function PrimaryText(props: TextProps): React.JSX.Element {
  const Theme = useTheme();
  const { style, ...rest } = props;
  return (
    <Text style={[{ color: Theme.colors.text }, style]} {...rest}>
      {props.children}
    </Text>
  );
}
