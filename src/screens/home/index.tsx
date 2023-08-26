import React, { useEffect, useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { Logo } from 'src/assets';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notifyClick, setNotifyClick] = useState<boolean>(false);
  const getInfo = async () => {
    const get = await AsyncStorage.getItem('isLogin');
    const isLoggedin = await JSON.parse(get ? get : '');
    console.log(isLoggedin);
    if (isLoggedin) {
      navigation.setOptions({ gestureEnabled: false });
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <S.HomeScreenContainer>
      <S.HomeScreenTopSection>
        <WithLocalSvg width={110} height={40} asset={Logo} />
        <TouchableOpacity activeOpacity={0.5} onPress={() => setNotifyClick(!notifyClick)}>
          <Ionicons
            name={notifyClick ? 'notifications' : 'notifications-outline'}
            size={28}
            color={notifyClick ? '#000' : '#AAA'}
          />
        </TouchableOpacity>
      </S.HomeScreenTopSection>
    </S.HomeScreenContainer>
  );
};
