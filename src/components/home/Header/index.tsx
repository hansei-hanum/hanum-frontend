import React from 'react';

import { useTheme } from '@emotion/react';

import { isIos } from 'src/utils';

import * as S from './styled';

export interface HeaderProps {
  children: React.ReactNode;
}

export const HomeHeader: React.FC<HeaderProps> = ({ children }) => {
  const theme = useTheme();
  if (isIos) {
    return (
      <S.IosHeader
        blurType="dark"
        overlayColor={theme.modalBg}
        reducedTransparencyFallbackColor="black"
      >
        {children}
      </S.IosHeader>
    );
  } else {
    return (
      <S.AndroidHeaderBlur>
        <S.AndroidHeader>{children}</S.AndroidHeader>
      </S.AndroidHeaderBlur>
    );
  }
};
