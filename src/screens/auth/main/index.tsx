import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';

import { useSetRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';

import { Button, DummyContainer, Modal, Text } from 'src/components';
import { colors } from 'src/styles';
import { useNavigate } from 'src/hooks';
import { authState } from 'src/atoms';

import { Logo } from '../../../../assets/images';

import * as S from './styled';

export const AuthMainScreen: React.FC = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const setAuth = useSetRecoilState(authState);

  const onButtonPress = (navigateUrl: string) => {
    navigate(`${navigateUrl}`);
    setModalVisible(false);
  };

  const fontSize = 16;

  const isFocused = useIsFocused();

  useEffect(() => {
    setAuth({
      name: '',
      phone: '',
      errorMessage: '',
    });
  }, [isFocused]);

  return (
    <>
      <S.AuthMainScreenWrapper>
        <S.AuthMainScreenContainer>
          <S.AuthMainScreenLogoContainer>
            <WithLocalSvg width={180} height={50} asset={Logo} />
            <Text size={fontSize} fontFamily="bold">
              한세인 도우미, 한움
            </Text>
          </S.AuthMainScreenLogoContainer>
          <S.AuthMainScreenMainSection>
            <Button onPress={() => navigate('Phone')}>로그인</Button>
            <Button isSecondary onPress={() => setModalVisible(true)}>
              회원가입
            </Button>
            <S.AuthMainScreenTextContainer>
              <Text size={fontSize}>교직원이신가요? </Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('Staff')}>
                <Text size={fontSize} color={colors.primary}>
                  교직원 회원가입 요청
                </Text>
              </TouchableOpacity>
            </S.AuthMainScreenTextContainer>
          </S.AuthMainScreenMainSection>
        </S.AuthMainScreenContainer>
      </S.AuthMainScreenWrapper>
      {modalVisible && (
        <>
          <DummyContainer />
          <Modal
            title="정회원 가입 안내"
            text={
              `한움의 일부 서비스는 인증된 재학생, 졸업생, 교직원만 사용할 수 있어요.\n` +
              `인증을 위해서는 배포된 개인용 인증 코드가 필요해요. 인증 코드를 가지고 계신가요?`
            }
            modalVisible={modalVisible}
            button={
              <S.AuthMainScreenButtonContainer>
                <Button
                  onPress={() => {
                    onButtonPress('Name');
                  }}
                  width="48"
                  isSecondary
                  isModalBtn
                >
                  아니오
                </Button>
                <Button
                  onPress={() => {
                    onButtonPress('SelfCheck');
                  }}
                  width="48"
                  isModalBtn
                >
                  예!
                </Button>
              </S.AuthMainScreenButtonContainer>
            }
          />
        </>
      )}
    </>
  );
};
