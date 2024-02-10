import styled from '@emotion/native';

export const WeekDayList = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.lightGray};
  padding: 10px;
  padding-top: 40px;
`;

export const WeekDayItem = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-right: 6px;
`;
