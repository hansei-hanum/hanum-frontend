import React from 'react';

import { AuthFailedModal, EoullimBox, CommonHeader, Text } from 'src/components';
import { EoullimPoster } from 'src/assets';
import { colors } from 'src/styles';
import { useCheckUserType, useGetUser } from 'src/hooks';

import * as S from './styled';

const EoullimList = [
  {
    title: '행사일정 보기',
    icon: '📆',
    navigateUrl: 'EoullimTimeTable',
  },
  {
    title: '공연 투표하기',
    icon: '📥',
    navigateUrl: 'EoullimVote',
  },
];

export const EoullimMainScreen: React.FC = () => {
  const { userData } = useGetUser();
  const { verifyUser, modalVisible, setModalVisible } = useCheckUserType();

  if (verifyUser) {
    return (
      <S.EoullimContainer source={EoullimPoster}>
        <CommonHeader isWhite />
        <Text size={24} fontFamily="bold" color={colors.white}>
          {userData.name}님 반가워요 👋 {'\n'}즐거운 축제 되세요!
        </Text>
        <S.EoullimBoxContainer>
          {EoullimList.map(({ icon, title, navigateUrl }) => (
            <EoullimBox key={title} icon={icon} title={title} navigateUrl={navigateUrl} />
          ))}
        </S.EoullimBoxContainer>
      </S.EoullimContainer>
    );
  } else {
    return (
      <AuthFailedModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        isStudent={false}
      />
    );
  }
};
