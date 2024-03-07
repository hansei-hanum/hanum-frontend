import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styled from '@emotion/native';

import { isAndroid, isIos } from 'src/utils';

export const PostDetailContainer = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const PostDetailInnerContainer = styled(isIos ? KeyboardAvoidingView : View)`
  flex: 1;
  width: 100%;
`;

export const PostDetailBottomSection = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  padding-bottom: ${isAndroid ? `12px` : `0px`};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.lightGray};
`;

export const PostDetailCommentContainer = styled.View`
  column-gap: 10px;
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  width: 100%;
  z-index: 99;
  padding-top: 10px;
`;

export const PostDetailCommentIconContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.lightGray};
  flex-direction: row;
  column-gap: 10px;
  padding: 0 10px;
`;

export const PostDetailCommentInput = styled(TextInput)`
  flex: 1;
  padding: ${isIos ? '12px' : '8px'} 0;
  font-size: 15px;
  background-color: transparent;
  color: ${({ theme }) => theme.default};
`;
