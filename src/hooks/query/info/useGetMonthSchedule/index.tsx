import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse } from 'src/api';
import { GetMonthScheduleValue, GetInfoResponse, getMonthSchedule } from 'src/api/info';

export const useGetMonthSchedule = ({
  month,
}: GetMonthScheduleValue): UseQueryResult<
  APIResponse<GetInfoResponse[]>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('schedule', () => getMonthSchedule({ month }), {
    onError: (error) => {
      console.log(error, 'error');
    },
    retry: 0,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
