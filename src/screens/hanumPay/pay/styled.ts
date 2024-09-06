import { TextInput } from '@react-native-material/core';

import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const TextFieldFormInput = styled(TextInput)`
  margin-top: 8px;
  width: 100%;
  font-size: 18px;
  font-family: ${fonts.medium};
`;
