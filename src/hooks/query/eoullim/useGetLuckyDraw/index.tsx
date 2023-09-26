import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  EoullimLuckyDrawResponse,
  eoullimGetLuckyDraw,
} from 'src/api';

export const useGetLuckyDraw = (): UseQueryResult<
  APIResponse<EoullimLuckyDrawResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useGetLuckyDraw', eoullimGetLuckyDraw, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
