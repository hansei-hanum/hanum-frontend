import { Platform } from 'react-native';

import styled from '@emotion/native';

export const HomeScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #fefefe;
  row-gap: 40px;
  padding: 50px 20px ${Platform.OS == 'ios' ? '30px' : '20px'} 20px;
`;

export const HomeScreenTopSection = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
