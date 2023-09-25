import styled from '@emotion/native';

import { colors } from 'src/styles';

export const EoullimVoteWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const EoullimVoteContainer = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: 0px;
  row-gap: 24px;
`;

export const EoullimVoteHeader = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  row-gap: 12px;
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

export const EoullimVoteTimeContainer = styled.View`
  flex: 0.6;
  justify-content: center;
  align-items: center;
`;

export const EoullimVoteList = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 6px;
`;
