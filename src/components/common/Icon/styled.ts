import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const IconWrapper = styled.View<{ backgroundColor?: string }>`
  padding: 2px;
  border-radius: 10px;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.lightGray};
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding-bottom: 0px;
`;

export const Icon = styled.Text`
  font-size: 26px;
  font-family: ${fonts.tossIcon};
  color: ${({ theme }) => theme.black};
  padding: 0;
  margin: 0;
`;
