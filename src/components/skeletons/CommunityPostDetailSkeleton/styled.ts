import styled from '@emotion/native';

export const PostDetailSkeletonHeaderContainer = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PostDetailSkeletonHeaderInnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;

export const PostDetailContentSkeletonContainer = styled.View`
  flex-direction: column;
  padding: 20px 0;
  width: 100%;
  row-gap: 14px;
  flex: 1;
  padding: 14px;
`;

export const PostDetailContentSkeletonInnerContainer = styled.View`
  row-gap: 20px;
  margin: 20px 0;
`;
