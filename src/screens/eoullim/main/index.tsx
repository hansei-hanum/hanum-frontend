import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { EoullimBox, Text } from 'src/components';
import { EoullimPoster } from 'src/assets';
import { colors } from 'src/styles';

import * as S from './styled';

const EollimList = [
  {
    title: '행사일정 보기',
    icon: '📆',
    navigateUrl: 'EollimSchedule',
  },
  {
    title: '공연 투표하기',
    icon: '🗳️',
    navigateUrl: 'EollimVote',
  },
];

export const EoullimMainScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <S.EoullimWrapper>
      <S.EoullimContainer source={EoullimPoster}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Fontisto name="angle-left" size={24} color="white" />
        </TouchableOpacity>
        <Text size={24} fontFamily="bold" color={colors.white}>
          박찬영님 반가워요 👋 {'\n'}즐거운 축제 되세요!
        </Text>
        <S.EoullimBoxContainer>
          {EollimList.map(({ icon, title, navigateUrl }) => (
            <EoullimBox key={title} icon={icon} title={title} navigateUrl={navigateUrl} />
          ))}
        </S.EoullimBoxContainer>
      </S.EoullimContainer>
    </S.EoullimWrapper>
  );
};
