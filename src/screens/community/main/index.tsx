import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';

import { useTheme } from '@emotion/react';

import {
  CommunityPostHeader,
  CommunityPost,
  CommunityUserImage,
  ScaleOpacity,
  Text,
} from 'src/components';
import { useBottomSheet, useGetImagesHeight, useGetUser } from 'src/hooks';
import { COMMUNITY_LIST } from 'src/constants';
import { isIos } from 'src/utils';
import { CommunityBottomSheet, CommunityMainAnimatedHeader } from 'src/layouts';
import { RootStackParamList } from 'src/Router';

import * as S from './styled';

export type CommunityMainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;

export const CommunityMainScreen: React.FC<CommunityMainScreenProps> = ({ navigation }) => {
  const inset = useSafeAreaInsets();

  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const { userProfile } = useGetUser();

  const theme = useTheme();

  const [isSearchScreen, setIsSearchScreen] = useState(false);
  const [likes, setLikes] = useState<Array<boolean>>([]);

  const onLikeClick = (index: number) => {
    setLikes((prev) => {
      const newLikes = [...prev];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  useEffect(() => {
    COMMUNITY_LIST.forEach((item, index) => {
      item.content.image.forEach((image, i) => {
        getHeightsForImage(image, index * item.content.image.length + i);
      });
    });
  }, [COMMUNITY_LIST, getHeightsForImage]);

  const onChatScreenNavigate = (index: number) => {
    navigation.navigate('CommunityChat', { id: index });
  };

  const HEADER_HEIGHT = isIos ? inset.top + 14 : 68;

  const scrollY = useRef(new Animated.Value(0)).current;
  const [hidden, setHidden] = useState(false);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
    setHidden(offsetY > 0);
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    });
  };

  return (
    <S.CommunityMainWrapper style={{ paddingTop: inset.top }}>
      <CommunityMainAnimatedHeader
        hidden={hidden}
        scrollY={scrollY}
        HEADER_HEIGHT={HEADER_HEIGHT}
        setIsSearchScreen={setIsSearchScreen}
        isSearchScreen={isSearchScreen}
      />
      {!isSearchScreen ? (
        <FlatList
          onScroll={onScroll}
          scrollEventThrottle={16}
          data={COMMUNITY_LIST}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingTop: isIos ? inset.top + 24 : 68,
            paddingBottom: 40,
            rowGap: 16,
          }}
          ListHeaderComponent={
            <S.CommunityUserWrapper>
              <ScaleOpacity onPress={() => navigation.navigate('CommunityPost')}>
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
          }
          renderItem={({ item: { author, type, time, content }, index }) => (
            <S.CommunityMainBox>
              <CommunityPostHeader
                author={author}
                type={type}
                time={time}
                style={{ width: '100%' }}
                openBottomSheet={openBottomSheet}
                onPress={() => onChatScreenNavigate(index)}
              />
              <CommunityPost
                author={author}
                content={content}
                time={time}
                type={type}
                onPress={() => onChatScreenNavigate(index)}
                index={index}
                imageHeights={imageHeights}
              />
              <S.CommunityMainBottom>
                <ScaleOpacity onPress={() => onLikeClick(index)}>
                  <S.CommunityMainBottomIconContainer>
                    {likes[index] ? (
                      <MCI name="cards-heart" size={24} color={theme.danger} />
                    ) : (
                      <MCI name="cards-heart-outline" size={24} color={theme.placeholder} />
                    )}
                    <Text size={14} color={theme.placeholder}>
                      좋아요 {likes[index] ? content.likes + 1 : content.likes}
                    </Text>
                  </S.CommunityMainBottomIconContainer>
                </ScaleOpacity>
                <ScaleOpacity onPress={() => onChatScreenNavigate(index)}>
                  <S.CommunityMainBottomIconContainer>
                    <Icon name="chatbubble-outline" size={24} color={theme.placeholder} />
                    <Text size={14} color={theme.placeholder}>
                      댓글 {content.comments}
                    </Text>
                  </S.CommunityMainBottomIconContainer>
                </ScaleOpacity>
              </S.CommunityMainBottom>
            </S.CommunityMainBox>
          )}
        />
      ) : (
        <S.TextWrapper2 style={[{ paddingTop: inset.top + 24 }]}>
          <Text size={15}>This Is Search 잉기</Text>
        </S.TextWrapper2>
      )}
      <CommunityBottomSheet bottomSheetRef={bottomSheetRef} closeBottomSheet={closeBottomSheet} />
    </S.CommunityMainWrapper>
  );
};
