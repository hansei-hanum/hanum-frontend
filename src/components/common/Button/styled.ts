import styled from '@emotion/native';

import { colors, fonts } from 'src/styles';

export const ButtonElement = styled.TouchableOpacity`
  width: 100%;
  color: ${colors.white};
  padding: 14px 0;
  z-index: 999;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.bold};
  color: ${colors.white};
  text-align: center;
`;
