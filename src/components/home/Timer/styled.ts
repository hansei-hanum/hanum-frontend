import styled from '@emotion/native';

export const TimerTextWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ScreenTimerContainer = styled(TimerTextWrapper)`
  width: 80%;
  justify-content: space-between;
  flex-direction: row;
  height: 70px;
`;

export const ScreenTimerLine = styled.View`
  width: 1px;
  height: 100%;
  background-color: #efefef;
`;

export const TimerTextContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
  flex-direction: column;
  row-gap: 2px;
`;
