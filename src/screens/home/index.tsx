/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons"

import { AlertBox, HanumPay, Timer, LunchTable, Calendar } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';
import { PartyIcon } from '../../../assets/icons';
import { Logo } from '../../../assets/images';

export const HomeScreen: React.FC = ({ navigation }: any) => {
  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  const onPress = () => {
    navigation.navigate('급식표');
  };

  return (
    <S.HomeScreenWrapper>
      <S.HomeScreenContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Platform.OS === 'ios' ? 130 : 100,
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
      <S.HomeScreenHeader>
        <WithLocalSvg width={98} height={40} asset={Logo} color={colors.placeholder} />
        <TouchableOpacity activeOpacity={0.5} onPress={() => setNotifyClick(!notifyClick)}>
          <Ionicons
            name={notifyClick ? 'notifications' : 'notifications-outline'}
            size={28}
            color={notifyClick ? '#000' : '#AAA'}
          />
        </TouchableOpacity>
      </S.HomeScreenHeader>
    </S.HomeScreenWrapper>
  );
};
