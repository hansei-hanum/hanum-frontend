import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, FetchUserResponse, fetchUser } from 'src/api';

export const useFetchUser = (): UseQueryResult<
  APIResponse<FetchUserResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useFetchUser', fetchUser, {
    onError: (error) => {
      console.log(error, 'error');
    },
    staleTime: Infinity,
    retry: 0,
  });
};
