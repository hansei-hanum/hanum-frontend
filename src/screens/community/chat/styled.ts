import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const CommunityChatWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const CommunityChatContainer = styled.View`
  padding-top: 4px;
  padding: 0 20px;
  row-gap: 24px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const CommunityChatContent = styled.View`
  flex-direction: row;
  column-gap: 6px;
  width: 100%;
`;

export const CommunityPostImage = styled.Image`
  border-radius: 100px;
  width: 44px;
  height: 44px;
  border-color: ${({ theme }) => theme.lightGray};
  border-width: 1px;
`;

export const CommunityChatUser = styled.View`
  flex-direction: row;
`;

export const CommunityChatBox = styled.View`
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.lightGray};
`;

export const ChatContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
`;

export const Chat = styled.Text`
  font-size: 15px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.default};
`;
