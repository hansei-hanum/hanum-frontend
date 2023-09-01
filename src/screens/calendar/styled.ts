import { Calendar } from 'react-native-calendars';

import styled from '@emotion/native';

import { colors } from 'src/styles';

export const CalendarWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const CalendarContainer = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 20px;
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

export const CalendarElement = styled(Calendar)`
  width: 100%;
  border: 1px solid red;
`;
