import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';
import moment from 'moment';

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
  const krDate = moment().tz('Asia/Seoul');
  const { data, isLoading } = useGetMeal({ month: `${krDate.month() + 1}` });

  return {
    isLoading,
    meal: data?.data,
  };
};
