import styled from '@emotion/native';

import { isIos } from 'src/utils';

export const EoullimVoteWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const EoullimVoteContainer = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: ${isIos ? '0px' : '20px'};
  padding-bottom: 0px;
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
  background-color: ${({ theme }) => theme.lightGray};
`;

export const EoullimVoteStatusCircle = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.green};
`;

export const EoullimVoteTimeContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const EoullimVoteList = styled.ScrollView`
  flex-direction: column;
`;
