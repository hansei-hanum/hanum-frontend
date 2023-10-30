import React from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Text } from 'src/components/common';
import { checkNumber } from 'src/utils';

import * as S from './styled';

export interface CodeInputProps {
  isNumber: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const CELL_COUNT = 6;

export const CodeInput: React.FC<CodeInputProps> = ({
  isNumber,
  value,
  setValue,
  setIsDisabled,
}) => {
  const codeFieldRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onChangeText = (text: string) => {
    if (isNumber) {
      const newText = checkNumber(text);
      const codeValidationRegex = /^\d{6}$/;
      setIsDisabled(!codeValidationRegex.test(newText));
      setValue(newText);
    } else {
      text.length === 6 ? setIsDisabled(false) : setIsDisabled(true);
      setValue(text);
    }
  };

  return (
    <CodeField
      ref={codeFieldRef}
      {...props}
      value={value}
      onChangeText={onChangeText}
      cellCount={CELL_COUNT}
      caretHidden={true}
      keyboardType={isNumber ? 'numeric' : 'default'}
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
  );
};
