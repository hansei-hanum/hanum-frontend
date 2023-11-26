import { KeyboardAvoidingView, View } from 'react-native';

import styled from '@emotion/native';

import { fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const CommunityChatWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const CommunityChatContainer = styled.View`
  padding-top: 4px;
  padding: 0 10px;
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

export const CommunityChatImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
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

export const CommunityChatBottomContainer = styled(isIos ? KeyboardAvoidingView : View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${isIos ? '10px' : '14px'} 10px;
  column-gap: 10px;
`;

export const CommunityChatInputContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.lightGray};
  flex-direction: row;
  column-gap: 10px;
  padding: 0;
  border-radius: 40px;
  padding: 0 10px;
`;

export const CommunityChatInput = styled.TextInput`
  flex: 1;
  padding: ${isIos ? '12px' : '8px'} 0;
  font-size: 15px;
  background-color: transparent;
`;
