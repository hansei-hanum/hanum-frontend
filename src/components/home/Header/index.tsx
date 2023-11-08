import React from 'react';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { isIos } from 'src/utils';
import { themeAtom } from 'src/atoms';

import * as S from './styled';

export interface HeaderProps {
  children: React.ReactNode;
}

export const HomeHeader: React.FC<HeaderProps> = ({ children }) => {
  const themeValue = useRecoilValue(themeAtom);
  const theme = useTheme();
  if (isIos) {
    return (
      <S.IosHeader
        blurType={themeValue === 'dark' ? 'dark' : 'light'}
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
