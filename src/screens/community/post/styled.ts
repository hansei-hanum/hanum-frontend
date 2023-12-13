import styled from '@emotion/native';

import { fonts } from 'src/styles';
import { RPH, isIos } from 'src/utils';

export const CommunityPostWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const CommunityPostHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  padding-top: ${isIos ? 0 : '14px'};
  background-color: ${({ theme }) => theme.background};
  z-index: 9999;
`;

export const CommunityPostUserSection = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;

export const CommunityPostUserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const CommunityPostVisibleTypeWrapper = styled.View`
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

export const CommunityPostTextInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  height: ${`${RPH(26)}px`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.secondary};
  font-size: 16px;
  color: ${({ theme }) => theme.default};
  font-family: ${fonts.regular};
  text-align-vertical: top;
`;

export const CommunityBottomSheetListContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CommunityBottomSheetList = styled(CommunityBottomSheetListContainer)`
  width: auto;
  column-gap: 10px;
  justify-content: center;
`;

export const CommunityPostButtonWrapper = styled.View`
  width: 100%;
  padding: 14px;
  position: absolute;
  bottom: 0px;
  background-color: ${({ theme }) => theme.background};
`;
