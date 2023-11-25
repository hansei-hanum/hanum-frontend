import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  TextInput,
  Easing,
  LayoutAnimation,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { View } from 'react-native';

import moment from 'moment-timezone';
import { useTheme } from '@emotion/react';

import { Header, ScaleOpacity, Text } from 'src/components';
import { useGetUser } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { COMMUNITY_LIST } from 'src/constants';
import { RPH } from 'src/utils';

import * as S from './styled';

export const CommunityMainScreen: React.FC = () => {
  const { width } = Dimensions.get('window');

  const { userProfile } = useGetUser();

  const theme = useTheme();

  const searchRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [imageHeights, setImageHeights] = useState<Array<number>>([]);
  const [likes, setLikes] = useState<Array<boolean>>([]);

  const getHeightsForImage = useCallback((uri: string, index: number) => {
    try {
      Image.getSize(uri, (w, h) => {
        let imageHeight = 0;
        imageHeight = (h * width) / w;
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
    const units = ['방금 전', '분', '시간', '일', '주', '달', '년'];
    const diffs = [
      now.diff(target, 'seconds'),
      now.diff(target, 'minutes'),
      now.diff(target, 'hours'),
      now.diff(target, 'days'),
      now.diff(target, 'weeks'),
      now.diff(target, 'months'),
      now.diff(target, 'years'),
    ];

    for (let i = 0; i < units.length; i++) {
      if (diffs[i] < 1) {
        return units[i];
      } else if (diffs[i + 1] < 60) {
        return `${diffs[i + 1]}${units[i + 1]} 전`;
      }
    }

    return `${diffs[6]}${units[6]} 전`;
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
            paddingTop: 20,
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
              <Text size={15} color={theme.placeholder}>
                어떤 생각을 하고 계신가요?
              </Text>
            </S.CommunityUserThinkBox>
          </S.CommunityUserContainer>
          {COMMUNITY_LIST.map((item, index) => {
            return (
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
                <S.CommunityMainContentWrapper>
                  {item.content.image.length <= 0 ? (
                    <Text size={18} style={{ width: '100%' }}>
                      {item.content.message}
                    </Text>
                  ) : (
                    <Text size={16} style={{ width: '100%' }}>
                      {item.content.message}
                    </Text>
                  )}
                </S.CommunityMainContentWrapper>
                {item.content.image.length > 0 && (
                  <Swiper
                    loop={false}
                    containerStyle={{
                      height:
                        imageHeights[index * item.content.image.length] > RPH(48)
                          ? RPH(48)
                          : imageHeights[index * item.content.image.length],
                    }}
                  >
                    {item.content.image.map((image, i) => {
                      const imageHeight = imageHeights[index * item.content.image.length + i];
                      return (
                        <S.CommunityMainImageCardWrapper>
                          <Image
                            style={{ width: '100%' }}
                            key={i}
                            source={{
                              uri: image,
                              height: imageHeight > RPH(48) ? RPH(48) : imageHeight,
                            }}
                            resizeMode="contain"
                          />
                        </S.CommunityMainImageCardWrapper>
                      );
                    })}
                  </Swiper>
                )}
                <S.CommunityMainBottom>
                  <S.CommunityMainBottomIconContainer>
                    <ScaleOpacity onPress={() => onLikeClick(index)}>
                      <Icon
                        name="thumb-up-alt"
                        size={24}
                        color={likes[index] ? theme.primary : theme.placeholder}
                      />
                    </ScaleOpacity>
                    <Text size={14} color={theme.placeholder}>
                      좋아요 {likes[index] ? item.content.likes + 1 : item.content.likes}
                    </Text>
                  </S.CommunityMainBottomIconContainer>
                  <ScaleOpacity onPress={() => {}}>
                    <S.CommunityMainBottomIconContainer>
                      <Icon name="comment" size={24} color={theme.placeholder} />
                      <Text size={14} color={theme.placeholder}>
                        댓글 {item.content.comments}
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
