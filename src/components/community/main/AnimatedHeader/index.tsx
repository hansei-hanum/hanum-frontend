import React from 'react';
import { Animated, TextInputProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MI from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import { LimitedArticleScopeOfDisclosure } from 'src/api';
import { Text } from 'src/components/common';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export interface CommunityMainAnimatedHeaderCustomProps {
  HEADER_HEIGHT: number;
  scrollY: Animated.Value;
  hidden: boolean;
  isSearchScreen: boolean;
  postScope: LimitedArticleScopeOfDisclosure | null;
  onScopePress: () => void;
}

export type CommunityMainAnimatedHeaderProps = CommunityMainAnimatedHeaderCustomProps &
  TextInputProps;

export const CommunityMainAnimatedHeader: React.FC<CommunityMainAnimatedHeaderProps> = ({
  HEADER_HEIGHT,
  scrollY,
  hidden,
  isSearchScreen,
  postScope,
  onScopePress,
}) => {
  const theme = useTheme();

  const insets = useSafeAreaInsets();
  const navigate = useNavigate();

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

  const showSearchScreen = () => {
    navigate('CommunitySearch', { scope: postScope });
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

  const onUserIconPress = () => {
    navigate('UserPost');
  };

  const scopeToText = (scope: LimitedArticleScopeOfDisclosure | null) => {
    switch (scope) {
      case LimitedArticleScopeOfDisclosure.Alumni:
        return '졸업생';
      case LimitedArticleScopeOfDisclosure.Faculty:
        return '교직원';
      case LimitedArticleScopeOfDisclosure.Peer:
        return '동급생';
      case LimitedArticleScopeOfDisclosure.Student:
        return '재학생';
      default:
        return '전체 보기';
    }
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
        <TouchableOpacity activeOpacity={0.8} onPress={onScopePress}>
          <S.CommunityMainScopeContainer>
            <Text size={18}>{scopeToText(postScope)}</Text>
            <Icon name="chevron-down" size={18} color={theme.default} />
          </S.CommunityMainScopeContainer>
        </TouchableOpacity>
        <S.CommunityMainLeftSection>
          <TouchableOpacity activeOpacity={0.8} onPress={onUserIconPress}>
            <MI name="person-outline" size={30} color={theme.default} />
          </TouchableOpacity>
          <TouchableOpacity onPress={showSearchScreen} activeOpacity={0.8}>
            <Icon name="search" size={24} color={theme.default} />
          </TouchableOpacity>
        </S.CommunityMainLeftSection>
      </S.CommunityMainSearchBarWrapper>
    </S.CommunityMainAnimatedHeader>
  );
};
