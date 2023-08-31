import { Platform } from 'react-native';

import styled from '@emotion/native';

import { colors, fonts } from 'src/styles';

export const ButtonElement = styled.TouchableOpacity<{
  isSecondary?: boolean;
  isDisabled?: boolean;
  isModalBtn?: boolean;
}>`
  width: 100%;
  border-radius: ${({ isModalBtn }) => (isModalBtn ? '16px' : '10px')};
  background-color: ${({ isSecondary, isDisabled }) =>
    isSecondary || isDisabled ? colors.secondary : colors.primary};
  color: ${colors.white};
  padding: 14px 0;
`;

export const ButtonText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? '16px' : '14px'};
  font-family: ${fonts.bold};
  color: ${colors.white};
  text-align: center;
`;
