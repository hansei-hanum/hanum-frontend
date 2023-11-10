import styled from '@emotion/native';

export const ScheduleScreenDayContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.lightGray};
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`;

export const ScheduleScreenDay = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-right: 6px;
`;
