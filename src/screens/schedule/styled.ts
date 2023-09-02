import { Platform } from 'react-native';

import styled from '@emotion/native';

import { colors } from 'src/styles';
import { checkHeight, iosCheckHeight } from 'src/utils';

export const ScheduleScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background: ${colors.background};
`;

export const ScheduleScreenContainer = styled.View`
  flex: 1;
  padding-top: ${iosCheckHeight ? '10px' : '26px'};
  padding-bottom: 20px;
  row-gap: 10px;
`;

export const ScheduleScreenHeader = styled.View`
  padding-left: 20px;
  flex-direction: column;
  row-gap: 10px;
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
