import { View } from 'react-native';
import { Animated, KeyboardAvoidingView, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styled from '@emotion/native';

import { isIos } from 'src/utils';

export const CommunityChatWrapper = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const CommunityUserImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
`;

export const BottomInputWrapper = styled.View`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.lightGray};
`;

export const BottomInputContainer = styled(isIos ? KeyboardAvoidingView : View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

export const BottomSendInputSection = styled.View`
  column-gap: 10px;
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  width: 100%;
  padding: ${isIos ? '10px' : '14px'} 10px;
  z-index: 99;
`;

export const BottomSendInputContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.lightGray};
  flex-direction: row;
  column-gap: 10px;
  padding: 0;
  border-radius: 40px;
  padding: 0 10px;
`;

export const BottomSendInput = styled(TextInput)`
  flex: 1;
  padding: ${isIos ? '12px' : '8px'} 0;
  font-size: 15px;
  background-color: transparent;
  color: ${({ theme }) => theme.default};
`;

export const BottomInputReplyBox = styled(Animated.View)`
  width: 100%;
  padding: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.background};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.lightGray};
`;

export const AnonymousBox = styled(BottomInputReplyBox)`
  border-bottom-width: 0px;
  border-top-width: 1px;
  justify-content: center;
  column-gap: 10px;
  padding-bottom: 4px;
`;

export const ModalDummyContainer = styled.View`
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
