import { useTheme } from '@react-navigation/native';
import React from 'react';
import { PrimaryText } from '../components/PrimaryText';

/**
 * Testing component to visually indicate whether "native" variant is used.
 */
export function TestingPlatform(): React.JSX.Element {
  const Theme = useTheme();
  return (
    <PrimaryText style={{ color: Theme.colors.text }}>Native Text</PrimaryText>
  );
}
