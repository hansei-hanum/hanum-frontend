import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, getBlockList, getBlockListResponse } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useGetBlockList = (): UseInfiniteQueryResult<
  APIResponse<getBlockListResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useInfiniteQuery(
    'useGetBlockList',
    ({ pageParam = null }) => getBlockList({ cursor: pageParam }),
    {
      onError: (error) => {
        const message = error.response?.data.message;
        ErrorToast(message);
      },
    },
  );
};
