import styled from '@emotion/native';

export const TimerTextWrapper = styled.SafeAreaView`
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

export const ScreenTimerLine = styled.SafeAreaView`
  width: 1px;
  height: 100%;
  background-color: #efefef;
`;

export const TimerTextContainer = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
  flex-direction: column;
  row-gap: 2px;
`;
