import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';

import { checkNumber, checkString, isAndroid } from 'src/utils';
import { useBlockGesture, useNavigate, usePhone } from 'src/hooks';
import { authAtom, isDisableAtom } from 'src/atoms';
import { Text } from 'src/components';

import { Auth } from '../AuthForm';

import * as S from './styled';

export interface TextFieldForm {
  title: string;
  placeHolder: string;
  isNameScreen?: boolean;
  isPhoneScreen?: boolean;
}

export const TextFieldForm: React.FC<TextFieldForm> = ({
  title,
  placeHolder,
  isNameScreen,
  isPhoneScreen,
}) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [auth, setAuth] = useRecoilState(authAtom);
  const setIsDisabled = useSetRecoilState(isDisableAtom);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);

  const { mutate: phoneMutate, isLoading: isPhoneLoading } = usePhone();

  useBlockGesture(isPhoneLoading);

  const onNameChange = (text: string) => {
    const newText = checkString(text);
    const nameRegex = /^[가-힣]{2,10}$/;
    if (!nameRegex.test(newText)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setName(newText);
  };

  const onPhoneChange = (phone: string) => {
    const newPhone = checkNumber(phone);
    const phoneRegex = /^010-?\d{4}-?\d{4}$/;
    if (!phoneRegex.test(newPhone)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setPhone(newPhone);
  };

  const onPhoneSubmit = () => {
    setIsDisabled(true);
    phoneMutate({ phone: phone });
  };

  const onNameSubmit = () => {
    setAuth({ ...auth, name: name, phone: '' });
    navigate('Phone');
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    setAuth({ ...auth, errorMessage: '' });
    if (isFocused && phone.length === 11) {
      setIsDisabled(false);
    }
  }, [isFocused]);

  return (
    <Auth
      isLoading={isPhoneLoading}
      headerText={`${title}`}
      bottomText="다음"
      onPress={isNameScreen ? onNameSubmit : onPhoneSubmit}
    >
      <View style={{ flexDirection: 'column', rowGap: isAndroid ? 6 : 0 }}>
        <S.TextFieldFormInputWrapper>
          <S.TextFieldFormInput
            onFocus={() => setClicked(true)}
            onBlur={() => setClicked(false)}
            onChangeText={isNameScreen ? onNameChange : onPhoneChange}
            value={isNameScreen ? name : phone}
            variant="standard"
            label={clicked ? placeHolder : ''}
            placeholder={clicked ? '' : placeHolder}
            placeholderTextColor={theme.default}
            keyboardType={isNameScreen ? 'default' : 'numeric'}
            maxLength={isNameScreen ? 16 : 11}
            color={theme.primary}
            inputContainerStyle={{ paddingTop: isAndroid ? 10 : 0 }}
            inputStyle={{ fontSize: 20, color: theme.default }}
          />
        </S.TextFieldFormInputWrapper>
        {isPhoneScreen && auth.errorMessage !== '' && (
          <Text color={theme.danger} size={15}>
            {auth.errorMessage}
          </Text>
        )}
      </View>
    </Auth>
  );
};
