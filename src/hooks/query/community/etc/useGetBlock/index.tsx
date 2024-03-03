import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, getBlockList, getBlockListResponse } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useGetBlockList = (): UseQueryResult<
  APIResponse<getBlockListResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetBlockList', getBlockList, {
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
