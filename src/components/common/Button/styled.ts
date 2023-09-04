import styled from '@emotion/native';

import { colors, fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const ButtonElement = styled.TouchableOpacity`
  width: 100%;
  color: ${colors.white};
  padding: 14px 0;
`;

export const ButtonText = styled.Text`
  font-size: ${isIos ? '16px' : '14px'};
  font-family: ${fonts.bold};
  color: ${colors.white};
  text-align: center;
`;
