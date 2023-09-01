import { Platform } from 'react-native';

import styled from '@emotion/native';

import { colors, fonts } from 'src/styles';

export const LunchTableTextContainer = styled.SafeAreaView`
  width: 100%;
  align-items: center;
  justify-content: center;
  row-gap: 6px;
  text-align: center;
`;

export const LunchTableText = styled.Text`
  text-align: center;
  font-size: ${Platform.OS === 'ios' ? '16px' : '14px'};
  font-family: ${fonts.bold};
  color: ${colors.black};
`;
