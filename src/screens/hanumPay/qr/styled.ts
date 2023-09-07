import { TextInput } from 'react-native';

import styled from '@emotion/native';

import { colors, fonts } from 'src/styles';

export const HanumPayQRWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const HanumPayQRHeaderWrapper = styled.View`
  padding: 16px;
`;

export const HanumPayQRMoneyContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 20px;
  padding: 20px;
  padding-top: 10px;
`;

export const TextFieldFormInput = styled(TextInput)`
  width: 100%;
  font-size: 18px;
  font-family: ${fonts.medium};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.placeholder};
`;
