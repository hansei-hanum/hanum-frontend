import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  TextInput,
  Easing,
  LayoutAnimation,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { CommunityHeader, CommunityPost, Header, ScaleOpacity, Text } from 'src/components';
import { useGetImagesHeight, useGetUser, useNavigate } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { COMMUNITY_LIST } from 'src/constants';
import { isIos } from 'src/utils';

import * as S from './styled';

export const CommunityMainScreen: React.FC = () => {
  const navigate = useNavigate();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const { userProfile } = useGetUser();

  const theme = useTheme();

  const searchRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [likes, setLikes] = useState<Array<boolean>>([]);

  const value = useRef(new Animated.Value(0)).current;

  const show = () => {
    setIsFocused(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(value, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const hidden = () => {
    setIsFocused(false);
    if (isFocused) {
      searchRef.current && searchRef.current.blur();
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const searchBarAnimation = {
    flex: value.interpolate({ inputRange: [0, 1], outputRange: [1, 1] }),
  };
  const opacityAnimation = {
    opacity: value.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
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

  return (
    <S.CommunityMainWrapper>
      <Header isRow>
        <S.CommunityMainSearchBarContainer style={searchBarAnimation}>
          <S.CommunityMainSearchBar
            placeholder="대나무숲 게시글 검색하기"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.placeholder}
            ref={searchRef}
            onFocus={show}
          />
          <Icon name="search" size={24} color={theme.placeholder} />
        </S.CommunityMainSearchBarContainer>
        {isFocused && (
          <S.CommunityMainIconWrapper style={opacityAnimation}>
            <TouchableOpacity activeOpacity={0.8} onPress={hidden}>
              <Icon name="cancel" size={24} color={theme.placeholder} />
            </TouchableOpacity>
          </S.CommunityMainIconWrapper>
        )}
      </Header>
      {!isFocused ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: isIos ? 20 : 0,
            paddingBottom: 40,
            rowGap: 16,
          }}
        >
          <S.CommunityUserContainer>
            <S.CommunityImage
              source={userProfile ? { uri: userProfile } : UserLogo}
              style={{ resizeMode: 'contain' }}
            />
            <S.CommunityUserThinkBox>
              <Text size={16} color={theme.placeholder}>
                어떤 생각을 하고 계신가요?
              </Text>
            </S.CommunityUserThinkBox>
          </S.CommunityUserContainer>
          {COMMUNITY_LIST.map(({ author, content, time, type }, index) => {
            return (
              <S.CommunityMainBox key={index}>
                <CommunityHeader
                  author={author}
                  type={type}
                  time={time}
                  style={{ width: '100%' }}
                />
                <CommunityPost
                  author={author}
                  content={content}
                  time={time}
                  type={type}
                  index={index}
                  imageHeights={imageHeights}
                />
                <S.CommunityMainBottom>
                  <S.CommunityMainBottomIconContainer>
                    <ScaleOpacity onPress={() => onLikeClick(index)}>
                      {likes[index] ? (
                        <MCI name="cards-heart" size={24} color={theme.danger} />
                      ) : (
                        <MCI name="cards-heart-outline" size={24} color={theme.placeholder} />
                      )}
                    </ScaleOpacity>
                    <Text size={14} color={theme.placeholder}>
                      좋아요 {likes[index] ? content.likes + 1 : content.likes}
                    </Text>
                  </S.CommunityMainBottomIconContainer>
                  <ScaleOpacity onPress={() => navigate('CommunityChat')}>
                    <S.CommunityMainBottomIconContainer>
                      <Icon name="chatbubble-outline" size={24} color={theme.placeholder} />
                      <Text size={14} color={theme.placeholder}>
                        댓글 {content.comments}
                      </Text>
                    </S.CommunityMainBottomIconContainer>
                  </ScaleOpacity>
                </S.CommunityMainBottom>
              </S.CommunityMainBox>
            );
          })}
        </ScrollView>
      ) : (
        <S.TextWrapper2 style={opacityAnimation}>
          <Text size={15}>This Is Search 잉기</Text>
        </S.TextWrapper2>
      )}
    </S.CommunityMainWrapper>
  );
};
