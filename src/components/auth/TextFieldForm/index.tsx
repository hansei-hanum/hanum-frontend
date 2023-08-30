import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { colors } from 'src/styles';
import { checkNumber, checkString } from 'src/utils';
import { useNavigate, usePhone } from 'src/hooks';
import { authState } from 'src/atoms';

import { Auth } from '../AuthForm';

import * as S from './styled';

export interface TextFieldForm {
  title: string;
  placeHolder: string;
  isNameScreen?: boolean;
}

export const TextFieldForm: React.FC<TextFieldForm> = ({ title, placeHolder, isNameScreen }) => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
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
    phoneMutate({ phone: phone });
  };

  const onNameSubmit = () => {
    setAuth({ name: name, phone: '', errorModal: { ratedLimit: false, externalApi: false } });
    navigate('Phone');
  };

  return (
    <Auth
      headerText={`${title}`}
      bottomText="다음"
      onPress={isNameScreen ? onNameSubmit : onPhoneSubmit}
      isDisabled={isDisabled}
    >
      <S.TextFieldFormInput
        onChangeText={isNameScreen ? onNameChange : onPhoneChange}
        value={isNameScreen ? name : phone}
        variant="standard"
        label={placeHolder}
        keyboardType={isNameScreen ? 'default' : 'numeric'}
        maxLength={isNameScreen ? 10 : 11}
        color={colors.placeholder}
        inputContainerStyle={{ borderBottomColor: colors.placeholder }}
        inputStyle={{ fontSize: 20 }}
      />
    </Auth>
  );
};
