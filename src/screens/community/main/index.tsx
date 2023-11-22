/* eslint-disable prefer-const */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  TextInput,
  Easing,
  LayoutAnimation,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';

import moment from 'moment-timezone';
import { useTheme } from '@emotion/react';

import { ContentBox, Header, ImageCard, Text } from 'src/components';
import { useGetUser } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { COMMUNITY_LIST } from 'src/constants/community';

import * as S from './styled';

export const CommunityMainScreen: React.FC = () => {
  const { width } = Dimensions.get('window');

  const { userProfile } = useGetUser();

  const theme = useTheme();

  const searchRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [imageHeights, setImageHeights] = useState<Array<number>>([]);

  const getHeightsForImage = useCallback((uri: string, index: number, number: number) => {
    try {
      Image.getSize(uri, (w, h) => {
        let imageHeight = 0;
        if (number === 1) {
          imageHeight = (h * width) / w;
        } else {
          imageHeight = ((h / 2.4) * width) / w;
        }
        setImageHeights((prev) => {
          const newImageHeights = [...prev];
          newImageHeights[index] = imageHeight;
          return newImageHeights;
        });
      });
    } catch (error) {
      console.error('Error getting image size:', error);
    }
  }, []);

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

  const getTime = (date: string) => {
    const now = moment().tz('Asia/Seoul');
    const target = moment(date).tz('Asia/Seoul');
    const diff = now.diff(target, 'seconds');
    const diffMinutes = now.diff(target, 'minutes');
    const diffHours = now.diff(target, 'hours');
    const diffDays = now.diff(target, 'days');
    const diffWeeks = now.diff(target, 'weeks');
    const diffMonths = now.diff(target, 'months');
    const diffYears = now.diff(target, 'years');
    if (diff < 1) {
      return '방금 전';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks}주 전`;
    } else if (diffMonths < 12) {
      return `${diffMonths}달 전`;
    } else if (diffYears < 1) {
      return `${diffYears}년 전`;
    }
  };

  useEffect(() => {
    COMMUNITY_LIST.forEach((item, index) => {
      item.content.image.forEach((image, i) => {
        if (item.content.image.length === 1)
          getHeightsForImage(image, index * item.content.image.length + i, 1);
        else getHeightsForImage(image, index * item.content.image.length + i, 2);
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
            <Icon name="cancel" size={24} color={theme.placeholder} onPress={hidden} />
          </S.CommunityMainIconWrapper>
        )}
      </Header>
      {!isFocused ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 40,
            paddingHorizontal: 20,
            rowGap: 20,
          }}
        >
          <ContentBox>
            <S.CommunityUserContainer>
              <S.CommunityImage
                source={userProfile ? { uri: userProfile } : UserLogo}
                style={{ resizeMode: 'contain' }}
              />
              <S.CommunityUserThinkBox>
                <Text size={15} color={theme.placeholder}>
                  어떤 생각을 하고 계신가요?
                </Text>
              </S.CommunityUserThinkBox>
            </S.CommunityUserContainer>
          </ContentBox>
          {COMMUNITY_LIST.map((item, index) => {
            return (
              <ContentBox key={item.time + Math.random()}>
                <S.CommunityMainBox>
                  <S.CommunityMainBoxHeader>
                    <S.CommunityMainBoxHeaderTitle>
                      <S.CommunityImage
                        source={item.author.image ? { uri: item.author.image } : UserLogo}
                        style={{ resizeMode: 'contain' }}
                      />
                      <View>
                        <Text size={16}>{item.author.name}</Text>
                        <S.CommunityMainBoxUserProfile>
                          <Text size={14} color={theme.placeholder}>
                            {getTime(item.time)}
                          </Text>
                          {item.type === 'ALL' && (
                            <Icon name="public" size={16} color={theme.placeholder} />
                          )}
                          {item.type === 'PRIVATE' && (
                            <Icon name="lock" size={16} color={theme.placeholder} />
                          )}
                          {item.type === 'STUDENT' && (
                            <Icon name="school" size={16} color={theme.placeholder} />
                          )}
                        </S.CommunityMainBoxUserProfile>
                      </View>
                    </S.CommunityMainBoxHeaderTitle>
                    <Icon name="more-horiz" size={24} color={theme.placeholder} />
                  </S.CommunityMainBoxHeader>
                  {item.content.image.length <= 0 ? (
                    <Text size={20} style={{ width: '100%' }}>
                      {item.content.message}
                    </Text>
                  ) : (
                    <S.CommunityMainBoxContainer>
                      <Text size={18} style={{ width: '100%' }}>
                        {item.content.message}
                      </Text>
                      <ImageCard item={item} index={index} imageHeights={imageHeights} />
                    </S.CommunityMainBoxContainer>
                  )}
                </S.CommunityMainBox>
              </ContentBox>
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
