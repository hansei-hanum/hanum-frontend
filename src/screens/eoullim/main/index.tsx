import React, { useEffect } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '@emotion/react';

import { AuthFailedModal, EoullimBox, GoBackHeader, Text, Spinner } from 'src/components';
import { EoullimPoster } from 'src/assets';
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
  const theme = useTheme();

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
      <S.EoullimWrapper>
        <S.EoullimContainer source={EoullimPoster}>
          <S.EoulimContentContainer>
            <GoBackHeader isWhite />
            <Text size={24} fontFamily="bold" color={theme.white}>
              {userData?.name}님 반가워요 👋 {'\n'}즐거운 축제 되세요!
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
              <Spinner />
            )}
          </S.EoulimContentContainer>
        </S.EoullimContainer>
      </S.EoullimWrapper>
    );
  } else {
    return <AuthFailedModal modalVisible={modalVisible} setModalVisible={setModalVisible} />;
  }
};
