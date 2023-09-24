import React from 'react';

import { useNavigate, usePressingAnimation } from 'src/hooks';
import { Text } from 'src/components';

import * as S from './styled';

export interface EoullimBoxProps {
  title: string;
  icon: string;
  navigateUrl: string;
}

export const EoullimBox: React.FC<EoullimBoxProps> = ({ title, icon, navigateUrl }) => {
  const { handlePressIn, handlePressOut, scaleAnimatedStyle } = usePressingAnimation();
  const navigate = useNavigate();

  return (
    <S.EoullimBoxWrapper
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => navigate(navigateUrl)}
      activeOpacity={0.9}
      style={{ ...scaleAnimatedStyle }}
    >
      <S.EoullimBox blurType="light" reducedTransparencyFallbackColor="white" />
      <S.EoullimBoxTextContainer>
        <Text size={54} fontFamily="bold">
          {icon}
        </Text>
        <Text size={18} fontFamily="bold">
          {title}
        </Text>
      </S.EoullimBoxTextContainer>
    </S.EoullimBoxWrapper>
  );
};
