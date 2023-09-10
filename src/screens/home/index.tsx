import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';

import { AlertBox, HanumPay, Timer, Calendar, Header } from 'src/components';
import { colors } from 'src/styles';
import { iosCheckHeight } from 'src/utils';
import { useNavigate } from 'src/hooks';
import { PartyIcon } from 'src/assets';

import { Logo } from '../../../assets/images';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  const onNotifyPress = () => {
    setNotifyClick(!notifyClick);
  };

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
              navigate('WebView');
            }}
          >
            <AntDesign name="customerservice" size={28} color={colors.placeholder} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={onNotifyPress}>
            <Ionicons
              name={notifyClick ? 'notifications' : 'notifications-outline'}
              size={28}
              color={notifyClick ? '#000' : '#AAA'}
            />
          </TouchableOpacity>
        </S.HomeScreenHeaderIconContainer>
      </Header>
    </S.HomeScreenWrapper>
  );
};
