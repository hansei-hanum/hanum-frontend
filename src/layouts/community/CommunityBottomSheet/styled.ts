import styled from '@emotion/native';

export const CommunityBottomSheetContainer = styled.View`
  row-gap: 30px;
  padding: 20px;
  justify-content: center;
  flex: 1;
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
