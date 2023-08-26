import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

import { Logo, PartyIcon, PayIcon } from 'src/assets';
import { AlertBox, Content, PayButton, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const [notifyClick, setNotifyClick] = useState<boolean>(false);

  return (
    <S.HomeScreenWrapper>
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
        <AlertBox
          icon={PartyIcon}
          mainText="실시간으로 즐기기"
          subText="한세어울림한마당 진행 중!"
          navigateUrl="Main"
        />
        <Content icon={PayIcon} name="한움페이" navigateUrl="Main">
          <S.PayContainer>
            <Text size="30" fontFamily="bold" color={colors.black}>
              19,000원
            </Text>
            <S.PayButtonContainer>
              <PayButton text="결제" onPress={() => console.log('결제')} />
              <PayButton text="송금" onPress={() => console.log('송금')} />
            </S.PayButtonContainer>
          </S.PayContainer>
        </Content>
      </S.HomeScreenContainer>
    </S.HomeScreenWrapper>
  );
};
