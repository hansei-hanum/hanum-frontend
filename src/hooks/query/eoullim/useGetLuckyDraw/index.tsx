import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, eoullimGetLuckyDraw } from 'src/api';
import { luckyNumberState } from 'src/atoms/luckyNumber';

export const useGetLuckyDraw = (): UseQueryResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>
> => {
  const setLuckyNumber = useSetRecoilState(luckyNumberState);
  return useQuery('useGetLuckyDraw', eoullimGetLuckyDraw, {
    onSuccess: ({ data }) => {
      setLuckyNumber(data);
      console.log(data);
    },
    onError: (error) => {
      setLuckyNumber(null);
      console.log(error);
    },
    retry: 0,
    staleTime: Infinity,
  });
};
