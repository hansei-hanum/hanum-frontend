import React from 'react';
import { Platform } from 'react-native';

import * as S from './styled';

export interface LunchTableHeaderProps {
  children: React.ReactNode;
}

export const LunchTableHeader: React.FC<LunchTableHeaderProps> = ({ children }) => {
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
