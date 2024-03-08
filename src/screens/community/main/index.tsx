import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, NativeSyntheticEvent, NativeScrollEvent, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

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
import { useBottomSheet, useGetPosts, useGetUser, useNavigate } from 'src/hooks';
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

  const navigate = useNavigate();
  const inset = useSafeAreaInsets();

  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const [isSearchScreen, setIsSearchScreen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const onChatScreenNavigate = (index: number) => {
    console.log('index', index);
    navigate('CommunityPostDetail', { id: index, isEdit: false });
    console.log('onChatScreenNavigate', index);
  };

  const HEADER_HEIGHT = isIos ? inset.top + 14 : 68;

  const scrollY = useRef(new Animated.Value(0)).current;

  const [hidden, setHidden] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

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

  const isFocused = useIsFocused();

  const onEndReached = () => {
    setIsFetching(true);
    fetchNextPage();
  };

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false);
    }
  }, [data]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [postScope]);

  return (
    <S.CommunityMainWrapper style={{ paddingTop: inset.top }}>
      <CommunityMainAnimatedHeader
        hidden={hidden}
        scrollY={scrollY}
        HEADER_HEIGHT={HEADER_HEIGHT}
        setIsSearchScreen={setIsSearchScreen}
        isSearchScreen={isSearchScreen}
        setHidden={setHidden}
      />
      {isLoading ? (
        <>
          <PostsTopSection postScope={postScope} setPostScope={setPostScope} />
          <Spinner size={40} isCenter />
        </>
      ) : data ? (
        data.pages[0].data.items.length > 0 ? (
          <FlatList
            onScroll={onScroll}
            onMomentumScrollEnd={onSetScrollY}
            scrollEventThrottle={16}
            data={data.pages}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={
              <PostsTopSection postScope={postScope} setPostScope={setPostScope} />
            }
            contentContainerStyle={{
              paddingTop: isIos ? inset.top + 24 : 68,
              paddingBottom: 60,
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
                      id,
                    },
                    index,
                  ) => (
                    <S.CommunityMainBox key={id}>
                      <CommunityPostHeader
                        author={author}
                        scopeOfDisclosure={scopeOfDisclosure}
                        createdAt={createdAt}
                        style={{ width: '100%' }}
                        openBottomSheet={() =>
                          openBottomSheet({ scrollTo: COMMUNITY_BOTTOM_SHEET_HEIGHT })
                        }
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
                      <PostBottom
                        id={id}
                        likesLength={reactions
                          ?.map(({ count }) => count)
                          .reduce((acc, cur) => acc + cur, 0)}
                        commentCount={commentCount}
                      />
                    </S.CommunityMainBox>
                  ),
                )}
                {isFetchingNextPage && (
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
      <PostOptionBottomSheet bottomSheetRef={bottomSheetRef} closeBottomSheet={closeBottomSheet} />
    </S.CommunityMainWrapper>
  );
};
