import React, { useState } from 'react';

import { EoullimHeader, Text } from 'src/components';

import * as S from './styled';

export const EoullimVote: React.FC = () => {
  const [isProceeding, setIsProceeding] = useState<boolean>(true);
  return (
    <S.EoullimVoteWrapper>
      <S.EoullimVoteContainer>
        <EoullimHeader />
        <S.EoullimVoteStatusContainer>
          <S.EoullimVoteStatusCircle />
          <Text size={15} fontFamily="bold">
            투표 진행 중
          </Text>
        </S.EoullimVoteStatusContainer>
      </S.EoullimVoteContainer>
    </S.EoullimVoteWrapper>
  );
};
