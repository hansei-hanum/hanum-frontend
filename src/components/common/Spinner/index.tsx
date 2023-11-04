import React from 'react';

import { ActivityIndicator } from '@react-native-material/core';

import { colors } from 'src/styles';

export interface SpinnerProps {
  color?: string;
  size?: number;
  isCenter?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ color, isCenter, size }) => {
  return (
    <ActivityIndicator
      size={size ? size : 26}
      color={color ? color : colors.placeholder}
      {...(isCenter && { style: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } })}
    />
  );
};
