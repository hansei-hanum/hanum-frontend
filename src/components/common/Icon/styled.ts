import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const IconWrapper = styled.View<{ backgroundColor?: string }>`
  padding: 4px;
  border-radius: 10px;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.lightGray};
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.Text`
  font-size: 30px;
  font-family: ${fonts.tossIcon};
  color: ${({ theme }) => theme.black};
  padding-bottom: 0;
  margin-bottom: 0;
`;
