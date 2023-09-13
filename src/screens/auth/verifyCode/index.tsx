import React, { useState } from 'react';
import { View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { useRecoilValue } from 'recoil';

import { checkNumber, isAndroid } from 'src/utils';
import { colors } from 'src/styles';
import { Auth, Text } from 'src/components';
import { authState } from 'src/atoms';
import { useAuth } from 'src/hooks';

import * as S from './styled';

const CELL_COUNT = 6;

export const VerifyCodeScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  const auth = useRecoilValue(authState);
  const { mutate: mutateAuth } = useAuth();

  const onChangeText = (text: string) => {
    const newText = checkNumber(text);
    const codeValidationRegex = /^\d{6}$/;
    setIsDisabled(!codeValidationRegex.test(newText));
    setValue(newText);
  };

  const onSubmit = () => {
    mutateAuth({ ...auth, code: value });
  };

  return (
    <Auth
      headerText={`인증번호를 보냈어요!\n받은 인증번호를 입력해 주세요`}
      bottomText="인증하기"
      isDisabled={isDisabled}
      onPress={onSubmit}
    >
      <View style={{ flexDirection: 'column', rowGap: isAndroid ? 10 : 0 }}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={onChangeText}
          cellCount={CELL_COUNT}
          caretHidden={true}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          rootStyle={{ width: '100%', marginBottom: 10 }}
          renderCell={({ index, symbol, isFocused }) => (
            <S.VerifyCodeScreenInput key={index} onLayout={getCellOnLayoutHandler(index)}>
              <Text size={20} fontFamily="medium">
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </S.VerifyCodeScreenInput>
          )}
        />
        {auth.errorMessage && (
          <Text size={15} color={colors.danger}>
            {auth.errorMessage}
          </Text>
        )}
      </View>
    </Auth>
  );
};
