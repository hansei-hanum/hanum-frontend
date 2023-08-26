import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Toast from 'react-native-toast-message';

import { useNavigation } from '@react-navigation/native';

import { checkNumber } from 'src/utils';
import { colors } from 'src/styles';
import { Auth, Button, DummyContainer, Modal, Text } from 'src/components';

import * as S from './styled';

const CELL_COUNT = 6;
const RESEND_TIME = 60 * 1000; // 1 minute in milliseconds

export const VerifyCodeScreen: React.FC = () => {
  const navigation = useNavigation();
  const navigate = navigation.navigate as (s: string) => void;
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [lastInputTime, setLastInputTime] = useState<number>(0);
  const [lastResendTime, setLastResendTime] = useState<number>(0);
  const [resend, setResend] = useState({ message: '재전송 하기', color: colors.primary });
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
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
    setLastInputTime(Date.now());
  };

  const handleResend = () => {
    const currentTime = Date.now();
    if (currentTime - lastResendTime <= RESEND_TIME) {
      setResend({ message: '1분에 한번만 전송 가능해요', color: colors.danger });
    } else {
      setResend({ message: '전송되었어요!', color: colors.primary });
      setLastResendTime(currentTime);
    }

    const resendClear = setInterval(() => {
      setResend({ message: '재전송 하기', color: colors.primary });
      setLastResendTime(currentTime);
    }, 60 * 1000);

    return () => {
      clearInterval(resendClear);
    };
  };

  const onSubmit = () => {
    navigate('Main');
    Toast.show({
      position: 'bottom',
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        setModalVisible(true);
      },
      5 * 60 * 1000,
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [lastInputTime]);

  return (
    <>
      {modalVisible && <DummyContainer />}
      <Auth
        headerText={`인증 번호를 보냈어요!\n` + `받은 인증 번호를 입력해 주세요`}
        subHeaderText={
          <S.VerifyCodeScreenTextContainer>
            <Text size="16" fontFamily="regular">
              문자가 안 오나요?
            </Text>
            <TouchableOpacity
              {...(resend.color !== colors.danger ? { activeOpacity: 0.2 } : { activeOpacity: 1 })}
              onPress={handleResend}
            >
              <Text size="16" color={resend.color}>
                {' '}
                {resend.message}
              </Text>
            </TouchableOpacity>
          </S.VerifyCodeScreenTextContainer>
        }
        bottomText="인증하기"
        isDisabled={isDisabled}
        onPress={onSubmit}
      >
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={onChangeText}
          cellCount={CELL_COUNT}
          caretHidden={true}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          rootStyle={{
            width: '100%',
          }}
          renderCell={({ index, symbol, isFocused }) => (
            <S.VerifyCodeScreenInput key={index} onLayout={getCellOnLayoutHandler(index)}>
              <Text size="20" fontFamily="medium">
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </S.VerifyCodeScreenInput>
          )}
        />
      </Auth>
      <Modal
        title="인증 시간 초과"
        text={`인증번호를 입력할 수 있는 시간이 지났어요.\n` + `처음부터 다시 시도해 주세요.`}
        modalVisible={modalVisible}
        button={
          <Button onPress={() => setModalVisible(false)} isModalBtn>
            확인
          </Button>
        }
      />
    </>
  );
};
