import React, { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { useRecoilValue } from 'recoil';

import { Text, Auth, DummyContainer, Modal, Button } from 'src/components';
import { useStudentCodeVerify } from 'src/hooks';
import { studentVerifyState } from 'src/atoms';
import { formattedDepartment } from 'src/utils';

import * as S from './styled';

const CELL_COUNT = 6;

export const StudentVerifyScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const codeFieldRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { mutate } = useStudentCodeVerify();
  const studentVerify = useRecoilValue(studentVerifyState);

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
        headerText={`재학생 인증 코드를\n` + `입력해주세요`}
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
        <>
          <DummyContainer />
          <Modal
            title="본인 확인"
            text={
              `${formattedDepartment(studentVerify.department)} ${studentVerify.grade}학년 ${
                studentVerify.classroom
              }반 ${studentVerify.number}번 학생이 맞나요? \n` +
              `본인과 정보가 다를 경우 반드시 문의를 통해 정정해주세요. 그렇지 않을 경우 나중에 계정이 이용 제한될 수도 있어요.`
            }
            modalVisible={modalVisible}
            button={
              <S.StudentVerifyButtonContainer>
                <Button onPress={() => setModalVisible(false)} isSecondary isModalBtn>
                  아니오
                </Button>
                <Button onPress={onSubmit} isModalBtn>
                  예!
                </Button>
              </S.StudentVerifyButtonContainer>
            }
          />
        </>
      )}
    </>
  );
};
