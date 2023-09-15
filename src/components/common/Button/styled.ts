import styled from '@emotion/native';

import { colors, fonts } from 'src/styles';

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.bold};
  color: ${colors.white};
  text-align: center;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
