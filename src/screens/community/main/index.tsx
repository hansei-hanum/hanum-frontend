import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, NativeSyntheticEvent, NativeScrollEvent, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';

import {
  CommunityPostHeader,
  CommunityPost,
  CommunityUserImage,
  ScaleOpacity,
  Text,
  CommunityMainAnimatedHeader,
  PostOptionBottomSheet,
  PostBottom,
  PostMenu,
  Spinner,
} from 'src/components';
import {
  useBottomSheet,
  useGetImagesHeight,
  useGetPosts,
  useGetUser,
  useNavigate,
} from 'src/hooks';
import { COMMUNITY_BOTTOM_SHEET_HEIGHT, COMMUNITY_LIST } from 'src/constants';
import { isIos } from 'src/utils';
import { LimitedArticleScopeOfDisclosure } from 'src/api';

import * as S from './styled';

const CommunityMainHeader: React.FC = () => {
  const { userProfile } = useGetUser();

  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <S.CommunityUserWrapper>
      <ScaleOpacity onPress={() => navigate('CommunityCreatePost')}>
        <S.CommunityUserContainer>
          <CommunityUserImage userImage={userProfile} />
          <S.CommunityUserThinkBox>
            <Text size={16} color={theme.placeholder}>
              어떤 생각을 하고 계신가요?
            </Text>
          </S.CommunityUserThinkBox>
        </S.CommunityUserContainer>
      </ScaleOpacity>
    </S.CommunityUserWrapper>
  );
};

export const CommunityMainScreen: React.FC = () => {
  const theme = useTheme();

  const [postScope, setPostScope] = useState<LimitedArticleScopeOfDisclosure>(
    LimitedArticleScopeOfDisclosure.Public,
  );

  const { data, isLoading, refetch } = useGetPosts({
    scope: postScope,
    cursor: null,
  });

  const navigate = useNavigate();
  const inset = useSafeAreaInsets();

  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const [isSearchScreen, setIsSearchScreen] = useState(false);

  useEffect(() => {
    COMMUNITY_LIST.forEach((item, index) => {
      item.content.image.forEach((image, i) => {
        getHeightsForImage(image, index * item.content.image.length + i);
      });
    });
  }, [COMMUNITY_LIST, getHeightsForImage]);

  const onChatScreenNavigate = (index: number) => {
    navigate('CommunityPostDetail', { id: index, isEdit: false });
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
      <S.CommunityMainTopSection style={{ paddingTop: isIos ? inset.top + 24 : 68 }}>
        <CommunityMainHeader />
        <PostMenu setPostScope={setPostScope} postScope={postScope} />
      </S.CommunityMainTopSection>
      {isLoading ? (
        <Spinner size={40} isCenter />
      ) : data ? (
        data.pages[0].data.items.length > 0 ? (
          <FlatList
            onScroll={onScroll}
            onMomentumScrollEnd={onSetScrollY}
            scrollEventThrottle={16}
            data={data.pages}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingTop: isIos ? inset.top + 24 : 68,
              paddingBottom: 60,
            }}
            renderItem={({ item: { data } }) => (
              <View style={{ rowGap: 40 }}>
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
                    },
                    index,
                  ) => (
                    <S.CommunityMainBox key={index}>
                      <CommunityPostHeader
                        author={author}
                        scopeOfDisclosure={scopeOfDisclosure}
                        createdAt={createdAt}
                        style={{ width: '100%' }}
                        openBottomSheet={() =>
                          openBottomSheet({ scrollTo: COMMUNITY_BOTTOM_SHEET_HEIGHT })
                        }
                        onPress={() => onChatScreenNavigate(index)}
                        userImagePress={onProfilePress}
                      />
                      <CommunityPost
                        content={content}
                        attachments={attachments}
                        createdAt={createdAt}
                        onPress={() => onChatScreenNavigate(index)}
                        index={index}
                        imageHeights={imageHeights}
                      />
                      <PostBottom
                        index={index}
                        likesLength={reactions
                          ?.map(({ count }) => count)
                          .reduce((acc, cur) => acc + cur, 0)}
                        commentCount={commentCount}
                      />
                    </S.CommunityMainBox>
                  ),
                )}
              </View>
            )}
          />
        ) : (
          <S.CommunityMainNoDataWrapper>
            <Text size={16} color={theme.placeholder} isCenter>
              이 메뉴에는 아직 작성된 글이 없어요
            </Text>
          </S.CommunityMainNoDataWrapper>
        )
      ) : null}
      <PostOptionBottomSheet bottomSheetRef={bottomSheetRef} closeBottomSheet={closeBottomSheet} />
    </S.CommunityMainWrapper>
  );
};
