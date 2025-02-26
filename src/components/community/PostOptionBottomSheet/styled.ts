import { Image } from 'react-native';

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

export const UserInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
`;

export const UserInfoAuthorContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 4px;
`;

export const UserInfoVerificationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

export const UserInfoImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
