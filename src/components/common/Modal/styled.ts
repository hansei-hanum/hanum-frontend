import styled from '@emotion/native';

import { colors } from 'src/styles';

export const ModalWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 90%;
  border-radius: 16px;
  background-color: ${colors.white};
  padding: 14px;
  row-gap: 20px;
`;
