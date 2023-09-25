import styled from '@emotion/native';

import { colors } from 'src/styles';

export const EoullimVoteWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const EoullimVoteContainer = styled.View`
  flex: 1;
  padding: 20px;
  row-gap: 20px;
`;

export const EoullimVoteStatusContainer = styled.View`
  padding: 8px;
  border-radius: 20px;
  max-width: 120px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
  background-color: ${colors.lightGray};
`;

export const EoullimVoteStatusCircle = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 20px;
  background-color: ${colors.green};
`;
