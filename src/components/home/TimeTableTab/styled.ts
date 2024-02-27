import styled from '@emotion/native';

interface TimeTableTextContainerProps {
  padding?: string
}

export const TimeTableTextWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 0 4px;
`;

export const SecondText = styled.View`
  flex-direction: row;
  align-items: flex-start;
  flex: 1;
`;

export const ScreenTimeleLine = styled.View`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => theme.secondary};
`;

export const TimeTableTextContainer = styled.View<TimeTableTextContainerProps>`
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: ${(props)=>props.padding};
  gap: 2px;
  flex: 1;
`;
