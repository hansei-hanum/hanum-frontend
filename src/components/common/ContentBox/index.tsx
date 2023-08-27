import React from 'react';

import * as S from './styled';

export interface ContentBoxProps {
  children: React.ReactNode;
  isHome?: boolean;
}
export const ContentBox: React.FC<ContentBoxProps> = ({ children, isHome }) => {
  return (
    <S.ContentBoxContainer
      style={{
        padding: isHome ? 0 : 16,
        shadowColor: '#B0B9C2',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 40,
      }}
    >
      {children}
    </S.ContentBoxContainer>
  );
};
