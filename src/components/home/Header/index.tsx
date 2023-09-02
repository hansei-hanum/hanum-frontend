import React from 'react';
import { Platform } from 'react-native';

import * as S from './styled';

export interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  if (Platform.OS === 'ios') {
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
