import React from 'react';

import { useRecoilValue } from 'recoil';

import { isIos } from 'src/utils';
import { themeAtom } from 'src/atoms';

import * as S from './styled';

export interface HeaderProps {
  children: React.ReactNode;
}

export const HomeHeader: React.FC<HeaderProps> = ({ children }) => {
  const themeValue = useRecoilValue(themeAtom);

  if (isIos && themeValue !== 'dark') {
    return (
      <S.IosBlurHeader blurType="light" blurAmount={16}>
        {children}
      </S.IosBlurHeader>
    );
  } else if (isIos && themeValue === 'dark') {
    return <S.IosHeader>{children}</S.IosHeader>;
  } else {
    return (
      <S.AndroidHeaderBlur>
        <S.AndroidHeader>{children}</S.AndroidHeader>
      </S.AndroidHeaderBlur>
    );
  }
};
