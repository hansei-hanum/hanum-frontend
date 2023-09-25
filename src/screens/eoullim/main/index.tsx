import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AuthFailedModal, EoullimBox, Text } from 'src/components';
import { EoullimPoster } from 'src/assets';
import { colors } from 'src/styles';
import { useCheckUserType } from 'src/hooks';

import * as S from './styled';

const EoullimList = [
  {
    title: '행사일정 보기',
    icon: '📆',
    navigateUrl: 'EoullimSchedule',
  },
  {
    title: '공연 투표하기',
    icon: '🗳️',
    navigateUrl: 'EoullimVote',
  },
];

export const EoullimMainScreen: React.FC = () => {
  const { verifyUser, modalVisible, setModalVisible } = useCheckUserType();
  const navigation = useNavigation();

  return (
    <S.EoullimWrapper>
      {!verifyUser ? (
        <S.EoullimContainer source={EoullimPoster}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <Fontisto name="angle-left" size={24} color="white" />
          </TouchableOpacity>
          <Text size={24} fontFamily="bold" color={colors.white}>
            박찬영님 반가워요 👋 {'\n'}즐거운 축제 되세요!
          </Text>
          <S.EoullimBoxContainer>
            {EoullimList.map(({ icon, title, navigateUrl }) => (
              <EoullimBox key={title} icon={icon} title={title} navigateUrl={navigateUrl} />
            ))}
          </S.EoullimBoxContainer>
        </S.EoullimContainer>
      ) : (
        <AuthFailedModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          isStudent={false}
        />
      )}
    </S.EoullimWrapper>
  );
};
