import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse } from 'src/api';
import { GetScheduleResponse, getSchedule } from 'src/api/info';

export const useGetSchedule = (): UseQueryResult<
  APIResponse<GetScheduleResponse[]>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('schedule', getSchedule, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
