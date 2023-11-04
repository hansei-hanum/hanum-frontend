import React from 'react';

import { ActivityIndicator } from '@react-native-material/core';

export interface SpinnerProps {
  size?: number;
  isCenter?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ isCenter, size }) => {
  return (
    <ActivityIndicator
      size={size ? size : 26}
      {...(isCenter && { style: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } })}
    />
  );
};
