/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { AlertBox, HanumPay, Timer, LunchTable, Calendar, Header } from 'src/components';
import { colors } from 'src/styles';
import { checkHeight } from 'src/utils';

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
          paddingTop: checkHeight ? 70 : 90,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 20,
        }}
      >
        <AlertBox
          icon="🎉"
          mainText="실시간으로 즐기기"
          subText="한세어울림한마당 진행 중!"
          navigateUrl="Main"
        />
        <HanumPay />
        <Timer />
        <LunchTable onPress={onPress} />
        <Calendar />
      </S.HomeScreenContainer>
      <Header>
        <WithLocalSvg width={98} height={40} asset={Logo} color={colors.placeholder} />
        <TouchableOpacity activeOpacity={0.5} onPress={onNotifyPress}>
          <Ionicons
            name={notifyClick ? 'notifications' : 'notifications-outline'}
            size={28}
            color={notifyClick ? '#000' : '#AAA'}
          />
        </TouchableOpacity>
      </Header>
    </S.HomeScreenWrapper>
  );
};
