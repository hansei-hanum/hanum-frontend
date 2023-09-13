import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, getPayDetail, GetPayDetailResponse } from 'src/api';

export const useGetPayDetail = (): UseQueryResult<
  APIResponse<GetPayDetailResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetPayDetail', getPayDetail, {
    onError: (error) => {
      console.log(error);
    },
    staleTime: Infinity,
    retry: 0,
  });
};
