import { Animated, KeyboardAvoidingView } from 'react-native';

import styled from '@emotion/native';

import { fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const CreatePostContainer = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const CreatePostInnerContainer = styled(KeyboardAvoidingView)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex: 1;
`;

export const CreatePostMainSection = styled.View`
  padding: 14px;
  row-gap: 24px;
  flex-grow: 1;
`;

export const CreatePostImageSection = styled.View`
  width: 100%;
  padding-left: 14px;
`;

export const CreatePostHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  padding-top: ${isIos ? 0 : '14px'};
  z-index: 9999;
`;

export const UserSectionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;

export const UserSectionImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const VisibleTypeContainer = styled.View`
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

export const CreatePostTextInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.default};
  font-family: ${fonts.medium};
  flex: 1;
`;

export const CreatePostIconContainer = styled(Animated.View)`
  width: 100%;
  border-top-color: ${({ theme }) => theme.secondary};
  border-top-width: 1px;
  padding: 14px;
  padding-bottom: ${isIos ? 0 : '14px'};
  flex-direction: row;
  justify-content: space-between;
`;
