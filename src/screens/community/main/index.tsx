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

import { useTheme } from '@emotion/react';

import { ContentBox, Header, Text } from 'src/components';
import { useGetUser } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { COMMUNITY_LIST } from 'src/constants/community';
import { RPH } from 'src/utils';

import * as S from './styled';

export const CommunityMainScreen: React.FC = () => {
  const { width } = Dimensions.get('window');

  const { userProfile } = useGetUser();

  const theme = useTheme();

  const searchRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [imageHeights, setImageHeights] = useState<Array<number>>([]);

  const getHeightsForImage = useCallback((uri: string, index: number) => {
    try {
      Image.getSize(uri, (w, h) => {
        const imageHeight = ((h - 400) * width) / w;
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
      duration: 300,
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
    const now = new Date();
    const time = new Date(date);
    const diff = now.getTime() - time.getTime();
    const diffMin = Math.floor(diff / 1000 / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffMonth / 16);
    if (diffMin < 1) {
      return '방금 전';
    } else if (diffMin < 60) {
      return `${diffMin}분 전`;
    } else if (diffHour < 24) {
      return `${diffHour}시간 전`;
    } else if (diffDay < 30) {
      return `${diffDay}일 전`;
    } else if (diffMonth < 12) {
      return `${diffMonth}달 전`;
    } else {
      return `${diffYear}년 전`;
    }
  };

  useEffect(() => {
    COMMUNITY_LIST.forEach((item, index) => {
      item.content.image.slice(0, 1).forEach((image, i) => {
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
                    <Text size={24} style={{ width: '100%' }}>
                      {item.content.message}
                    </Text>
                  ) : (
                    <S.CommunityMainBoxContainer>
                      <Text size={18} style={{ width: '100%' }}>
                        {item.content.message}
                      </Text>
                      <S.CommunityMainBoxImageContainer>
                        {item.content.image.slice(0, 1).map((image, i) => {
                          const imageHeight = imageHeights[index * item.content.image.length + i];
                          return (
                            <Image
                              key={i}
                              style={{ width: '100%' }}
                              source={{
                                uri: image,
                                height: imageHeight > RPH(45) ? RPH(45) : imageHeight,
                              }}
                              resizeMode="contain"
                            />
                          );
                        })}
                      </S.CommunityMainBoxImageContainer>
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
