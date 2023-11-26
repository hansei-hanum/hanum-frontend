import styled from '@emotion/native';

export const CommunityHeader = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

export const CommunityHeaderTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
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
  border-color: ${({ theme }) => theme.lightGray};
  border-width: 1px;
`;
