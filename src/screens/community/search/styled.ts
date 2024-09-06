import styled from '@emotion/native';

import { fonts } from 'src/styles';
import { isIos } from 'src/utils';

export const CommunitySearchContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const CommunitySearchHeaderWrapper = styled.View`
  width: 100%;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  padding: 10px;
  align-items: center;
  column-gap: 10px;
`;

export const CommunitySearchHeaderContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${isIos ? '12px' : '0px'} 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.secondary};
`;

export const CommunitySearchBar = styled.TextInput`
  font-size: 16px;
  font-family: ${fonts.regular};
  flex-grow: 1;
  color: ${({ theme }) => theme.default};
`;
