import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { useRecoilValue } from 'recoil';

import { boxShadow } from 'src/constants';
import { themeAtom } from 'src/atoms';

import * as S from './styled';

export interface ContentBoxProps {
  children: React.ReactNode;
  isHome?: boolean;
  style?: StyleProp<ViewStyle>;
}
export const ContentBox: React.FC<ContentBoxProps> = ({ children, isHome, style }) => {
  const themeValue = useRecoilValue(themeAtom);

  return (
    <S.ContentBoxContainer
      style={[
        style,
        themeValue === 'light' && boxShadow,
        {
          padding: isHome ? 0 : 16,
        },
      ]}
    >
      {children}
    </S.ContentBoxContainer>
  );
};
