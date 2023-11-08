import React from 'react';

import { isIos } from 'src/utils';

import * as S from './styled';

export interface HeaderProps {
  children: React.ReactNode;
}

export const HomeHeader: React.FC<HeaderProps> = ({ children }) => {
  if (isIos) {
    return (
      <S.IosHeader blurType="thinMaterialDark" reducedTransparencyFallbackColor="white">
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
