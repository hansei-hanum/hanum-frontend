import styled from '@emotion/native';

import { colors } from 'src/styles';

export const EoullimVote = styled.View`
  padding: 14px 10px;
  border-radius: 14px;
  background-color: ${colors.vote.background};
  border-width: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const EoullimVoteTextWrapper = styled.View`
  flex: 0.8;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const EoullimVoteButtonWrapper = styled.View`
  position: absolute;
  right: 0;
  flex: 0.2;
  padding-right: 10px;
`;
