import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Easing,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import { Header, Text } from 'src/components';

import * as S from './styled';

export const CommunityMainScreen: React.FC = () => {
  const theme = useTheme();

  const searchRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);

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

  const animatedStyle = {
    transform: [{ translateX: value.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }],
    opacity: value.interpolate({ inputRange: [0, 1], outputRange: [isFocused ? 1 : 0, 0] }),
  };

  const animatedStyle2 = {
    flex: value.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1] }),
  };

  const animatedStyle3 = {
    opacity: value.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
  };

  return (
    <S.CommunityMainWrapper>
      <Header isRow>
        <S.CommunityMainSearchBarContainer style={animatedStyle2}>
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
          <Animated.View
            style={[
              {
                alignItems: 'center',
                justifyContent: 'flex-end',
              },
              animatedStyle,
            ]}
          >
            <Icon name="cancel" size={24} color={theme.placeholder} onPress={hidden} />
          </Animated.View>
        )}
      </Header>
      {!isFocused ? (
        <S.TextWrapper>
          <Text size={15}>CommunityMainScreen</Text>
        </S.TextWrapper>
      ) : (
        <S.TextWrapper2 style={animatedStyle3}>
          <Text size={15}>This Is Search 잉기</Text>
        </S.TextWrapper2>
      )}
    </S.CommunityMainWrapper>
  );
};
