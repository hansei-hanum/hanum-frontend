import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';

import { colors } from 'src/styles';
import { checkNumber, checkString, isAndroid } from 'src/utils';
import { useBlockGesture, useNavigate, usePhone } from 'src/hooks';
import { authAtom } from 'src/atoms';
import { Text } from 'src/components/common';
import { loadingAtom } from 'src/atoms/loading';

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
  useBlockGesture();

  const navigate = useNavigate();

  const setLoading = useSetRecoilState(loadingAtom);
  const [auth, setAuth] = useRecoilState(authAtom);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const { mutate: phoneMutate } = usePhone();

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
    setLoading(true);
    phoneMutate({ phone: phone });
  };

  const onNameSubmit = () => {
    setAuth({ ...auth, name: name, phone: '' });
    navigate('Phone');
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    setAuth({ ...auth, errorMessage: '' });
  }, [isFocused]);

  return (
    <Auth
      headerText={`${title}`}
      bottomText="다음"
      onPress={isNameScreen ? onNameSubmit : onPhoneSubmit}
      isDisabled={isDisabled}
    >
      <View style={{ flexDirection: 'column', rowGap: isAndroid ? 6 : 0 }}>
        <S.TextFieldFormInputWrapper>
          <S.TextFieldFormInput
            onChangeText={isNameScreen ? onNameChange : onPhoneChange}
            value={isNameScreen ? name : phone}
            variant="standard"
            label={placeHolder}
            keyboardType={isNameScreen ? 'default' : 'numeric'}
            maxLength={isNameScreen ? 16 : 11}
            color={colors.primary}
            inputContainerStyle={{ paddingTop: isAndroid ? 10 : 0 }}
            inputStyle={{ fontSize: 20 }}
          />
        </S.TextFieldFormInputWrapper>
        {isPhoneScreen && auth.errorMessage !== '' && (
          <Text color={colors.danger} size={15}>
            {auth.errorMessage}
          </Text>
        )}
      </View>
    </Auth>
  );
};
