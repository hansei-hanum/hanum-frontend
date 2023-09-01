import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { boxShadow } from 'src/constants';

import * as S from './styled';

export interface ContentBoxProps {
  children: React.ReactNode;
  isHome?: boolean;
  style?: StyleProp<ViewStyle>;
}
export const ContentBox: React.FC<ContentBoxProps> = ({ children, isHome, style }) => {
  return (
    <S.ContentBoxContainer
      style={[
        style,
        boxShadow,
        {
          padding: isHome ? 0 : 16,
        },
      ]}
    >
      {children}
    </S.ContentBoxContainer>
  );
};
