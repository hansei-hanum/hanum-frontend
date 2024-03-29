import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, TextInput } from 'react-native';

import { useIsFocused, useRoute } from '@react-navigation/native';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { AuthInputForm, AppLayout } from 'src/components';
import { NAME_REGEX, PHONE_REGEX } from 'src/constants';
import { useAuthInput, useBlockGesture, usePhone, useSetAnimation } from 'src/hooks';
import { authAtom, isDisableAtom } from 'src/atoms';

import * as S from './styled';

export const FormScreen: React.FC = () => {
  const { animation } = useSetAnimation();

  const route = useRoute();
  const isRegister = route.name === 'Register';

  const setAuth = useSetRecoilState(authAtom);
  const [isDisabled, setIsDisabled] = useRecoilState(isDisableAtom);

  const phoneInputRef = useRef<TextInput>(null);
  const animatedController = useRef(new Animated.Value(0)).current;

  const [isPhoneInput, setIsPhoneInput] = useState<boolean>(false);
  const [nameInputFocused, setNameInputFocused] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(isRegister ? '이름을' : '전화번호를');
  const [height, setHeight] = useState<number>(0);

  const { mutate: phoneMutate, isLoading: isPhoneLoading } = usePhone();

  useBlockGesture(isPhoneLoading);

  const { value: phone, onChange: onPhoneChange } = useAuthInput(PHONE_REGEX, true);
  const { value: name, onChange: onNameChange } = useAuthInput(NAME_REGEX, false);

  const onPhoneSubmit = () => {
    setIsDisabled(true);
    phoneMutate({ phone: phone });
  };

  const onNameSubmit = () => {
    setAuth((prev) => ({ ...prev, name: name, phone: '' }));
    setIsPhoneInput(true);
    setTitle('전화번호를');
    setIsDisabled(true);
    phoneInputRef.current?.focus();
    animation({ animation: animatedController, value: 1, useNativeDriver: false });
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  };

  const nameInputFocus = () => {
    setTitle('이름을');
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
    setAuth((prev) => ({ ...prev, errorMessage: '' }));
    if (
      isFocused &&
      ((isPhoneInput && phone.length === 11) || (!isPhoneInput && name.length >= 2))
    ) {
      setIsDisabled(false);
    }
    setIsPhoneInput(!isRegister || !nameInputFocused);
  }, [isFocused]);

  return (
    <AppLayout
      isLoading={isPhoneLoading}
      headerText={`${title} 알려주세요`}
      bottomText="다음"
      onPress={isPhoneInput && !nameInputFocused ? onPhoneSubmit : onNameSubmit}
      isDisabled={isDisabled}
    >
      <S.FormScreenContainer>
        {isRegister ? (
          <>
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
    </AppLayout>
  );
};
