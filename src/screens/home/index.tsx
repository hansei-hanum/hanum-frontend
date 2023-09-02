/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { AlertBox, HanumPay, Timer, LunchTable, Calendar } from 'src/components';
import { colors } from 'src/styles';

import { PartyIcon } from '../../../assets/icons';
import { Logo } from '../../../assets/images';

import * as S from './styled';

export const HomeScreen: React.FC = ({ navigation }: any) => {
  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  const onPress = () => {
    navigation.navigate('급식표');
  };

  const onNotifyPress = () => {
    setNotifyClick(!notifyClick);
  };

  return (
    <S.HomeScreenWrapper>
      <S.HomeScreenContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Platform.OS === 'ios' ? 80 : 100,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 20,
        }}
      >
        <AlertBox
          icon={PartyIcon}
          mainText="실시간으로 즐기기"
          subText="한세어울림한마당 진행 중!"
          navigateUrl="Main"
        />
        <HanumPay />
        <Timer />
        <LunchTable onPress={onPress} />
        <Calendar />
      </S.HomeScreenContainer>
      {Platform.OS === 'ios' ? (
        <S.HomeScreenIosHeader blurType="light" reducedTransparencyFallbackColor="white">
          <WithLocalSvg width={98} height={40} asset={Logo} color={colors.placeholder} />
          <TouchableOpacity activeOpacity={0.5} onPress={onNotifyPress}>
            <Ionicons
              name={notifyClick ? 'notifications' : 'notifications-outline'}
              size={28}
              color={notifyClick ? '#000' : '#AAA'}
            />
          </TouchableOpacity>
        </S.HomeScreenIosHeader>
      ) : (
        <S.HomeScreenAndroidHeaderBlur blurType="light" reducedTransparencyFallbackColor="white">
          <S.HomeScreenAndroidHeader>
            <WithLocalSvg width={93} height={40} asset={Logo} />
            <TouchableOpacity activeOpacity={0.5} onPress={onNotifyPress}>
              <Ionicons
                name={notifyClick ? 'notifications' : 'notifications-outline'}
                size={28}
                color={notifyClick ? '#000' : '#AAA'}
              />
            </TouchableOpacity>
          </S.HomeScreenAndroidHeader>
        </S.HomeScreenAndroidHeaderBlur>
      )}
    </S.HomeScreenWrapper>
  );
};
