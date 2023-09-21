import React from 'react';

import { isIos } from 'src/utils';

import * as S from './styled';

export interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  if (isIos) {
    return (
      <S.IosHeader blurType="light" reducedTransparencyFallbackColor="white">
        {children}
      </S.IosHeader>
    );
  } else {
    return (
      // <S.AndroidHeaderBlur blurType="light">
      <S.AndroidHeaderBlur>
        <S.AndroidHeader>{children}</S.AndroidHeader>
      </S.AndroidHeaderBlur>
    );
  }
};
