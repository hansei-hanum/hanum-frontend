import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { TextInputProps } from '@react-native-material/core';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';

import { checkType, isAndroid } from 'src/utils';
import { useBlockGesture, useNavigate, usePhone } from 'src/hooks';
import { authAtom, isDisableAtom } from 'src/atoms';
import { Text } from 'src/components';
import { NAME_REGEX, PHONE_REGEX } from 'src/constants';

import { AuthLayout } from '../AuthLayout';

import * as S from './styled';

export interface AuthInputFormCustomProps {
  placeHolder: string;
}

export type AuthInputFormProps = AuthInputFormCustomProps & TextInputProps;

export const AuthInputForm: React.FC<AuthInputFormProps> = ({ placeHolder, ...props }) => {
  const theme = useTheme();

  const auth = useRecoilValue(authAtom);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  return (
    <View style={{ flexDirection: 'column', rowGap: isAndroid ? 6 : 0 }}>
      <S.TextFieldFormInputWrapper>
        <S.TextFieldFormInput
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          variant="standard"
          label={isInputFocused ? placeHolder : ''}
          placeholder={isInputFocused ? '' : placeHolder}
          placeholderTextColor={theme.default}
          color={theme.primary}
          inputContainerStyle={{ paddingTop: isAndroid ? 10 : 0 }}
          inputStyle={{ fontSize: 20, color: theme.default }}
          {...props}
        />
      </S.TextFieldFormInputWrapper>
      {auth.errorMessage !== '' && (
        <Text color={theme.danger} size={15}>
          {auth.errorMessage}
        </Text>
      )}
    </View>
  );
};
