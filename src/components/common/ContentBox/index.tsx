import React from 'react';

import * as S from './styled';

export interface ContentBoxProps {
  children: React.ReactNode;
}
export const ContentBox: React.FC<ContentBoxProps> = ({ children }) => {
  return (
    <S.ContentBoxContainer
      style={{
        shadowColor: '#B0B9C2',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.28,
        shadowRadius: 4.65,
        elevation: 40,
      }}
    >
      {children}
    </S.ContentBoxContainer>
  );
};
