import styled from '@emotion/native';

export const CommunityChatWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const CommunityChatContainer = styled.View`
  flex: 1;
  row-gap: 24px;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
export const CommunityReplyContainer = styled.View`
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

export const CommunityMentionContainer = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const CommunityUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
  justify-content: center;
`;

export const CommunityUserImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
`;
