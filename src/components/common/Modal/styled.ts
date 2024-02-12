import styled from '@emotion/native';

export const ModalWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 90%;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.modalBg};
  padding: 14px;
  row-gap: 20px;
`;
