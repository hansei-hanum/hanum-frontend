import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const CommunityChatContent = styled.View`
  flex-direction: row;
  column-gap: 6px;
  width: 100%;
`;

export const CommunityChatImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
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
