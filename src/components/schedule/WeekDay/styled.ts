import styled from '@emotion/native';

import { colors } from 'src/styles';

export const ScheduleScreenDayContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: center;
  padding-bottom: 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGray};
  margin-top: 40px;
  padding-left: 20px;
`;

export const ScheduleScreenDay = styled.SafeAreaView`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-right: 16px;
`;
