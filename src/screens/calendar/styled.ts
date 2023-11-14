import styled from '@emotion/native';

export const CalendarWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const CalendarTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
  margin-top: 10px;
`;

export const CalendarScheduleContainer = styled.ScrollView``;
