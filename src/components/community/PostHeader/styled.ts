import styled from '@emotion/native';

export const CommunityHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CommunityHeaderTitle = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 10px;
  flex-grow: 0.1;
`;

export const CommunityHeaderUserSection = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

export const CommunityHeaderUserImg = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
`;

export const AuthorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;
