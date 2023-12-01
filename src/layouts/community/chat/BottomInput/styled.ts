import { Animated, KeyboardAvoidingView, TextInput, View } from 'react-native';

import styled from '@emotion/native';

import { isIos } from 'src/utils';

export const CommunityChatBottom = styled(isIos ? KeyboardAvoidingView : View)`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`;

export const CommunityChatBottomContainer = styled(isIos ? KeyboardAvoidingView : View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

export const CommunityChatBottomWrapper = styled.View`
  column-gap: 10px;
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  width: 100%;
  padding: ${isIos ? '10px' : '14px'} 10px;
  z-index: 99;
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

export const CommunityChatReplyContainer = styled(Animated.View)`
  width: 100%;
  padding: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.lightGray};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.lightGray};
`;
