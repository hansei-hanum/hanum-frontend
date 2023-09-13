import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';

import { useRecoilState, useRecoilValue } from 'recoil';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, DummyContainer, Modal, Text } from 'src/components';
import { colors } from 'src/styles';
import { useNavigate } from 'src/hooks';
import { authState, userProfileState } from 'src/atoms';

import { Logo } from '../../../../assets/images';

import * as S from './styled';

export const AuthMainScreen: React.FC = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [auth, setAuth] = useRecoilState(authState);
  const userData = useRecoilValue(userProfileState);

  const onButtonPress = (isCurrentStudent?: boolean) => {
    isCurrentStudent && setAuth({ ...auth, isCurrentStudent: true });
    navigate('Name');
    setModalVisible(false);
  };

  const fontSize = 15;

  const isFocused = useIsFocused();

  // if (userData.name === '') {
  //   AsyncStorage.removeItem('token');
  // }

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
            <WithLocalSvg width={198} height={55} asset={Logo} />
            <Text size={17} fontFamily="bold">
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
                <Button onPress={onButtonPress} isSecondary isModalBtn>
                  아니오
                </Button>
                <Button onPress={() => onButtonPress(true)} isModalBtn>
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
