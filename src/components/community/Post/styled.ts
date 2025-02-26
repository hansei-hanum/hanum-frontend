import styled from '@emotion/native';

export const CommunityPostContainer = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  row-gap: 14px;
  width: 100%;
`;

export const CommunityPostContentWrapper = styled.View`
  width: 100%;
  padding: 0 18px;
`;

export const CommunityPostImageWrapper = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  align-items: center;
  justify-content: center;
`;
