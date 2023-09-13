import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Alert, Linking, TouchableOpacity } from 'react-native';

import { AlertBox, HanumPay, Timer, Calendar, Header } from 'src/components';
import { colors } from 'src/styles';
import { iosCheckHeight } from 'src/utils';
import { useNavigate } from 'src/hooks';
import { PartyIcon } from 'src/assets';

import { Logo } from '../../../assets/images';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.HomeScreenWrapper>
      <S.HomeScreenContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: iosCheckHeight ? 70 : 90,
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
        <Calendar />
      </S.HomeScreenContainer>
      <Header>
        <WithLocalSvg width={98} height={40} asset={Logo} color={colors.placeholder} />
        <S.HomeScreenHeaderIconContainer>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Linking.openURL('kakaoplus://plusfriend/talk/chat/405758775').catch((err) =>
                Alert.alert(
                  '문의하기',
                  '카카오톡이 설치되어 있지 않아요. 문의하기를 이용하려면 카카오톡을 설치해주세요.',
                  [{ text: '확인' }],
                ),
              );
            }}
          >
            <AntDesign name="customerservice" size={28} color={colors.placeholder} />
          </TouchableOpacity>
        </S.HomeScreenHeaderIconContainer>
      </Header>
    </S.HomeScreenWrapper>
  );
};
