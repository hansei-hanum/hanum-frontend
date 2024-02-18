import { Animated, TextInput } from 'react-native';

import styled from '@emotion/native';

export const TextFieldFormInputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const AuthPageFormGroup = styled.View`
  padding-top: 15px;
  margin-top: 10px;
  width: 100%;
`;

export const AuthPageFormInput = styled(TextInput)<{ isFocused: boolean; hasValue: boolean }>`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, isFocused }) => (isFocused ? theme.primary : theme.placeholder)};
  font-size: 20px;
  color: ${({ theme }) => theme.default};
  padding: ${({ isFocused, hasValue }) => (isFocused || hasValue ? '10px 0' : '6px 0')};
  width: 100%;
`;

export const AuthPageFormLabel = styled(Animated.Text)`
  position: absolute;
  top: 0;
  font-size: 15px;
  color: ${({ theme }) => theme.placeholder};
`;
