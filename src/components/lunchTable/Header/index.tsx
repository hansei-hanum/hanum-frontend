import React from 'react';

import { isIos } from 'src/utils';

import * as S from './styled';

export interface LunchTableHeaderProps {
  children: React.ReactNode;
}

export const LunchTableHeader: React.FC<LunchTableHeaderProps> = ({ children }) => {
  if (isIos) {
    return (
      <S.IosHeader blurType="light" reducedTransparencyFallbackColor="white">
        {children}
      </S.IosHeader>
    );
  } else {
    return (
      <S.AndroidHeaderBlur blurType="light">
        <S.AndroidHeader>{children}</S.AndroidHeader>
      </S.AndroidHeaderBlur>
    );
  }
};
