import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Animated, TextInput, TouchableWithoutFeedback } from 'react-native';

import { useTheme } from '@emotion/react';

import { Header, Text } from 'src/components';

import * as S from './styled';

export const CommunityMainScreen: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const cancelIconAnim = useRef(new Animated.Value(0)).current;

  const theme = useTheme();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <S.CommunityMainWrapper>
      <Header isRow>
        <S.CommunityMainSearchBarContainer>
          <TouchableWithoutFeedback>
            <Animated.View style={[{ flexGrow: 0.2 }, fadeAnim]}>
              <Icon
                name="cancel"
                size={24}
                color={theme.placeholder}
                onPress={() => {
                  searchRef.current && searchRef.current.blur();
                  setIsFocused(false);
                }}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <S.CommunityMainSearchBar
            placeholder="대나무숲 게시글 검색하기"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.placeholder}
            ref={searchRef}
            onFocus={() => {
              setIsFocused(true);
              console.log('focused');
            }}
          />
          <Icon name="search" size={24} color={theme.placeholder} />
        </S.CommunityMainSearchBarContainer>
      </Header>
      <S.TextWrapper>
        <Text size={15}>CommunityMainScreen</Text>
      </S.TextWrapper>
      <S.TextWrapper2 style={{ opacity: fadeAnim }}>
        <Text size={15}>CommunityMainScreen</Text>
      </S.TextWrapper2>
    </S.CommunityMainWrapper>
  );
};
