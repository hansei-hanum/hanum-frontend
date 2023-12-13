import { useEffect, useRef, useState } from 'react';
import { Animated, TextInput, LayoutAnimation, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { StackScreenProps } from '@react-navigation/stack';

import { useTheme } from '@emotion/react';

import {
  CommunityPostHeader,
  CommunityPost,
  CommunityUserImage,
  Header,
  ScaleOpacity,
  Text,
} from 'src/components';
import { useBottomSheet, useGetImagesHeight, useGetUser } from 'src/hooks';
import { COMMUNITY_LIST } from 'src/constants';
import { isIos } from 'src/utils';
import { CommunityBottomSheet } from 'src/layouts';
import { RootStackParamList } from 'src/Router';

import * as S from './styled';

export type CommunityMainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;

export const CommunityMainScreen: React.FC<CommunityMainScreenProps> = ({ navigation }) => {
  const inset = useSafeAreaInsets();

  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const { userProfile } = useGetUser();

  const theme = useTheme();

  const searchRef = useRef<TextInput>(null);

  const [isSearchScreen, setIsSearchScreen] = useState(false);
  const [likes, setLikes] = useState<Array<boolean>>([]);

  const searchAnimationValue = useRef(new Animated.Value(0)).current;

  const config = {
    duration: 250,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  };

  const showSearchScreen = () => {
    setIsSearchScreen(true);
    LayoutAnimation.configureNext(config);
  };

  const closeSearchScreen = () => {
    setIsSearchScreen(false);
    searchRef.current?.blur();
    LayoutAnimation.configureNext(config);
  };

  const searchBarAnimation = {
    flex: searchAnimationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1] }),
  };

  const opacityAnimation = {
    opacity: searchAnimationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
    scale: searchAnimationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] }),
  };

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

  return (
    <S.CommunityMainWrapper style={{ paddingTop: inset.top }}>
      <Header isRow>
        <S.CommunityMainSearchBarContainer style={searchBarAnimation}>
          <TouchableWithoutFeedback onPress={showSearchScreen}>
            <Icon name="search" size={24} color={theme.placeholder} />
          </TouchableWithoutFeedback>
          <S.CommunityMainSearchBar
            placeholder="대나무숲 게시글 검색하기"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.placeholder}
            ref={searchRef}
            onFocus={showSearchScreen}
          />
        </S.CommunityMainSearchBarContainer>
        {isSearchScreen && (
          <S.CommunityMainIconWrapper style={opacityAnimation}>
            <TouchableOpacity activeOpacity={0.8} onPress={closeSearchScreen}>
              <Icon name="close" size={30} color={theme.placeholder} />
            </TouchableOpacity>
          </S.CommunityMainIconWrapper>
        )}
      </Header>
      {!isSearchScreen ? (
        <FlatList
          data={COMMUNITY_LIST}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingTop: isIos ? 20 : 0, paddingBottom: 40, rowGap: 16 }}
          ListHeaderComponent={
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
        <S.TextWrapper2 style={opacityAnimation}>
          <Text size={15}>This Is Search 잉기</Text>
        </S.TextWrapper2>
      )}
      <CommunityBottomSheet bottomSheetRef={bottomSheetRef} closeBottomSheet={closeBottomSheet} />
    </S.CommunityMainWrapper>
  );
};
