import styled from '@emotion/native';

export const BackDropElement = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backDrop};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9998;
`;
