import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { useRecoilValue } from 'recoil';

import { checkNumber } from 'src/utils';
import { colors } from 'src/styles';
import { Auth, Button, DummyContainer, Modal, Text } from 'src/components';
import { authState } from 'src/atoms';
import { useAuth, usePhone } from 'src/hooks';

import * as S from './styled';

const CELL_COUNT = 6;
const RESEND_TIME = 60 * 1000;
const RESUCCESS_STATE = { message: '전송되었어요!', color: colors.primary };
const RESEND_STATE = { message: '다시 받기', color: colors.primary };

export const VerifyCodeScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [lastResendTime, setLastResendTime] = useState(0);
  const [resend, setResend] = useState(RESEND_STATE);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  const [modalVisible, setModalVisible] = useState(false);
  const auth = useRecoilValue(authState);
  const { mutate: mutateAuth } = useAuth();
  const { mutate: mutatePhone } = usePhone();

  const onChangeText = (text: string) => {
    const newText = checkNumber(text);
    const codeValidationRegex = /^\d{6}$/;
    setIsDisabled(!codeValidationRegex.test(newText));
    setValue(newText);
  };

  const onSubmit = () => {
    setIsSubmit(true);
    mutateAuth({ ...auth, code: value });
  };

  return (
    <>
      <Auth
        headerText={`인증번호를 보냈어요!\n받은 인증번호를 입력해 주세요`}
        bottomText="인증하기"
        isDisabled={isDisabled}
        onPress={onSubmit}
      >
        <View style={{ flexDirection: 'column', rowGap: 10 }}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={onChangeText}
            cellCount={CELL_COUNT}
            caretHidden={true}
            keyboardType="numeric"
            textContentType="oneTimeCode"
            rootStyle={{ width: '100%' }}
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
    </>
  );
};
