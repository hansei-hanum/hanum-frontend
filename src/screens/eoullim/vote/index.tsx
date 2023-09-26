import React, { useEffect } from 'react';

import { ActivityIndicator } from '@react-native-material/core';
import { useIsFocused } from '@react-navigation/native';

import { EoullimVote, VoteModal } from 'src/components';
import { colors } from 'src/styles';
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
    return (
      <ActivityIndicator
        size={40}
        color={colors.placeholder}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />
    );
  } else if (!getVote.isLoading && getVoteData) {
    return <EoullimVote getVoteData={getVoteData} getVote={getVote} />;
  } else if (!getVoteData) {
    return <VoteModal getVoteData={getVoteData} />;
  } else {
    return null;
  }
};
