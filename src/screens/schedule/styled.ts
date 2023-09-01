import styled from '@emotion/native';

import { colors } from 'src/styles';

export const ScheduleScreenContainer = styled.SafeAreaView`
  flex: 1;
  padding: 70px 0px 0px 0px;
  background: ${colors.background};
  row-gap: 10px;
`;

export const ScheduleScreenHeader = styled.SafeAreaView`
  padding-left: 20px;
  flex-direction: column;
  row-gap: 20px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ScheduleScreenIconContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;

export const ScheduleScreenTimeContainer = styled.SafeAreaView`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 6px;
`;
