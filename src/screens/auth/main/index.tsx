import React, { useEffect, useState } from 'react';
import {
  Linking,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Pressable,
  View,
} from 'react-native';

import { useRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '@emotion/react';

import { Button, Modal, Text } from 'src/components';
import { useNavigate } from 'src/hooks';
import { authAtom } from 'src/atoms';
import { isIos } from 'src/utils';

import { Logo, WhiteLogo } from '../../../../assets/images';

import * as S from './styled';

export const AuthMainScreen: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState({
    isAgreeModal: false,
    isCurrentStudentModal: false,
  });
  const isAgreeModal = modalVisible.isAgreeModal;

  const [auth, setAuth] = useRecoilState(authAtom);

  const onButtonPress = (isCurrentStudent?: boolean) => {
    isCurrentStudent && setAuth({ ...auth, isCurrentStudent: true });
    navigate('Name');
    setModalVisible({ isAgreeModal: false, isCurrentStudentModal: false });
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    setAuth({
      name: '',
      phone: '',
      isCurrentStudent: false,
      errorMessage: '',
    });
  }, [isFocused]);

  return (
    <>
      <S.AuthMainScreenWrapper>
        <S.AuthMainScreenContainer>
          <S.AuthMainScreenLogoContainer>
            <Image source={WhiteLogo} style={{ width: 198, height: 55, resizeMode: 'contain' }} />
            <Text size={17} fontFamily="bold">
              한세인의 도우미, 한움
            </Text>
          </S.AuthMainScreenLogoContainer>
          <S.AuthMainScreenMainSection>
            <Button onPress={() => navigate('Phone')}>로그인</Button>
            <Button
              isWhite
              onPress={() => setModalVisible({ isAgreeModal: true, isCurrentStudentModal: false })}
            >
              회원가입
            </Button>
          </S.AuthMainScreenMainSection>
        </S.AuthMainScreenContainer>
      </S.AuthMainScreenWrapper>
      {modalVisible.isCurrentStudentModal || isAgreeModal ? (
        <Modal
          title={isAgreeModal ? '약관 동의' : '정회원 가입 안내'}
          linkText={
            isAgreeModal ? (
              <S.AuthModalText>
                <S.AuthModalText
                  color={theme.primary}
                  onPress={() => Linking.openURL('https://privacy.hanum.us/')}
                  suppressHighlighting={true}
                >
                  한움의 개인정보처리방침
                </S.AuthModalText>
                을 자세히 읽어 보십시오. 가입을 계속 진행하면 한움의 개인정보처리방침에 동의하는
                것으로 간주됩니다.
              </S.AuthModalText>
            ) : (
              <Text size={15}>
                한움의 일부 서비스는 인증된 재학생, 졸업생, 교직원만 사용할 수 있어요.{`\n`}
                인증을 위해서는 배포된 개인용 인증 코드가 필요해요. 인증 코드를 가지고 계신가요?
              </Text>
            )
          }
          modalVisible={modalVisible.isCurrentStudentModal || isAgreeModal}
          button={
            <Button.Container>
              <Button
                onPress={
                  isAgreeModal
                    ? () => setModalVisible({ isAgreeModal: false, isCurrentStudentModal: false })
                    : onButtonPress
                }
                isWhite
                isModalBtn
              >
                {isAgreeModal ? '취소' : '아니오'}
              </Button>
              <Button
                onPress={() =>
                  isAgreeModal
                    ? setModalVisible({ isAgreeModal: false, isCurrentStudentModal: true })
                    : onButtonPress(true)
                }
                isModalBtn
              >
                {isAgreeModal ? '동의합니다' : '예!'}
              </Button>
            </Button.Container>
          }
        />
      ) : null}
    </>
  );
};
