import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';

import { Text, Auth, Modal, Button, CodeInput, Spinner } from 'src/components';
import { useInitNavigate, useUserVerify } from 'src/hooks';
import { authAtom, userVerifyAtom } from 'src/atoms';
import { formattedDepartment } from 'src/utils';
import { colors } from 'src/styles';

import * as S from './styled';

export const VerifyScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const navigation = useNavigation();

  const { mutate, isLoading } = useUserVerify();

  const userVerify = useRecoilValue(userVerifyAtom);
  const authValue = useRecoilValue(authAtom);

  const { initNavigate } = useInitNavigate();

  const onCheckSubmit = () => {
    mutate({ code: value, isCheck: true });
    setModalVisible(true);
  };

  const onSubmit = () => {
    mutate({ code: value, isCheck: false });
    setModalVisible(false);
  };

  return (
    <>
      <Auth
        isLoading={isLoading}
        headerText={`정회원 인증 코드를\n` + `입력해주세요`}
        subHeaderText={
          <S.StudentVerifyTextContainer>
            <Text size={15} color={colors.placeholder}>
              아직 인증 코드가 없나요?
            </Text>
            <TouchableOpacity
              onPress={() => {
                initNavigate('Main');
              }}
              activeOpacity={0.5}
            >
              <Text size={15} color={colors.primary}>
                {' '}
                나중에 하기
              </Text>
            </TouchableOpacity>
          </S.StudentVerifyTextContainer>
        }
        bottomText="인증하기"
        isDisabled={isDisabled}
        onPress={onCheckSubmit}
      >
        <CodeInput
          value={value}
          setValue={setValue}
          isNumber={false}
          setIsDisabled={setIsDisabled}
        />
      </Auth>
      {modalVisible && (
        <Modal
          title="본인 확인"
          text={
            isLoading ? (
              <Spinner />
            ) : userVerify.isUsed ? (
              `이미 사용된 인증코드에요.`
            ) : userVerify.type === 'TEACHER' ? (
              `한세사이버보안고등학교 교직원이 맞으신가요?`
            ) : userVerify.type === 'STUDENT' ? (
              `${formattedDepartment(userVerify.department)} ${userVerify.grade}학년 ${
                userVerify.classroom
              }반 ${userVerify.number}번 학생이 맞나요?`
            ) : (
              `${authValue.errorMessage}`
            )
          }
          modalVisible={modalVisible}
          button={
            authValue.errorMessage === '' && !userVerify.isUsed ? (
              <Button.Container>
                <Button
                  onPress={() => setModalVisible(false)}
                  backgroundColor={colors.secondary}
                  textColor={colors.black}
                  isModalBtn
                >
                  아니오
                </Button>
                <Button onPress={onSubmit} isModalBtn>
                  예!
                </Button>
              </Button.Container>
            ) : (
              <Button
                onPress={() => {
                  setModalVisible(false);
                  navigation.goBack();
                }}
              >
                확인
              </Button>
            )
          }
        />
      )}
    </>
  );
};
