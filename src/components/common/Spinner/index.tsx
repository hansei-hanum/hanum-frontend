import React from 'react';

import { ActivityIndicator } from '@react-native-material/core';

import { useTheme } from '@emotion/react';

export interface SpinnerProps {
  color?: string;
  size?: number;
  isCenter?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ color, isCenter, size }) => {
  const theme = useTheme();
  return (
    <ActivityIndicator
      size={size ? size : 26}
      color={color ? color : theme.placeholder}
      {...(isCenter && { style: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } })}
    />
  );
};
