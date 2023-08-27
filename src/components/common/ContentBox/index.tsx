import React from 'react';

import { boxShadow } from 'src/constants';

import * as S from './styled';

export interface ContentBoxProps {
  children: React.ReactNode;
  isHome?: boolean;
}
export const ContentBox: React.FC<ContentBoxProps> = ({ children, isHome }) => {
  return (
    <S.ContentBoxContainer
      style={[
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
