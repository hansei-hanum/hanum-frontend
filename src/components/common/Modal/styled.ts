import styled from '@emotion/native';

export const ModalDummyContainer = styled.View`
  position: absolute;
  z-index: -9999;
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

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
