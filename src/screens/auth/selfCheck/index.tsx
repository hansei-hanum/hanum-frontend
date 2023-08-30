import React, { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Button, DummyContainer, Modal, Text, Auth } from 'src/components';
import { checkNumber } from 'src/utils';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

const CELL_COUNT = 6;

export const SelfCheckScreen: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const codeFieldRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onChangeText = (text: string) => {
    const newText = checkNumber(text);
    const codeValidationRegex = /^\d{6}$/;
    codeValidationRegex.test(newText) ? setIsDisabled(false) : setIsDisabled(true);
    setValue(newText);
  };

  const onSubmit = () => {
    setModalVisible(true);
  };

  return (
    <>
      {modalVisible && <DummyContainer />}
      <Auth
        headerText={`반가워요!\n` + `먼저 인증 코드를 확인할게요`}
        bottomText="인증하기"
        isDisabled={isDisabled}
        onPress={onSubmit}
      >
        <CodeField
          ref={codeFieldRef}
          {...props}
          value={value}
          onChangeText={onChangeText}
          cellCount={CELL_COUNT}
          caretHidden={true}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          rootStyle={{
            width: '100%',
          }}
          renderCell={({ index, symbol, isFocused }) => (
            <S.SelfCheckScreenInput key={index} onLayout={getCellOnLayoutHandler(index)}>
              <Text size="20" fontFamily="medium">
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </S.SelfCheckScreenInput>
          )}
        />
      </Auth>
      <Modal
        title="본인 확인"
        text={
          `본인이 클라우드보안과 1학년 2반 6번이 맞나요?\n` +
          `본인과 정보가 다를 경우 반드시 문의를 통해 정정해주세요. 그렇지 않을 경우 나중에 계정이 이용 제한될 수도 있어요.`
        }
        modalVisible={modalVisible}
        button={
          <Button
            onPress={() => {
              setModalVisible(false), navigate('Name');
            }}
            isModalBtn
          >
            확인
          </Button>
        }
      />
    </>
  );
};
