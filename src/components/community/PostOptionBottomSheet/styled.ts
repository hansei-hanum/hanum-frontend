import styled from '@emotion/native';

export const PostOptionBottomSheetContainer = styled.View`
  row-gap: 30px;
  padding: 14px;
  flex: 1;
  z-index: 9999;
`;

export const PostOptionBottomSheetOptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PostOptionBottomSheetIconContainer = styled(PostOptionBottomSheetOptionContainer)`
  column-gap: 10px;
  justify-content: center;
`;
