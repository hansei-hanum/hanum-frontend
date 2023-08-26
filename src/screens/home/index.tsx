import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

import { Logo, PartyIcon, PayIcon } from 'src/assets';
import { AlertBox, Content, Text } from 'src/components';

import * as S from './styled';

export const HomeScreen: React.FC = () => {
  const [notifyClick, setNotifyClick] = useState<boolean>(false);

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
      <AlertBox
        icon={PartyIcon}
        mainText="실시간으로 즐기기"
        subText="한세어울림한마당 진행 중!"
        navigateUrl="Main"
      />
      <Content icon={PayIcon} name="한움페이" navigateUrl="Main">
        <Text size="13" fontFamily="bold" color="#AAA">
          한움페이
        </Text>
      </Content>
    </S.HomeScreenContainer>
  );
};
