import styled from '@emotion/native';

import { colors } from 'src/styles';

export const CalendarWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const CalendarHeaderContainer = styled.View`
  width: 100%;
  padding: 0 20px;
  padding-top: 26px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 16px;
`;

export const CalendarTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;

export const CalendarScheduleContainer = styled.ScrollView`
  padding: 0px 20px;
`;
