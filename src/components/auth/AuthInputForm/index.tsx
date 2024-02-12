import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';

import { checkType, isAndroid } from 'src/utils';
import { useBlockGesture, useNavigate, usePhone } from 'src/hooks';
import { authAtom, isDisableAtom } from 'src/atoms';
import { Text } from 'src/components';
import { NAME_REGEX, PHONE_REGEX } from 'src/constants';

import { AuthLayout } from '../AuthLayout';

import * as S from './styled';

export interface AuthInputFormProps {
  title: string;
  placeHolder: string;
  isPhoneScreen?: boolean;
}

export const AuthInputForm: React.FC<AuthInputFormProps> = ({
  title,
  placeHolder,
  isPhoneScreen,
}) => {
  const checkValidType = checkType(isPhoneScreen ? 'number' : 'string');

  const theme = useTheme();

  const navigate = useNavigate();

  const [auth, setAuth] = useRecoilState(authAtom);
  const setIsDisabled = useSetRecoilState(isDisableAtom);

  const [value, setValue] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const { mutate: phoneMutate, isLoading: isPhoneLoading } = usePhone();

  useBlockGesture(isPhoneLoading);

  const handleInputChange = (input: string, regex: RegExp) => {
    const validInput = checkValidType(input);

    if (!regex.test(validInput)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setValue(validInput);
  };

  const onPhoneSubmit = () => {
    setIsDisabled(true);
    phoneMutate({ phone: value });
  };

  const onNameSubmit = () => {
    setAuth({ ...auth, name: value, phone: '' });
    navigate('Phone');
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    setAuth({ ...auth, errorMessage: '' });
    if (isFocused && isPhoneScreen && value.length === 11) {
      setIsDisabled(false);
    }
  }, [isFocused]);

  return (
    <AuthLayout
      isLoading={isPhoneLoading}
      headerText={`${title}`}
      bottomText="다음"
      onPress={isPhoneScreen ? onPhoneSubmit : onNameSubmit}
    >
      <View style={{ flexDirection: 'column', rowGap: isAndroid ? 6 : 0 }}>
        <S.TextFieldFormInputWrapper>
          <S.TextFieldFormInput
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChangeText={(text) =>
              handleInputChange(text, isPhoneScreen ? PHONE_REGEX : NAME_REGEX)
            }
            value={value}
            variant="standard"
            label={isInputFocused ? placeHolder : ''}
            placeholder={isInputFocused ? '' : placeHolder}
            placeholderTextColor={theme.default}
            keyboardType={isPhoneScreen ? 'numeric' : 'default'}
            maxLength={isPhoneScreen ? 11 : 16}
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
    </AuthLayout>
  );
};
