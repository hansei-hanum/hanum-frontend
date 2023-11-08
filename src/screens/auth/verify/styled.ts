import { TextInput } from 'react-native';

import styled from '@emotion/native';

import { RPW } from 'src/utils';
import { colors } from 'src/styles';

export const StudentVerifyInput = styled(TextInput)`
  width: ${`${RPW(11.5)}px`};
  height: 68px;
  padding: 0px 16px;
  border-radius: 12px;
  font-size: 20px;
  background-color: ${colors.codeInput};
`;

export const StudentVerifyTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
