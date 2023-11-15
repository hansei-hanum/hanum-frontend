import styled from '@emotion/native';

export const ScheduleScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.background};
`;

export const ScheduleScreenContainer = styled.View`
  flex: 1;
`;

export const ScheduleScreenHeader = styled.View`
  padding-left: 20px;
  flex-direction: column;
  row-gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 40px;
`;

export const ScheduleScreenIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;
