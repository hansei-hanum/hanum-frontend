import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse } from 'src/api';
import { GetMealValue, GetInfoResponse, getMeal } from 'src/api';

export const useGetMeal = ({
  month,
}: GetMealValue): UseQueryResult<APIResponse<GetInfoResponse[]>, AxiosError<APIErrorResponse>> => {
  return useQuery('useGetMeal', () => getMeal({ month }), {
    onError: (error) => {
      console.log(error, 'error');
    },
    retry: 0,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
