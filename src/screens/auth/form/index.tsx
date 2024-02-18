import { useEffect, useState } from 'react';

import { useIsFocused, useRoute } from '@react-navigation/native';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { AnimatedHoc, AuthInputForm, AuthLayout } from 'src/components';
import { NAME_REGEX, PHONE_REGEX } from 'src/constants';
import { useBlockGesture, usePhone } from 'src/hooks';
import { authAtom, isDisableAtom } from 'src/atoms';
import { checkType } from 'src/utils';

export const FormScreen: React.FC = () => {
  const route = useRoute();
  const isRegister = route.name === 'Register';

  const [auth, setAuth] = useRecoilState(authAtom);
  const setIsDisabled = useSetRecoilState(isDisableAtom);

  const [isPhoneInput, setIsPhoneInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [nameInputFocused, setNameInputFocused] = useState<boolean>(false);

  const checkValidType = checkType(isPhoneInput ? 'number' : 'string');

  const { mutate: phoneMutate, isLoading: isPhoneLoading } = usePhone();

  useBlockGesture(isPhoneLoading);

  const onPhoneSubmit = () => {
    setIsDisabled(true);
    phoneMutate({ phone: value });
  };

  const onNameSubmit = () => {
    setAuth({ ...auth, name: value, phone: '' });
    setIsPhoneInput(true);
    setIsDisabled(true);
  };

  const onChangeText = (input: string) => {
    const validInput = checkValidType(input);
    const regex = isPhoneInput && !nameInputFocused ? PHONE_REGEX : NAME_REGEX;

    setIsDisabled(!regex.test(validInput));
    setValue(validInput);
  };

  const nameInputFocus = () => {
    setNameInputFocused(true);
  };

  const nameInputBlur = () => {
    setNameInputFocused(false);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    setAuth({ ...auth, errorMessage: '' });
    if (
      isFocused &&
      ((isPhoneInput && value.length === 11) || (!isPhoneInput && value.length >= 2))
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
      onPress={isPhoneInput ? onPhoneSubmit : onNameSubmit}
    >
      <AnimatedHoc isOpen={isPhoneInput}>
        <AuthInputForm
          placeHolder="전화번호"
          keyboardType="numeric"
          maxLength={11}
          onChangeText={onChangeText}
        />
      </AnimatedHoc>
      {isRegister && (
        <AuthInputForm
          placeHolder="이름"
          keyboardType="default"
          maxLength={4}
          onChangeText={onChangeText}
          label={nameInputFocused ? '이름' : ''}
          placeholder={nameInputFocused ? '' : '이름'}
          onFocus={nameInputFocus}
          onBlur={nameInputBlur}
        />
      )}
    </AuthLayout>
  );
};
