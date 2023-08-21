import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { Logo } from '@hanum/assets';
import { Button, Text } from '@hanum/components';
import { colors } from '@hanum/styles';

import * as S from './styled';
import { WithLocalSvg } from 'react-native-svg';

export const MainScreen: React.FC = () => {
  const navigate = useNavigation().navigate as (s: string) => void;

  return (
    <S.MainScreenContainer>
      <S.MainScreenLogoContainer>
        <WithLocalSvg width={180} height={50} asset={Logo} />
        <Text size='16' fontFamily="bold">
          한세인 도우미, 한움
        </Text>
      </S.MainScreenLogoContainer>
      <S.MainScreenButtonContainer>
        <Button onPress={() => navigate('Phone')}>로그인</Button>
        <Button isSecondary onPress={() => navigate('Step1')}>
          회원가입
        </Button>
        <S.MainScreenTextContainer>
          <Text size='16' fontFamily="bold">
            교직원이신가요?{' '}
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('Staff')}>
            <Text size='16' fontFamily="bold" color={colors.primary}>
              교직원 회원가입 요청
            </Text>
          </TouchableOpacity>
        </S.MainScreenTextContainer>
      </S.MainScreenButtonContainer>
    </S.MainScreenContainer>
  );
};
