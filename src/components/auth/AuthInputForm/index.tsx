import React, { forwardRef, useRef, useState } from 'react';
import { Animated, View, TextInputProps, TextInput } from 'react-native';

import { useRecoilValue } from 'recoil';
import { useTheme } from '@emotion/react';

import { isAndroid } from 'src/utils';
import { authAtom } from 'src/atoms';
import { Text } from 'src/components';

import * as S from './styled';

export interface AuthInputFormCustomProps {
  label: string;
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: React.Ref<TextInput>;
}

export type AuthInputFormProps = AuthInputFormCustomProps & TextInputProps;

export const AuthInputForm = forwardRef<TextInput, AuthInputFormProps>(
  ({ label, value, onFocus: onElementFocus, onBlur: onElementBlur, ...props }, ref) => {
    const theme = useTheme();

    const auth = useRecoilValue(authAtom);

    const position = useRef(new Animated.Value(20)).current;

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onFocus = () => {
      setIsFocused(true);
      Animated.timing(position, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      onElementFocus && onElementFocus();
    };

    const onBlur = () => {
      setIsFocused(false);
      Animated.timing(position, {
        toValue: value.length !== 0 ? 0 : 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
      onElementBlur && onElementBlur();
    };

    return (
      <View style={{ flexDirection: 'column', rowGap: isAndroid ? 6 : 0, width: '100%' }}>
        <S.AuthPageFormGroup>
          <S.AuthPageFormInput
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            isFocused={isFocused}
            hasValue={value.length !== 0}
            {...props}
          />
          <S.AuthPageFormLabel style={{ top: position }}>{label}</S.AuthPageFormLabel>
        </S.AuthPageFormGroup>
        {auth.errorMessage !== '' && (
          <Text color={theme.danger} size={15}>
            {auth.errorMessage}
          </Text>
        )}
      </View>
    );
  },
);
