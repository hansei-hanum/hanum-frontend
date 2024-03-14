import React from 'react';

import { useTheme } from '@emotion/react';

import { GoBackIcon } from 'src/components';

import * as S from './styled';

export const CommunitySearchScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <S.CommunitySearchContainer>
      <S.CommunitySearchHeaderWrapper>
        <GoBackIcon />
        <S.CommunitySearchHeaderContainer>
          <S.CommunitySearchBar
            placeholder="대나무숲 게시글 검색하기"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
          />
        </S.CommunitySearchHeaderContainer>
      </S.CommunitySearchHeaderWrapper>
    </S.CommunitySearchContainer>
  );
};
