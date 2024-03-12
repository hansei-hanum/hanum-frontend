import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, NativeSyntheticEvent, NativeScrollEvent, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { RefreshControl } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';

import {
  CommunityPostHeader,
  CommunityPost,
  Text,
  CommunityMainAnimatedHeader,
  PostOptionBottomSheet,
  PostBottom,
  Spinner,
  PostsTopSection,
} from 'src/components';
import {
  useBottomSheet,
  useDebounce,
  useGetPosts,
  useGetUser,
  useNavigate,
  useSearchPosts,
} from 'src/hooks';
import { COMMUNITY_BOTTOM_SHEET_HEIGHT } from 'src/constants';
import { isIos } from 'src/utils';
import { LimitedArticleScopeOfDisclosure } from 'src/api';

import * as S from './styled';

export const CommunityMainScreen: React.FC = () => {
  const theme = useTheme();

  const [postScope, setPostScope] = useState<LimitedArticleScopeOfDisclosure>(
    LimitedArticleScopeOfDisclosure.Public,
  );

  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage } = useGetPosts({
    scope: postScope,
    cursor: null,
  });

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const { debouncedValue } = useDebounce(searchQuery ? searchQuery : '', 300);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    fetchNextPage: searchFetchNextPage,
    isFetchingNextPage: isSearchFetchingNextPage,
  } = useSearchPosts({
    scope: postScope,
    cursor: null,
    query: debouncedValue,
  });

  const navigate = useNavigate();
  const inset = useSafeAreaInsets();

  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const onChatScreenNavigate = (index: number) => {
    navigate('CommunityPostDetail', { id: index, isEdit: false });
  };

  const HEADER_HEIGHT = isIos ? inset.top + 14 : 68;

  const scrollY = useRef(new Animated.Value(0)).current;

  const [isSearchScreen, setIsSearchScreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
    setHidden(offsetY > 0 && scrollValue !== offsetY);
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    });
  };

  const onSetScrollY = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollValue(e.nativeEvent.contentOffset.y);
  };
  const { verifyUser } = useGetUser();

  const onProfilePress = () => {
    if (verifyUser) {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: '클라우드보안과 2학년 2반 재학생이에요',
      });
    } else {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: '익명 사용자에요',
      });
    }
  };

  const onEndReached = () => {
    if (searchData) {
      searchFetchNextPage();
    } else if (data) {
      fetchNextPage();
    }
  };

  const onChangeText = (text: string) => {
    setSearchQuery(text);
  };

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    refetch();
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const isFocused = useIsFocused();

  const onHeaderOptionPress = (id?: number, name?: string) => {
    if (id && name) {
      setTargetId(id);
      setUserName(name);
    }
    openBottomSheet({ scrollTo: COMMUNITY_BOTTOM_SHEET_HEIGHT });
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <S.CommunityMainWrapper style={{ paddingTop: inset.top }}>
      <CommunityMainAnimatedHeader
        hidden={hidden}
        scrollY={scrollY}
        HEADER_HEIGHT={HEADER_HEIGHT}
        setIsSearchScreen={setIsSearchScreen}
        isSearchScreen={isSearchScreen}
        setHidden={setHidden}
        onChangeText={onChangeText}
        value={searchQuery ? searchQuery : ''}
      />
      {isSearchLoading ? (
        <Spinner size={40} isCenter />
      ) : isLoading ? (
        <>
          <PostsTopSection postScope={postScope} setPostScope={setPostScope} />
          <View
            style={{
              flex: 2,
            }}
          >
            <Spinner size={40} />
          </View>
        </>
      ) : data || searchData ? (
        data?.pages.length || searchData?.pages.length ? (
          <FlatList
            onScroll={onScroll}
            onMomentumScrollEnd={onSetScrollY}
            scrollEventThrottle={16}
            data={searchData ? searchData.pages : data?.pages || []}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={
              searchData ? null : (
                <PostsTopSection postScope={postScope} setPostScope={setPostScope} />
              )
            }
            refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
            style={{
              position: 'relative',
              paddingTop: isIos ? inset.top + 24 : 68,
            }}
            contentContainerStyle={{
              paddingBottom: inset.bottom + 100,
              rowGap: 40,
            }}
            renderItem={({ item: { data } }) => (
              <View style={{ rowGap: 60 }}>
                {data.items.map(
                  (
                    {
                      author,
                      scopeOfDisclosure,
                      createdAt,
                      content,
                      attachments,
                      commentCount,
                      reactions,
                      authorName,
                      id,
                    },
                    index,
                  ) => (
                    <S.CommunityMainBox key={id}>
                      <CommunityPostHeader
                        authorName={authorName}
                        author={author}
                        scopeOfDisclosure={scopeOfDisclosure}
                        createdAt={createdAt}
                        style={{ width: '100%' }}
                        openBottomSheet={() => {
                          onHeaderOptionPress(author?.id, author?.name);
                        }}
                        onPress={() => onChatScreenNavigate(id)}
                        userImagePress={onProfilePress}
                      />
                      <CommunityPost
                        content={content}
                        attachments={attachments}
                        createdAt={createdAt}
                        onPress={() => onChatScreenNavigate(id)}
                        index={index}
                      />
                      <PostBottom id={id} reactions={reactions} commentCount={commentCount} />
                    </S.CommunityMainBox>
                  ),
                )}
                {(isFetchingNextPage || isSearchFetchingNextPage) && (
                  <View style={{ paddingVertical: 20 }}>
                    <Spinner size={40} />
                  </View>
                )}
              </View>
            )}
          />
        ) : (
          <>
            <PostsTopSection postScope={postScope} setPostScope={setPostScope} />
            <S.CommunityMainNoDataWrapper>
              <Text size={16} color={theme.placeholder} isCenter>
                이 메뉴에는 아직 작성된 글이 없어요
              </Text>
            </S.CommunityMainNoDataWrapper>
          </>
        )
      ) : (
        <>
          <PostsTopSection postScope={postScope} setPostScope={setPostScope} />
          <S.CommunityMainNoDataWrapper>
            <Text size={16} color={theme.placeholder} isCenter>
              지금은 게시글을 불러올 수 없어요
            </Text>
          </S.CommunityMainNoDataWrapper>
        </>
      )}

      <PostOptionBottomSheet
        userName={userName}
        bottomSheetRef={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
        targetId={targetId}
      />
    </S.CommunityMainWrapper>
  );
};
