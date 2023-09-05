import styled from '@emotion/native';
import { ContentBox } from 'src/components/common/ContentBox';

import { colors } from 'src/styles';
import { iosCheckHeight } from 'src/utils';

export const CalendarWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const CalendarHeaderContainer = styled.View`
  width: 100%;
  padding: 0 20px;
  padding-top: ${iosCheckHeight ? '10px' : '26px'};
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

`;
