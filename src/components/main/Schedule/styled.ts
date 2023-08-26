import styled from '@emotion/native';

export const ScheduleTextWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ScreenScheduleContainer = styled(ScheduleTextWrapper)`
  width: 80%;
  justify-content: space-between;
  flex-direction: row;
  height: 80px;
`;

export const ScreenScheduleLine = styled.View`
  width: 1px;
  height: 100%;
  background-color: #efefef;
`;

export const SScheduleTextContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
  flex-direction: column;
  row-gap: 6px;
`;
