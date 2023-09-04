import React, { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Text, Auth } from 'src/components';
import { useStudentCodeVerify } from 'src/hooks';

import * as S from './styled';

const CELL_COUNT = 6;

export const StudentVerifyScreen: React.FC = () => {
  const [value, setValue] = useState('');
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

  const onSubmit = () => {
    console.log(value);
    mutate({ code: value });
  };

  return (
    <Auth
      headerText={`반가워요!\n` + `학생 인증 코드를 확인할게요`}
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
  );
};
