import React, { useEffect } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { EoullimVote, Spinner, VoteModal } from 'src/components';
import { useGetVote } from 'src/hooks/query/eoullim';

export const EoullimVoteScreen: React.FC = () => {
  const getVote = useGetVote();
  const getVoteData = !getVote.isLoading && getVote?.data?.data;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getVote.refetch();
    }
  }, [isFocused]);

  if (getVote.isLoading) {
    return <Spinner size={40} isCenter />;
  } else if (!getVote.isLoading && getVoteData) {
    return <EoullimVote getVoteData={getVoteData} getVote={getVote} />;
  } else if (!getVoteData) {
    return <VoteModal getVoteData={getVoteData} />;
  } else {
    return null;
  }
};
