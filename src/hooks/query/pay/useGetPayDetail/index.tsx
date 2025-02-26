import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, getPaymentDetail, GetPaymentDetailResponse } from 'src/api';

export const useGetPaymentDetail = (): UseQueryResult<
  APIResponse<GetPaymentDetailResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetPaymentDetail', getPaymentDetail, {
    onError: (error) => {
      console.log(error, 'error');
    },
    staleTime: 1000 * 10,
    retry: 0,
  });
};
