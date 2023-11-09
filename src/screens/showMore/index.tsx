import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native';
import Toggle from 'react-native-toggle-element';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';

import { Text, Section } from 'src/components';
import { useGetUser, useNavigate, usePressingAnimation } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { themeAtom } from 'src/atoms';

import * as S from './styled';

export const ShowMoreScreen: React.FC = () => {
  const theme = useTheme();
  const [themeValue, setThemeValue] = useRecoilState(themeAtom);

  const navigate = useNavigate();
  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();

  const { userData, userProfile, verifyUser, formatUser } = useGetUser();

  const setTheme = async () => {
    if (themeValue === 'dark') {
      await AsyncStorage.setItem('theme', 'dark');
    } else {
      await AsyncStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    setTheme();
  }, [themeValue]);

  return (
    <S.ShowMoreScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingLeft: 10,
          paddingRight: 10,
          rowGap: 16,
        }}
      >
        <S.ShowMoreHeaderScreen>
          <Text size={20} fontFamily="bold">
            더 보기
          </Text>
          <Toggle
            value={themeValue === 'dark'}
            onPress={() => setThemeValue(themeValue === 'dark' ? 'light' : 'dark')}
            leftComponent={
              <Icon
                name="light-mode"
                size={20}
                color={themeValue === 'dark' ? theme.placeholder : theme.white}
              />
            }
            rightComponent={
              <Icon
                name="dark-mode"
                size={20}
                color={themeValue === 'dark' ? theme.background : theme.placeholder}
              />
            }
            trackBar={{
              width: 72,
              height: 36,
              activeBackgroundColor: theme.secondary,
              inActiveBackgroundColor: theme.secondary,
              borderWidth: 5,
            }}
            thumbButton={{
              width: 36,
              height: 36,
              activeBackgroundColor: theme.white,
              inActiveBackgroundColor: theme.primary,
            }}
          />
        </S.ShowMoreHeaderScreen>
        {userData && (
          <>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={1}
              onPress={() => navigate('UserInfo')}
            >
              <S.ShowMoreUserContainer style={[animatedStyle]}>
                <S.ShowMoreUserInfo>
                  <S.ShowMoreUserImage
                    source={userProfile ? userProfile : UserLogo}
                    style={{
                      resizeMode: 'contain',
                      borderColor: theme.lightGray,
                      borderWidth: 1,
                    }}
                  />
                  <S.ShowMoreUserNameContainer>
                    <Text size={18} fontFamily="bold">
                      {userData?.name}
                    </Text>
                    <Text
                      size={13}
                      fontFamily="medium"
                      color={verifyUser ? theme.default : theme.danger}
                    >
                      {verifyUser ? `${formatUser()}` : '정회원 인증 안 됨'}
                    </Text>
                  </S.ShowMoreUserNameContainer>
                </S.ShowMoreUserInfo>
                <MaterialIcons name="chevron-right" size={30} color={theme.placeholder} />
              </S.ShowMoreUserContainer>
            </TouchableOpacity>
            <Section />
          </>
        )}
      </ScrollView>
    </S.ShowMoreScreenWrapper>
  );
};
