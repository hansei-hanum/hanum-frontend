import styled from '@emotion/native';

import { colors } from 'src/styles';
import { iosCheckHeight } from 'src/utils';

export const UserInfoContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: ${iosCheckHeight ? '70px' : '40px'} 20px 20px 20px;
`;
