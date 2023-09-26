import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, EoullimVoteResponse, eoullimGetVote } from 'src/api';

export const useGetVote = (): UseQueryResult<
  APIResponse<EoullimVoteResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetVote', eoullimGetVote, {
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
