import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, TextInput } from 'react-native';

import { useIsFocused, useRoute } from '@react-navigation/native';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { AuthInputForm, AuthLayout } from 'src/components';
import { NAME_REGEX, PHONE_REGEX } from 'src/constants';
import { useBlockGesture, usePhone, useSetAnimation } from 'src/hooks';
import { authAtom, isDisableAtom } from 'src/atoms';
import { checkNumber, checkString } from 'src/utils';

import * as S from './styled';

export const FormScreen: React.FC = () => {
  const { animation } = useSetAnimation();

  const route = useRoute();
  const isRegister = route.name === 'Register';

  const [auth, setAuth] = useRecoilState(authAtom);
  const setIsDisabled = useSetRecoilState(isDisableAtom);

  const phoneInputRef = useRef<TextInput>(null);
  const animatedController = useRef(new Animated.Value(0)).current;

  const [isPhoneInput, setIsPhoneInput] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameInputFocused, setNameInputFocused] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const { mutate: phoneMutate, isLoading: isPhoneLoading } = usePhone();

  useBlockGesture(isPhoneLoading);

  const onPhoneSubmit = () => {
    setIsDisabled(true);
    phoneMutate({ phone: phone });
  };

  const onNameSubmit = () => {
    setAuth({ ...auth, name: name, phone: '' });
    setIsPhoneInput(true);
    setIsDisabled(true);
    phoneInputRef.current?.focus();
    animation({ animation: animatedController, value: 1, useNativeDriver: false });
  };

  const onPhoneChange = (input: string) => {
    const validInput = checkNumber(input);
    const regex = PHONE_REGEX;

    setIsDisabled(!regex.test(validInput));
    setPhone(validInput);
  };

  const onNameChange = (input: string) => {
    const validInput = checkString(input);
    const regex = NAME_REGEX;

    setIsDisabled(!regex.test(validInput));
    setName(validInput);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  };

  const nameInputFocus = () => {
    setNameInputFocused(true);
    setIsDisabled(name.length < 2);
  };

  const nameInputBlur = () => {
    setNameInputFocused(false);
  };

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height + 30],
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    setAuth({ ...auth, errorMessage: '' });
    if (
      isFocused &&
      ((isPhoneInput && phone.length === 11) || (!isPhoneInput && name.length >= 2))
    ) {
      setIsDisabled(false);
    }
    setIsPhoneInput(!isRegister);
  }, [isFocused]);

  return (
    <AuthLayout
      isLoading={isPhoneLoading}
      headerText={`${isPhoneInput && !nameInputFocused ? '전화번호를' : '이름을'} 알려주세요`}
      bottomText="다음"
      onPress={isPhoneInput && !nameInputFocused ? onPhoneSubmit : onNameSubmit}
    >
      <S.FormScreenContainer>
        {isRegister ? (
          <>
            <Animated.View style={{ height: bodyHeight, overflow: 'hidden' }}>
              <AuthInputForm
                ref={phoneInputRef}
                label="전화번호"
                keyboardType="numeric"
                maxLength={11}
                value={phone}
                onChangeText={onPhoneChange}
              />
            </Animated.View>
            <AuthInputForm
              onLayout={onLayout}
              onFocus={nameInputFocus}
              onBlur={nameInputBlur}
              label="이름"
              keyboardType="default"
              maxLength={4}
              value={name}
              onChangeText={onNameChange}
            />
          </>
        ) : (
          <AuthInputForm
            ref={phoneInputRef}
            label="전화번호"
            keyboardType="numeric"
            maxLength={11}
            value={phone}
            onChangeText={onPhoneChange}
          />
        )}
      </S.FormScreenContainer>
    </AuthLayout>
  );
};
