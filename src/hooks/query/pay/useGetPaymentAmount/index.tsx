import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, GetPaymentAmountResponse, getPaymentAmount } from 'src/api';

export const useGetPaymentAmount = (): UseQueryResult<
  APIResponse<GetPaymentAmountResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetPaymentAmount', getPaymentAmount, {
    onError: (error) => {
      console.log(error, 'error');
    },
    staleTime: Infinity,
    retry: 0,
  });
};
