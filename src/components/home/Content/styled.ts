import styled from '@emotion/native';

export const ContentContainer = styled.View`
  flex-direction: column;
`;

export const ContentTopSection = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ContentIconContainer = styled(ContentTopSection)`
  justify-content: auto;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 0;
`;
