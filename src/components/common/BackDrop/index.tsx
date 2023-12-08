import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { useTheme } from '@emotion/react';

import * as S from './styled';

export interface BackDropProps {
  close: () => void;
  topAnimation: SharedValue<number>;
  closeHeight: number;
  openHeight: number;
}

export const BackDrop: React.FC<BackDropProps> = ({
  close,
  topAnimation,
  closeHeight,
  openHeight,
}) => {
  const theme = useTheme();

  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(topAnimation.value, [closeHeight, openHeight], [0, 0.5]);
    const display = opacity === 0 ? 'none' : 'flex';
    return {
      opacity,
      display,
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        close();
      }}
    >
      <S.BackDropElement style={[backDropAnimation, { backgroundColor: theme.black }]} />
    </TouchableWithoutFeedback>
  );
};
