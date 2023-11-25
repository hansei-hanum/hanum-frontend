import styled from '@emotion/native';

export const CommunityMainBox = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  row-gap: 14px;
  width: 100%;
`;

export const CommunityMainBoxHeaderContainer = styled.View`
  width: 100%;
  padding: 0 20px;
  row-gap: 12px;
`;

export const CommunityMainBoxHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  padding-top: 20px;
`;

export const CommunityMainBoxHeaderTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

export const CommunityMainBoxUserProfile = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

export const CommunityMainContentWrapper = styled.View`
  width: 100%;
  padding: 0 20px;
`;

export const CommunityMainImageCardWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CommunityImage = styled.Image`
  border-radius: 100px;
  width: 44px;
  height: 44px;
  border-color: ${({ theme }) => theme.lightGray};
  border-width: 1px;
`;
