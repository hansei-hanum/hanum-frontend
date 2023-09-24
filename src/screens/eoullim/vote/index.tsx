import React from 'react';

import { Text } from 'src/components';

import * as S from './styled';

export const EoullimVote: React.FC = () => {
  return (
    <S.EoullimVoteWrapper>
      <S.EoullimVoteContainer>
        <Text size={18} fontFamily="bold">
          투표
        </Text>
      </S.EoullimVoteContainer>
    </S.EoullimVoteWrapper>
  );
};
