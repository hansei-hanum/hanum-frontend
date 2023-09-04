import styled from '@emotion/native';

import { colors } from 'src/styles';
import { iosCheckHeight } from 'src/utils';

export const UserInfoWrapper = styled.View`
  flex: 1;
  padding: ${iosCheckHeight ? '70px' : '40px'} 20px 34px 20px;
  background-color: ${colors.background};
`;

export const UserInfoContainer = styled.View`
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
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
