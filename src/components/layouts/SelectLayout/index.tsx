import React from 'react';

import * as S from './styled';

export interface SelectLayoutProps {
  children: React.ReactNode;
}

export const SelectLayout: React.FC<SelectLayoutProps> = ({ children }) => {
  return (
    <S.SelectLayout
      contentContainerStyle={{
        rowGap: 6,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </S.SelectLayout>
  );
};
