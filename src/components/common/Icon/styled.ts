import styled from '@emotion/native';

import { colors, fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const IconWrapper = styled.View`
  padding: 4px;
  border-radius: 10px;
  background-color: ${colors.lightGray};
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.Text`
  font-size: 30px;
  font-family: ${fonts.tossIcon};
  color: ${colors.black};
  text-align: center;
  position: ${isIos ? 'relative' : 'relative'};
  top: ${isIos ? '0px' : '5px'};
`;
