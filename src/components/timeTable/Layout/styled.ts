import styled from '@emotion/native';

export const TimeTableContainer = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.background};
`;

export const TimeTableIconContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;
