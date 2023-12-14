import styled from '@emotion/native';

import { fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const CommunityPostWrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.background};
  height: 100%;
  width: 100%;
  flex: 1;
`;

export const CommunityPostSection = styled.View`
  padding: 14px;
  row-gap: 24px;
`;

export const CommunityPostImageSection = styled.View`
  width: 100%;
  padding-left: 14px;
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
  border-radius: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.default};
  font-family: ${fonts.medium};
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

export const CommunityPostImageWrapper = styled.View`
  position: relative;
`;

export const CommunityPostImage = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 16px;
  border-color: ${({ theme }) => theme.secondary};
  border-width: 1px;
`;

export const CommunityPostImageIconWrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50px;
  margin: 6px;
  background-color: ${({ theme }) => theme.modalBg};
`;
