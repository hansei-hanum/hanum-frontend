import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const AuthModalText = styled.Text<{ color?: string }>`
  font-size: 15px;
  font-family: ${fonts.medium};
  color: ${({ color, theme }) => color || theme.default};
`;
