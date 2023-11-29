import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import * as S from './styled';

export interface HeaderProps {
  children: React.ReactNode;
  isRow?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<HeaderProps> = ({ children, isRow, style }) => {
  return (
    <S.HeaderContainer
      style={[
        style,
        {
          flexDirection: isRow ? 'row' : 'column',
          alignItems: isRow ? 'center' : 'flex-start',
          justifyContent: isRow ? 'space-between' : 'flex-start',
        },
      ]}
    >
      {children}
    </S.HeaderContainer>
  );
};
