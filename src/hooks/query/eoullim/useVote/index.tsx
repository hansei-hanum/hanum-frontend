import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  EoullimVoteResponse,
  EoullimVoteValue,
  eoullimVote,
} from 'src/api';

export const useVote = (): UseMutationResult<
  APIResponse<EoullimVoteResponse>,
  AxiosError<APIErrorResponse>,
  EoullimVoteValue
> => {
  return useMutation('useVote', eoullimVote, {
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
