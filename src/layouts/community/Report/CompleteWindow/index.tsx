import React from 'react';
import { Animated } from 'react-native';

import { Theme } from '@emotion/react';

import * as S from './styled';

export interface ReportCompleteProps {
  reportScreenAnimationValue: Animated.Value;
  theme: Theme;
}

export const ReportCompleteWindow: React.FC<ReportCompleteProps> = ({
  reportScreenAnimationValue,
  theme,
}) => {
  return (
    <S.ReportScreen
      style={{
        transform: [{ translateX: reportScreenAnimationValue }],
        backgroundColor: theme.lightGray,
      }}
    />
  );
};
