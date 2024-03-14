import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';

import { useIsFocused } from '@react-navigation/native';

import { useSetRecoilState } from 'recoil';

import { CommunityMainAnimatedHeader, PostDataLayout, ScopeBottomSheet } from 'src/components';
import { useBottomSheet, useGetPosts } from 'src/hooks';
import { RPH, isIos } from 'src/utils';
import { GetCommentsAuthorProps, LimitedArticleScopeOfDisclosure } from 'src/api';
import { OpenBottomSheetProps } from 'src/screens/user';
import { communityEditAtom } from 'src/atoms';

import * as S from './styled';

export interface HeaderOptionProps extends OpenBottomSheetProps {
  author?: GetCommentsAuthorProps;
}

const SCOPE_BOTTOM_SHEET_HEIGHT = RPH(-26);

export const CommunityMainScreen: React.FC = () => {
  const setCommunityEdit = useSetRecoilState(communityEditAtom);

  const [postScope, setPostScope] = useState<LimitedArticleScopeOfDisclosure | null>(null);

  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage } = useGetPosts({
    scope: postScope,
    cursor: null,
  });

  // const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const { bottomSheetRef, openBottomSheet } = useBottomSheet();

  const inset = useSafeAreaInsets();

  const HEADER_HEIGHT = isIos ? inset.top : 68;

  const scrollY = useRef(new Animated.Value(0)).current;

  const [isSearchScreen, setIsSearchScreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
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

  // const onChangeText = (text: string) => {
  //   setSearchQuery(text);
  // };

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    refetch();
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const onHeaderScopePress = () => {
    openBottomSheet({ scrollTo: SCOPE_BOTTOM_SHEET_HEIGHT });
  };

  const onScopeItemPress = (scope: LimitedArticleScopeOfDisclosure | null) => {
    setPostScope(scope);
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
      setCommunityEdit({ text: '', images: [], id: null });
    }
  }, [isFocused]);

  return (
    <S.CommunityMainWrapper style={{ paddingTop: 40 }}>
      <CommunityMainAnimatedHeader
        onScopePress={onHeaderScopePress}
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
      <ScopeBottomSheet
        ref={bottomSheetRef}
        onPress={onScopeItemPress}
        scope={postScope}
        SCOPE_BOTTOM_SHEET_HEIGHT={SCOPE_BOTTOM_SHEET_HEIGHT}
      />
    </S.CommunityMainWrapper>
  );
};
