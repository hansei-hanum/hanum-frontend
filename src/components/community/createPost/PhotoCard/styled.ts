import styled from '@emotion/native';

export const PhotoCardContainer = styled.View`
  position: relative;
`;

export const PhotoCardImage = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 16px;
`;

export const PhotoCardIconWrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50px;
  margin: 6px;
  background-color: ${({ theme }) => theme.modalBg};
`;
