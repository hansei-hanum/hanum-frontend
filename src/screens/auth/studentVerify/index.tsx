import React, { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Text, Auth, DummyContainer, Modal, Button } from 'src/components';
import { useStudentCodeVerify } from 'src/hooks';

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

  const onChangeText = (text: string) => {
    text.length === 6 ? setIsDisabled(false) : setIsDisabled(true);
    setValue(text);
  };

  const onCheckSubmit = () => {
    mutate({ code: value, isCheck: true });
    setModalVisible(true);
  };

  const onSubmit = () => {
    console.log(value);
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
            title="정회원 가입 안내"
            text={
              `한움의 일부 서비스는 인증된 재학생, 졸업생, 교직원만 사용할 수 있어요.\n` +
              `인증을 위해서는 배포된 개인용 인증 코드가 필요해요. 인증 코드를 가지고 계신가요?`
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
