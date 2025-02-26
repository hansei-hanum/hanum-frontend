import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  EoullimVoteResponse,
  EoullimVoteValue,
  eoullimVote,
} from 'src/api';

import { useGetVote } from '../useGetVote';

export const useVote = (): UseMutationResult<
  APIResponse<EoullimVoteResponse>,
  AxiosError<APIErrorResponse>,
  EoullimVoteValue
> => {
  const getVote = useGetVote();
  return useMutation('useVote', eoullimVote, {
    onSuccess: () => {
      getVote.refetch();
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
