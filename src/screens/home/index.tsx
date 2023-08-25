import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

import { Logo } from 'src/assets';

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
            color="black"
          />
        </TouchableOpacity>
      </S.HomeScreenTopSection>
    </S.HomeScreenContainer>
  );
};
