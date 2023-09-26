import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { AuthFailedModal, EoullimBox, CommonHeader, Text } from 'src/components';
import { EoullimPoster } from 'src/assets';
import { colors } from 'src/styles';
import { useCheckUserType, useGetUser } from 'src/hooks';
import { useGetLuckyDraw } from 'src/hooks/query/eoullim';

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
  const luckyDraw = useGetLuckyDraw();
  const { userData } = useGetUser();
  const { verifyUser, modalVisible, setModalVisible } = useCheckUserType();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      luckyDraw.refetch();
    }
  }, [isFocused]);

  if (verifyUser) {
    return (
      <S.EoullimContainer source={EoullimPoster}>
        <CommonHeader isWhite />
        <Text size={24} fontFamily="bold" color={colors.white}>
          {userData.name}님 반가워요 👋 {'\n'}즐거운 축제 되세요!
        </Text>
        {!luckyDraw.isLoading ? (
          <>
            <S.EoullimBoxContainer>
              {EoullimList.map(({ icon, title, navigateUrl }) => (
                <EoullimBox key={title} icon={icon} title={title} navigateUrl={navigateUrl} />
              ))}
            </S.EoullimBoxContainer>
            <EoullimBox
              key={'추첨하기'}
              icon={'🎁'}
              title={'나의 추첨번호'}
              navigateUrl={luckyDraw.data ? 'EoullimStatus' : 'EoullimRaffle'}
              isBig={true}
            />
          </>
        ) : (
          <ActivityIndicator size={30} color={colors.white} />
        )}
      </S.EoullimContainer>
    );
  } else {
    return <AuthFailedModal modalVisible={modalVisible} setModalVisible={setModalVisible} />;
  }
};
