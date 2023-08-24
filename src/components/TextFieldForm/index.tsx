import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { colors } from 'src/styles';
import { checkNumber, checkString } from 'src/utils';

import { Auth } from '../Auth';

import * as S from './styled';

export interface TextFieldForm {
  title: string;
  placeHolder: string;
  isNameScreen?: boolean;
  onSubmit: () => void;
}

export const TextFieldForm: React.FC<TextFieldForm> = ({
  title,
  placeHolder,
  isNameScreen,
  onSubmit,
}) => {
  const navigate = useNavigation().navigate as (screen: string) => void;
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

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
    console.log(phone);
    const newPhone = checkNumber(phone);
    const phoneRegex = /^010-?\d{4}-?\d{4}$/;
    if (!phoneRegex.test(newPhone)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setPhone(newPhone);
  };

  return (
    <Auth headerText={`${title}`} bottomText="다음" onPress={onSubmit} isDisabled={isDisabled}>
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
