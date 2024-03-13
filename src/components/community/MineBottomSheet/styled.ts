import styled from '@emotion/native';

export const CommunityMineBottomSheetContainer = styled.View`
  row-gap: 30px;
  padding: 14px;
  z-index: 9999;
`;

export const CommunityMineOptionContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

export const CommunityMainOptionIconContainer = styled(CommunityMineOptionContainer)`
  column-gap: 10px;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;
