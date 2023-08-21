import styled from '@emotion/native';

import { colors, fonts } from '@hanum/styles';

export const ButtonElement = styled.TouchableOpacity<{ isSecondary?: boolean; isDisabled?: boolean }>`
  width: 95%;
  border-radius: 10px;
  background-color: ${({ isSecondary, isDisabled }) => isSecondary || isDisabled ? colors.secondary : colors.primary};
  color: ${colors.white};
  padding: 14px 0;
  /* transition: background-color 600ms linear; */
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.bold};
  color: ${colors.white};
  text-align: center;
`;
