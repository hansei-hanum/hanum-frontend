import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export interface BoxProps {
  children?: React.ReactNode;
  navigateUrl: string;
}

export const Box: React.FC<BoxProps> = ({ children, navigateUrl }) => {
  const navigate = useNavigation().navigate as (screen: string) => void;
  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();

  return (
    <S.BoxContainer>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        onPress={() => navigate(navigateUrl)}
      >
        <S.BoxWrapper style={[animatedStyle]}>{children}</S.BoxWrapper>
      </TouchableOpacity>
    </S.BoxContainer>
  );
};
