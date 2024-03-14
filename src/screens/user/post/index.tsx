import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';

import { PostDataLayout, ScreenHeader } from 'src/components';
import { useGetMyPosts } from 'src/hooks';

import * as S from './styled';

export interface OpenBottomSheetProps {
  postId: number | null;
  text: string;
  images: { uri: string; id: number }[];
}

export const UserPostScreen: React.FC = () => {
  const theme = useTheme();

  const { data, isLoading, fetchNextPage, isFetchingNextPage, refetch } = useGetMyPosts({
    cursor: null,
  });

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    refetch();
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title="내 게시물"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: isScrolled ? theme.lightGray : 'transparent',
        }}
      />
      <S.UserPostWrapper>
        <PostDataLayout
          style={{ position: 'relative', top: 0, paddingTop: 10 }}
          data={data}
          isLoading={isLoading}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          isFetchingNextPage={isFetchingNextPage}
          onScroll={(e) => setIsScrolled(e.nativeEvent.contentOffset.y > 0)}
          onEndReached={() => fetchNextPage()}
        />
      </S.UserPostWrapper>
    </SafeAreaView>
  );
};
