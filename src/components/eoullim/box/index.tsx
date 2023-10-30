import React from 'react';

import { useNavigate, usePressingAnimation } from 'src/hooks';
import { Icon, Text } from 'src/components';

import * as S from './styled';

export interface EoullimBoxProps {
  title: string;
  icon: string;
  navigateUrl: string;
  isBig?: boolean;
}

export const EoullimBox: React.FC<EoullimBoxProps> = ({ title, icon, navigateUrl, isBig }) => {
  const { handlePressIn, handlePressOut, scaleAnimatedStyle } = usePressingAnimation();
  const navigate = useNavigate();

  return (
    <S.EoullimBoxWrapper
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => navigate(navigateUrl)}
      activeOpacity={0.8}
      style={{ ...scaleAnimatedStyle, width: isBig ? '100%' : '48%' }}
    >
      <S.EoullimBox blurType="light" blurAmount={1} reducedTransparencyFallbackColor="white" />
      <S.EoullimBoxTextContainer>
        <Icon size={60} icon={icon} includeBackground={false} />
        <Text size={18} fontFamily="bold">
          {title}
        </Text>
      </S.EoullimBoxTextContainer>
    </S.EoullimBoxWrapper>
  );
};
