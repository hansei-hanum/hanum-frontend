import React, { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { TouchableOpacity } from 'react-native';

import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';

import { Text, Auth, Modal, Button } from 'src/components';
import { useInitNavigate, useMemberVerify } from 'src/hooks';
import { authState, meberVerifyState } from 'src/atoms';
import { formattedDepartment } from 'src/utils';
import { colors } from 'src/styles';

import * as S from './styled';

const CELL_COUNT = 6;

export const VerifyScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const codeFieldRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const navigation = useNavigation();

  const { mutate } = useMemberVerify();

  const memberVerify = useRecoilValue(meberVerifyState);
  const authValue = useRecoilValue(authState);

  const { initNavigate } = useInitNavigate();

  const onChangeText = (text: string) => {
    text.length === 6 ? setIsDisabled(false) : setIsDisabled(true);
    setValue(text);
  };

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
        <CodeField
          ref={codeFieldRef}
          {...props}
          value={value}
          onChangeText={onChangeText}
          cellCount={CELL_COUNT}
          caretHidden={true}
          keyboardType="default"
          textContentType="oneTimeCode"
          rootStyle={{
            width: '100%',
          }}
          renderCell={({ index, symbol, isFocused }) => (
            <S.StudentVerifyInput key={index} onLayout={getCellOnLayoutHandler(index)}>
              <Text size={20} fontFamily="medium">
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </S.StudentVerifyInput>
          )}
        />
      </Auth>
      {modalVisible && (
        <Modal
          title="본인 확인"
          text={
            memberVerify.isUsed
              ? `이미 사용된 인증코드에요.`
              : memberVerify.type === 'TEACHER'
              ? `한세사이버보안고등학교 교직원이 맞으신가요?`
              : memberVerify.type === 'STUDENT'
              ? `${formattedDepartment(memberVerify.department)} ${memberVerify.grade}학년 ${
                  memberVerify.classroom
                }반 ${memberVerify.number}번 학생이 맞나요?`
              : `${authValue.errorMessage}`
          }
          modalVisible={modalVisible}
          button={
            authValue.errorMessage === '' && !memberVerify.isUsed ? (
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
