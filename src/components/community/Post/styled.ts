import styled from '@emotion/native';

export const CommunityPostContainer = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  row-gap: 14px;
  width: 100%;
`;

export const CommunityPostHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

export const CommunityPostHeaderTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

export const CommunityPostUserProfile = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

export const CommunityPostContentWrapper = styled.View`
  width: 100%;
  padding: 0 10px;
`;

export const CommunityPostImageWrapper = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  align-items: center;
  justify-content: center;
`;

export const CommunityPostImage = styled.Image`
  border-radius: 100px;
  width: 44px;
  height: 44px;
  border-color: ${({ theme }) => theme.lightGray};
  border-width: 1px;
`;
