import styled from '@emotion/native';

export const TimerTextWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ScreenTimerContainer = styled(TimerTextWrapper)`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  height: 70px;
  padding: 0 4px;
`;

export const ScreenTimeLineWrapper = styled.View`
  flex-grow: 1;
  align-items: center;
  height: 100%;
`;

export const ScreenTimerLine = styled.View`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => theme.secondary};
`;

export const TimerTextContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-direction: column;
  flex-grow: 1;
  row-gap: 2px;
`;
