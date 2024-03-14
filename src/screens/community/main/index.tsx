import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, NativeSyntheticEvent, NativeScrollEvent, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useSetRecoilState } from 'recoil';

import { CommunityMainAnimatedHeader, PostDataLayout } from 'src/components';
import { useGetPosts } from 'src/hooks';
import { isIos } from 'src/utils';
import { GetCommentsAuthorProps, LimitedArticleScopeOfDisclosure } from 'src/api';
import { OpenBottomSheetProps } from 'src/screens/user';
import { communityEditAtom } from 'src/atoms';

import * as S from './styled';

export interface HeaderOptionProps extends OpenBottomSheetProps {
  author?: GetCommentsAuthorProps;
}

export const CommunityMainScreen: React.FC = () => {
  const setCommunityEdit = useSetRecoilState(communityEditAtom);

  const [postScope, setPostScope] = useState<LimitedArticleScopeOfDisclosure | null>(null);

  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage } = useGetPosts({
    scope: postScope,
    cursor: null,
  });

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const inset = useSafeAreaInsets();

  const HEADER_HEIGHT = isIos ? inset.top + 14 : 68;

  const scrollY = useRef(new Animated.Value(0)).current;
  const searchRef = useRef<TextInput>(null);

  const [isSearchScreen, setIsSearchScreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    searchRef.current?.blur();
    setIsSearchScreen(false);
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

  const onEndReached = () => {
    fetchNextPage();
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

  useEffect(() => {
    if (isFocused) {
      refetch();
      setCommunityEdit({ text: '', images: [], id: null });
    }
  }, [isFocused]);

  return (
    <S.CommunityMainWrapper style={{ paddingTop: inset.top }}>
      <CommunityMainAnimatedHeader
        postScope={postScope}
        hidden={hidden}
        scrollY={scrollY}
        HEADER_HEIGHT={HEADER_HEIGHT}
        isSearchScreen={isSearchScreen}
      />
      <PostDataLayout
        data={data}
        onEndReached={onEndReached}
        hasThinkSection
        isLoading={isLoading}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        isFetchingNextPage={isFetchingNextPage}
        onScroll={onScroll}
        onMomentumScrollEnd={onSetScrollY}
      />
    </S.CommunityMainWrapper>
  );
};
