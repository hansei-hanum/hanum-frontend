import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { AuthModal, Button, Text } from 'src/components';
import { useNavigate } from 'src/hooks';
import { authAtom, themeAtom } from 'src/atoms';

import { Logo, WhiteLogo } from '../../../../assets/images';

import * as S from './styled';

export const AuthMainScreen: React.FC = () => {
  const themeValue = useRecoilValue(themeAtom);

  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState({
    isAgreeModal: false,
    isCurrentStudentModal: false,
  });

  const setAuth = useSetRecoilState(authAtom);

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
            <Image
              source={themeValue === 'light' ? Logo : WhiteLogo}
              style={{ width: 198, height: 55, resizeMode: 'contain' }}
            />
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
      <AuthModal setModalVisible={setModalVisible} {...modalVisible} />
    </>
  );
};
