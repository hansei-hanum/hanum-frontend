import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, GetLunchMenusResponse } from 'src/api';
import { GetLunchMenusValue, getMealTable } from 'src/api';

export const useGetMealTable = ({
  month,
}: GetLunchMenusValue): UseQueryResult<
  APIResponse<GetLunchMenusResponse[]>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetMealTable', () => getMealTable({ month }), {
    onError: (error) => {
      console.log(error.response, 'useGetMealTable error');
    },
    retry: 0,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
