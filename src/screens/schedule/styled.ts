import styled from '@emotion/native';

import { colors } from 'src/styles';
import { iosCheckHeight, isAndroid } from 'src/utils';

export const ScheduleScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background: ${colors.background};
`;

export const ScheduleScreenContainer = styled.View`
  flex: 1;
  padding-top: ${iosCheckHeight ? '10px' : isAndroid ? '20px' : '26px'};
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

export const ScheduleScreenTimeContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding-right: 10px;
`;
