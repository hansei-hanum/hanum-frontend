import Toggle from 'react-native-toggle-element';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';

import { Header, Text } from 'src/components/common';
import { themeAtom } from 'src/atoms';

export const ShowMoreHeader: React.FC = () => {
  const theme = useTheme();

  const [themeValue, setThemeValue] = useRecoilState(themeAtom);

  const setTheme = async () => {
    setThemeValue(themeValue === 'dark' ? 'light' : 'dark');
    await AsyncStorage.setItem('theme', themeValue === 'dark' ? 'light' : 'dark');
  };

  return (
    <Header isRow>
      <Text size={20} fontFamily="bold">
        더 보기
      </Text>
      <Toggle
        value={themeValue === 'dark'}
        onPress={setTheme}
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
    </Header>
  );
};
