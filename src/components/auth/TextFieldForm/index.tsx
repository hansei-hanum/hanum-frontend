import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';

import { colors } from 'src/styles';
import { checkNumber, checkString, isAndroid } from 'src/utils';
import { useBlockGesture, useNavigate, usePhone } from 'src/hooks';
import { authAtom, disableAtom } from 'src/atoms';
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
  const navigate = useNavigate();

  const [auth, setAuth] = useRecoilState(authAtom);
  const [disabled, setDisabled] = useRecoilState(disableAtom);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const { mutate: phoneMutate, isLoading: isPhoneLoading } = usePhone();

  useBlockGesture(isPhoneLoading);

  const onNameChange = (text: string) => {
    const newText = checkString(text);
    const nameRegex = /^[가-힣]{2,10}$/;
    if (!nameRegex.test(newText)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setName(newText);
  };

  const onPhoneChange = (phone: string) => {
    const newPhone = checkNumber(phone);
    const phoneRegex = /^010-?\d{4}-?\d{4}$/;
    if (!phoneRegex.test(newPhone)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setPhone(newPhone);
  };

  const onPhoneSubmit = () => {
    setDisabled(true);
    console.log('phone', phone);
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
      setDisabled(false);
    }
  }, [isFocused]);

  return (
    <Auth
      isLoading={isPhoneLoading}
      headerText={`${title}`}
      bottomText="다음"
      onPress={isNameScreen ? onNameSubmit : onPhoneSubmit}
      isDisabled={disabled}
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
