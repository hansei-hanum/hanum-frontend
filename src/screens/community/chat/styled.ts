import { KeyboardAvoidingView, TextInput, View } from 'react-native';

import styled from '@emotion/native';

import { isIos } from 'src/utils';

export const CommunityChatWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const CommunityChatContainer = styled.View`
  flex: 1;
  padding-top: 4px;
  row-gap: 24px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const CommunityChatImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
`;

export const CommunityChatBottomContainer = styled(isIos ? KeyboardAvoidingView : View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${isIos ? '10px' : '14px'} 10px;
  column-gap: 10px;
  background-color: ${({ theme }) => theme.background};
  z-index: 999;
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

export const CommunityChatInput = styled(TextInput)`
  flex: 1;
  padding: ${isIos ? '12px' : '8px'} 0;
  font-size: 15px;
  background-color: transparent;
  color: ${({ theme }) => theme.default};
`;

export const CommunityChatImageWrapper = styled.View`
  flex: 1;
  padding: 10px 10px;
`;

export const CommunityReplyContainer = styled.View`
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;