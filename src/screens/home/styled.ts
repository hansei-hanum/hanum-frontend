import { Platform } from 'react-native';

import styled from '@emotion/native';

export const HomeScreenWrapper = styled.View`
  flex: 1;
  background-color: #fefefe;
  width: 100%;
  padding: 50px 20px ${Platform.OS == 'ios' ? '30px' : '20px'} 20px;
`;

export const HomeScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #fefefe;
  row-gap: 40px;
`;

export const HomeScreenTopSection = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HomeScreenPayContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const HomeScreenPayButtonContainer = styled(HomeScreenTopSection)`
  margin-top: 20px;
`;

export const HomeScreenScheduleContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 30px;
`;

export const HomeScreenScheduleTextWrapper = styled(HomeScreenScheduleContainer)`
  width: 80%;
  justify-content: space-between;
  flex-direction: row;
  height: 100px;
`;

export const HomeScreenScheduleLine = styled.View`
  width: 1px;
  height: 100%;
  background-color: #efefef;
`;
