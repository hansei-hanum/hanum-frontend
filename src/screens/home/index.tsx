import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

import { Logo, LunchTableIcon, PartyIcon } from 'src/assets';
import { AlertBox, Content, HanumPay, Schedule, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  return (
    <S.HomeScreenWrapper>
      <S.HomeScreenHeader>
        <WithLocalSvg width={110} height={40} asset={Logo} />
        <TouchableOpacity activeOpacity={0.5} onPress={() => setNotifyClick(!notifyClick)}>
          <Ionicons
            name={notifyClick ? 'notifications' : 'notifications-outline'}
            size={28}
            color={notifyClick ? '#000' : '#AAA'}
          />
        </TouchableOpacity>
      </S.HomeScreenHeader>
      <S.HomeScreenContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
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
        <Schedule />
        <Content icon={LunchTableIcon} name="급식표" navigateUrl="LunchTable">
          <S.HomeScreenLunchTableTextContainer>
            <Text size="15" fontFamily="bold" color={colors.placeholder}>
              오늘의 급식
            </Text>
            <S.HomeScreenLunchTableText>
              백미밥,카레소스(추가국),등심돈까스, 망고사과샐러드,포기김치,과일음료
            </S.HomeScreenLunchTableText>
          </S.HomeScreenLunchTableTextContainer>
        </Content>
      </S.HomeScreenContainer>
    </S.HomeScreenWrapper>
  );
};
