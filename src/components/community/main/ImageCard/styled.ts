import styled from '@emotion/native';

export const ImageCardContainer = styled.View`
  row-gap: 4px;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`;

export const ImageCardWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const ImageCardImage = styled.Image<{ count: number }>`
  width: ${({ count }) => (count === 1 ? '100%' : '48%')};
  border-radius: 16px;
  border-color: red;
  border-width: 1px;
`;
