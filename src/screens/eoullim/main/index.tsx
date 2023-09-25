import React from 'react';

import { AuthFailedModal, EoullimBox, EoullimHeader, Text } from 'src/components';
import { EoullimPoster } from 'src/assets';
import { colors } from 'src/styles';
import { useCheckUserType } from 'src/hooks';

import * as S from './styled';

const EoullimList = [
  {
    title: '행사일정 보기',
    icon: '📆',
    navigateUrl: 'EoullimTimeTable',
  },
  {
    title: '공연 투표하기',
    icon: '🗳️',
    navigateUrl: 'EoullimVote',
  },
];

export const EoullimMainScreen: React.FC = () => {
  const { verifyUser, modalVisible, setModalVisible } = useCheckUserType();

  return (
    <S.EoullimWrapper>
      {verifyUser ? (
        <S.EoullimContainer source={EoullimPoster}>
          <EoullimHeader isMain />
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
