import React, { useEffect, useState } from 'react';
import { Switch } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '@emotion/react';

import { MealIcon } from 'src/assets';

import { Header, Text } from '../../common';

import * as S from './styled';

export interface MealTableLayoutProps {
  children: React.ReactNode;
}

export const MealTableLayout: React.FC<MealTableLayoutProps> = ({ children }) => {
  const theme = useTheme();

  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  const toggleNotifyClick = () => {
    setNotifyClick(!notifyClick);
    if (!notifyClick) {
      AsyncStorage.setItem('mealNotificationEnabled', 'true');
      messaging().subscribeToTopic('meal');
    } else {
      AsyncStorage.setItem('mealNotificationEnabled', 'false');
      messaging().unsubscribeFromTopic('meal');
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('mealNotificationEnabled').then((value) => {
      if (value === 'true') {
        setNotifyClick(true);
      } else {
        setNotifyClick(false);
      }
    });
  }, []);

  return (
    <S.MealTableLayoutContainer>
      <Header hasIconContainer={{ icon: MealIcon, text: '급식표' }}>
        <S.MealTableLayoutAlertContainer>
          <Text size={17} fontFamily="medium">
            매일 아침 알림 받기
          </Text>
          <Switch
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            trackColor={{ false: theme.lightGray, true: theme.primary }}
            thumbColor={notifyClick ? theme.white : theme.white}
            ios_backgroundColor={theme.lightGray}
            onValueChange={toggleNotifyClick}
            value={notifyClick}
          />
        </S.MealTableLayoutAlertContainer>
      </Header>
      {children}
    </S.MealTableLayoutContainer>
  );
};
