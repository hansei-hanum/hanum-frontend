import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { Logo } from '@hanum/assets';
import { Button, DummyContainer, Modal, Text } from '@hanum/components';
import { colors } from '@hanum/styles';

import * as S from './styled';
import { WithLocalSvg } from 'react-native-svg';

export const MainScreen: React.FC = () => {
  const navigate = useNavigation().navigate as (s: string) => void;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onButtonPress = (navigateUrl: string) => {
    navigate(`${navigateUrl}`);
    setModalVisible(false);
  }

  return (
    <>
      {modalVisible && <DummyContainer />}
      <S.MainScreenContainer>
        <S.MainScreenLogoContainer>
          <WithLocalSvg width={180} height={50} asset={Logo} />
          <Text size='16' fontFamily="bold">
            한세인 도우미, 한움
          </Text>
        </S.MainScreenLogoContainer>
        <S.MainScreenMainSection>
          <Button onPress={() => navigate('Phone')}>로그인</Button>
          <Button isSecondary onPress={() => setModalVisible(true)}>
            회원가입
          </Button>
          <S.MainScreenTextContainer>
            <Text size='16' fontFamily="bold">
              교직원이신가요?{' '}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('Staff')}>
              <Text size='16' fontFamily="bold" color={colors.primary}>
                교직원 회원가입 요청
              </Text>
            </TouchableOpacity>
          </S.MainScreenTextContainer>
        </S.MainScreenMainSection>
      </S.MainScreenContainer>
      <Modal
        title="정회원 가입 안내"
        text={`한움의 일부 서비스는 인증된 재학생, 졸업생, 교직원만 사용할 수 있어요.\n` + `인증을 위해서는 배포된 개인용 인증 코드가 필요해요. 인증 코드를 가지고 계신가요?`}
        modalVisible={modalVisible}
        button={
          <S.MainScreenButtonContainer>
            <Button
              onPress={() => { onButtonPress('Name') }}
              width="48"
              isSecondary
              isModalBtn
            >
              아니오
            </Button>
            <Button
              onPress={() => { onButtonPress('SelfCheck') }}
              width="48"
              isModalBtn
            >
              예!
            </Button>
          </S.MainScreenButtonContainer>
        }
      />
    </>
  );
};
