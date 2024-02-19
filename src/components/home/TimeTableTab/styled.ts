import styled from '@emotion/native';

export const TimeTableTapTextWrapper = styled.View`
  width: 100%;  
  justify-content: center;
  align-items: center;  
  flex-direction: column;
  gap: 10px;
  padding: 0 4px;
`

export const SecondText = styled.View`
  flex-direction: row;
  align-items: flex-start
  flex: 1;
`;   

export const ScreenTimeTableTapLine = styled.View`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => theme.secondary};
`;

export const TimeTableTabTextContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 10px 0;
  flex: 1;
`;

