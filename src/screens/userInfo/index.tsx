import React, { useState } from 'react';

import { useTheme } from '@emotion/react';

import { Button, Header, InfoBox, Modal, Text } from 'src/components';
import { useGetUser, useInitNavigate } from 'src/hooks';
import { UserLogo } from 'src/assets/';
import { deleteUser, disconnectNotification } from 'src/api';
import { USER_INFO_LIST } from 'src/constants';

import * as S from './styled';

const LEAVE_USER_MODAL_CONTENT = `회원 탈퇴를 진행하면 즉시 모든 한움 서비스의 제공이 중단되고, 모든 개인정보는 즉시 파기됩니다.
  이에 따라 그동안 이용하셨던 한움 서비스는 다음과 같이 처리됩니다.

  - 사용한 재학생 인증 코드는 복구되지 않으며, 추후 동일 코드로 재가입하실 수 없습니다.

  회원탈퇴를 진행하면 위와 같은 사항에 동의하신 것으로 간주되며, “회원탈퇴" 버튼을 누르신 순간 이 결정은 돌이킬 수 없게 됩니다.

  정말로 계속하시겠습니까?`;

export const UserInfoScreen: React.FC = () => {
  const theme = useTheme();

  const { initNavigate } = useInitNavigate();
  const [isSecessionClick, setIsSecessionClick] = useState<boolean>(false);

  const { userData, userProfile, verifyUser, formatUser, userType } = useGetUser();

  const formattedDate = (date: string | null) => {
    return date && date.split('T')[0];
  };

  const onLogout = () => {
    disconnectNotification();
    initNavigate('AuthMain');
  };

  const onSubmit = () => {
    setIsSecessionClick(false);
    deleteUser();
    initNavigate('AuthMain');
  };

  return (
    <>
      <S.UserInfoWrapper>
        <Header hasGoBackIcon />
        {userData && (
          <S.UserInfoContainer>
            <S.UserInfoProfileContainer>
              <S.UserInfoProfile>
                <S.UserInfoProfileImage
                  source={userProfile ? { uri: userProfile } : UserLogo}
                  style={{
                    resizeMode: 'contain',
                    borderColor: theme.lightGray,
                    borderWidth: 1,
                  }}
                />
                <Text size={20} fontFamily="bold">
                  {userData.name}
                </Text>
                <Text
                  size={15}
                  fontFamily="medium"
                  color={verifyUser ? theme.default : theme.danger}
                >
                  {verifyUser ? `${formatUser()}` : '정회원 인증 안 됨'}
                </Text>
              </S.UserInfoProfile>
              <S.InfoBoxContainer>
                {USER_INFO_LIST({
                  phone: userData.phone,
                  endDate: verifyUser ? formattedDate(verifyUser.valid_until) : '없음',
                  verifyType: userType(),
                }).map((props) => (
                  <InfoBox {...props} />
                ))}
              </S.InfoBoxContainer>
            </S.UserInfoProfileContainer>
            <S.UserInfoButtonContainer>
              <Button isWhite onPress={onLogout}>
                로그아웃
              </Button>
              <Button backgroundColor={theme.danger} onPress={() => setIsSecessionClick(true)}>
                회원 탈퇴하기
              </Button>
            </S.UserInfoButtonContainer>
          </S.UserInfoContainer>
        )}
      </S.UserInfoWrapper>
      {isSecessionClick && (
        <Modal
          title="탈퇴 절차 안내"
          text={LEAVE_USER_MODAL_CONTENT}
          modalVisible={isSecessionClick}
          button={
            <Button.Container>
              <Button onPress={() => setIsSecessionClick(false)} isWhite isModalBtn>
                취소
              </Button>
              <Button onPress={onSubmit} backgroundColor={theme.danger} isModalBtn>
                확인
              </Button>
            </Button.Container>
          }
        />
      )}
    </>
  );
};
