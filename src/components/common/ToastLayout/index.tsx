import React from 'react';
import { useColorScheme } from 'react-native';

import { useTheme } from '@emotion/react';

import { Text } from '../Text';

import * as S from './styled';

export interface ToastLayoutProps {
  icon: React.ReactNode;
  text?: string;
}

export const ToastLayout: React.FC<ToastLayoutProps> = ({ icon, text }) => {
  const theme = useTheme();

  const systemTheme = useColorScheme();

  return (
    <S.ToastLayoutWrapper>
      <S.ToastLayoutBlurContainer
        style={{ borderRadius: 14 }}
        systemTheme={systemTheme}
        blurType={systemTheme ? systemTheme : 'light'}
        blurAmount={20}
      >
        <S.ToastLayoutIconWrapper>{icon}</S.ToastLayoutIconWrapper>
        <Text size={15} color={theme.default}>
          {text}
        </Text>
      </S.ToastLayoutBlurContainer>
    </S.ToastLayoutWrapper>
  );
};
