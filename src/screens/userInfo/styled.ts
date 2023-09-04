import styled from '@emotion/native';

import { colors } from 'src/styles';
import { iosCheckHeight } from 'src/utils';

export const UserInfoContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: ${iosCheckHeight ? '70px' : '40px'} 20px 20px 20px;
`;

export const UserInfoProfile = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  margin-top: 20px;
`;

export const UserInfoProfileImage = styled.Image`
  border-radius: 100px;
  width: 100px;
  height: 100px;
`;
