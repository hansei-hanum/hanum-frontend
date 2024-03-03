import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, getBlock, getBlockResponse } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useGetBlock = (): UseQueryResult<
  APIResponse<getBlockResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetBlock', getBlock, {
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
