import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse } from 'src/api';
import { GetInfoResponse, getSchedule } from 'src/api/info';

export const useGetSchedule = (): UseQueryResult<
  APIResponse<GetInfoResponse[]>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetSchedule', getSchedule, {
    onError: (error) => {
      console.log(error, 'useGetSchedule error');
    },
    retry: 0,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
