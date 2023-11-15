import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse } from 'src/api';
import { GetInfoResponse, getTimeTable } from 'src/api/info';

export const useGetTimeTable = (): UseQueryResult<
  APIResponse<GetInfoResponse[]>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetTimeTable', getTimeTable, {
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
