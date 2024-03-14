import React, { useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';

import { useTheme } from '@emotion/react';

import { GoBackIcon, PostDataLayout } from 'src/components';
import { useDebounce, useSearchPosts } from 'src/hooks';
import { RootStackParamList } from 'src/types';

import * as S from './styled';

export type CommunitySearchScreenProps = StackScreenProps<RootStackParamList, 'CommunitySearch'>;

export const CommunitySearchScreen: React.FC<CommunitySearchScreenProps> = ({ route }) => {
  const { scope } = route.params;
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const { debouncedValue } = useDebounce(searchQuery ? searchQuery : '', 300);
  console.log('debouncedValue', debouncedValue);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    fetchNextPage: searchFetchNextPage,
    isFetchingNextPage: isSearchFetchingNextPage,
  } = useSearchPosts({
    scope: scope,
    cursor: null,
    query: debouncedValue,
  });

  const onChangeTextInput = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <S.CommunitySearchContainer>
      <S.CommunitySearchHeaderWrapper>
        <GoBackIcon />
        <S.CommunitySearchHeaderContainer>
          <S.CommunitySearchBar
            placeholder="대나무숲 게시글 검색하기"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
            value={searchQuery || ''}
            onChangeText={onChangeTextInput}
          />
        </S.CommunitySearchHeaderContainer>
      </S.CommunitySearchHeaderWrapper>
      <PostDataLayout
        data={searchData}
        hasInset={false}
        onEndReached={searchFetchNextPage}
        isLoading={isSearchLoading}
        isFetchingNextPage={isSearchFetchingNextPage}
      />
    </S.CommunitySearchContainer>
  );
};
