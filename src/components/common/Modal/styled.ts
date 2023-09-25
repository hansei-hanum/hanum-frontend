import styled from '@emotion/native';

import { colors } from 'src/styles';

export const ModalDummyContainer = styled.View`
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

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
