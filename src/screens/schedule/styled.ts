import styled from '@emotion/native';

import { colors } from 'src/styles';

export const ScheduleScreenContainer = styled.View`
  flex: 1;
  padding: 80px 20px 20px 20px;
  background: ${colors.background};
`;

export const ScheduleScreenHeader = styled.View`
  flex-direction: column;
  row-gap: 16px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ScheduleScreenIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;
