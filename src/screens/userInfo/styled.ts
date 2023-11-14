import styled from '@emotion/native';

import { iosCheckHeight, isAndroid } from 'src/utils';

export const UserInfoWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const UserInfoContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
  padding-bottom: ${isAndroid ? '10px' : iosCheckHeight ? '34px' : '10px'};
`;

export const UserInfoProfileContainer = styled.View`
  flex-direction: column;
`;

export const UserInfoProfile = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  margin-top: ${iosCheckHeight ? '20px' : '5px'};
`;

export const UserInfoProfileImage = styled.Image`
  border-radius: 100px;
  width: 100px;
  height: 100px;
`;

export const UserInfoButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 14px;
`;
