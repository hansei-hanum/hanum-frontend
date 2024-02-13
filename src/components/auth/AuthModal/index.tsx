import React from 'react';
import { Linking } from 'react-native';

import { useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { Button, Modal, Text } from 'src/components/common';
import { authAtom } from 'src/atoms';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export interface AuthModalProps {
  isAgreeModal: boolean;
  isCurrentStudentModal: boolean;
  setModalVisible: (modal: { isAgreeModal: boolean; isCurrentStudentModal: boolean }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isAgreeModal,
  isCurrentStudentModal,
  setModalVisible,
}) => {
  const theme = useTheme();

  const [auth, setAuth] = useRecoilState(authAtom);

  const navigate = useNavigate();

  const onAgree = (isCurrentStudent?: boolean) => {
    isCurrentStudent && setAuth({ ...auth, isCurrentStudent: true });
    navigate('Name');
    setModalVisible({ isAgreeModal: false, isCurrentStudentModal: false });
  };

  if (isCurrentStudentModal) {
    return (
      <Modal
        title="정회원 가입 안내"
        linkText={
          <Text size={15}>
            한움의 일부 서비스는 인증된 재학생, 졸업생, 교직원만 사용할 수 있어요.{`\n`}
            인증을 위해서는 배포된 개인용 인증 코드가 필요해요. 인증 코드를 가지고 계신가요?
          </Text>
        }
        modalVisible={isCurrentStudentModal}
        button={
          <Button.Container>
            <Button onPress={onAgree} isWhite isModalBtn>
              아니오
            </Button>
            <Button onPress={() => onAgree(true)} isModalBtn>
              예!
            </Button>
          </Button.Container>
        }
      />
    );
  } else {
    return (
      <Modal
        title={'약관 동의'}
        linkText={
          <S.AuthModalText>
            <S.AuthModalText
              color={theme.primary}
              onPress={() => Linking.openURL('https://privacy.hanum.us/')}
              suppressHighlighting={true}
            >
              한움의 개인정보처리방침
            </S.AuthModalText>
            을 자세히 읽어 보십시오. 가입을 계속 진행하면 한움의 개인정보처리방침에 동의하는 것으로
            간주됩니다.
          </S.AuthModalText>
        }
        modalVisible={isAgreeModal}
        button={
          <Button.Container>
            <Button
              onPress={() => setModalVisible({ isAgreeModal: false, isCurrentStudentModal: false })}
              isWhite
              isModalBtn
            >
              {'취소'}
            </Button>
            <Button
              onPress={() => setModalVisible({ isAgreeModal: false, isCurrentStudentModal: true })}
              isModalBtn
            >
              {'동의합니다'}
            </Button>
          </Button.Container>
        }
      />
    );
  }
};
