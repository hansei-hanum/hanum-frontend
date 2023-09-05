import styled from '@emotion/native';

import { colors, fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const LunchTableTextContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  row-gap: 6px;
  text-align: center;
`;

export const LunchTableText = styled.Text`
  text-align: center;
  font-size: ${isIos ? '16px' : '14px'};
  font-family: ${fonts.bold};
  color: ${colors.black};
`;
