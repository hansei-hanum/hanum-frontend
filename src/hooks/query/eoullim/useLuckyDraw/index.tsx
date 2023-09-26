import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, EoullimLuckyDrawValue, eoullimLuckyDraw } from 'src/api';

export const useGetLuckyDraw = (): UseMutationResult<
  APIResponse<string>,
  AxiosError<APIErrorResponse>,
  EoullimLuckyDrawValue
> => {
  return useMutation('useGetLuckyDraw', eoullimLuckyDraw, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
