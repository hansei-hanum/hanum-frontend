import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const CommunityBottomSheetContainer = styled.View`
  row-gap: 30px;
  padding: 20px;
  flex: 1;
  z-index: 9999;
`;

export const CommunityBottomSheetListContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CommunityBottomSheetList = styled(CommunityBottomSheetListContainer)`
  column-gap: 10px;
  justify-content: center;
`;

export const CommunityBottomSheetReportInput = styled.TextInput`
  height: 100px;
  border-color: ${({ theme }) => theme.lightGray};
  border-width: 0.6px;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.default};
`;
