import styled from '@emotion/native';

export const CommunityChatWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const CommunityChatContainer = styled.View`
  padding: 0 20px;
`;

export const CommunityPostImageWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CommunityMainBox = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  row-gap: 14px;
  width: 100%;
  border-top-color: ${({ theme }) => theme.lightGray};
  border-bottom-color: ${({ theme }) => theme.lightGray};
  border-top-width: 1px;
  border-bottom-width: 1px;
`;
