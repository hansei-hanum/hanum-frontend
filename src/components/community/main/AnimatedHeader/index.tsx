import React, { useRef } from 'react';
import { Animated, LayoutAnimation, TextInput, TextInputProps } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';

import * as S from './styled';

export interface CommunityMainAnimatedHeaderCustomProps {
  HEADER_HEIGHT: number;
  scrollY: Animated.Value;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchScreen: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchScreen: boolean;
}

export type CommunityMainAnimatedHeaderProps = CommunityMainAnimatedHeaderCustomProps &
  TextInputProps;

export const CommunityMainAnimatedHeader: React.FC<CommunityMainAnimatedHeaderProps> = ({
  HEADER_HEIGHT,
  scrollY,
  hidden,
  setIsSearchScreen,
  setHidden,
  isSearchScreen,
  ...props
}) => {
  const theme = useTheme();
  const searchRef = useRef<TextInput>(null);

  const insets = useSafeAreaInsets();

  const clampedScroll = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT + 44);

  const headerHeight = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top],
    extrapolate: 'clamp',
  });

  const shadowOpacity = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT - 20, HEADER_HEIGHT],
    outputRange: [1, 0.01, 0],
    extrapolate: 'clamp',
  });

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
    setHidden(false);
    setIsSearchScreen(true);
    LayoutAnimation.configureNext(config);
  };

  const closeSearchScreen = () => {
    setIsSearchScreen(false);
    searchRef.current?.blur();
    LayoutAnimation.configureNext(config);
    setHidden(false);
  };

  const searchBarAnimation = {
    flex: searchAnimationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1] }),
  };

  const opacityAnimation = {
    opacity: searchAnimationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
    scale: searchAnimationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] }),
  };

  const getHeaderHeight = () => {
    if (isSearchScreen) {
      return HEADER_HEIGHT + insets.top;
    }
    if (hidden) {
      return headerHeight;
    }
    return HEADER_HEIGHT + insets.top;
  };
  return (
    <S.CommunityMainAnimatedHeader
      style={{
        height: getHeaderHeight(),
      }}
    >
      <S.CommunityMainSearchBarWrapper
        style={{
          opacity: hidden && !isSearchScreen ? shadowOpacity : 1,
        }}
      >
        <S.CommunityMainSearchBarContainer style={[searchBarAnimation]}>
          <TouchableWithoutFeedback onPress={showSearchScreen}>
            <Icon name="search" size={24} color={theme.placeholder} />
          </TouchableWithoutFeedback>
          <S.CommunityMainSearchBar
            placeholder="대나무숲 게시글 검색하기"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.placeholder}
            ref={searchRef}
            onFocus={showSearchScreen}
            {...props}
          />
        </S.CommunityMainSearchBarContainer>
        {isSearchScreen && (
          <S.CommunityMainIconWrapper style={opacityAnimation}>
            <TouchableOpacity activeOpacity={0.8} onPress={closeSearchScreen}>
              <Icon name="close" size={30} color={theme.placeholder} />
            </TouchableOpacity>
          </S.CommunityMainIconWrapper>
        )}
      </S.CommunityMainSearchBarWrapper>
    </S.CommunityMainAnimatedHeader>
  );
};
