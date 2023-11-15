import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, GetMealResponse } from 'src/api';
import { GetMealValue, getMeal } from 'src/api';

export const useGetMeal = ({
  month,
}: GetMealValue): UseQueryResult<APIResponse<GetMealResponse[]>, AxiosError<APIErrorResponse>> => {
  return useQuery('useGetMeal', () => getMeal({ month }), {
    onError: (error) => {
      console.log(error, 'error');
    },
    retry: 0,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetMealData = () => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const krDate = new Date(utc + KR_TIME_DIFF);
  const { data, isLoading } = useGetMeal({ month: `${krDate.getMonth() + 1}` });

  return {
    krDate,
    isLoading,
    meal: data?.data,
  };
};
