import styled from '@emotion/native';

import { colors } from 'src/styles';

export const ScheduleScreenContainer = styled.View`
  flex: 1;
  padding: 70px 0px 0px 0px;
  background: ${colors.background};
  row-gap: 10px;
`;

export const ScheduleScreenHeader = styled.View`
  padding-left: 20px;
  flex-direction: column;
  row-gap: 20px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ScheduleScreenIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;

export const ScheduleScreenTimeContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 6px;
`;

export const ScheduleScreenTime = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 23px;
  width: 70px;
  height: 50px;
`;
