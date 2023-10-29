import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, eoullimGetLuckyDraw } from 'src/api';
import { luckyNumberState } from 'src/atoms/luckyNumber';
import { PAY_FAILED, eoullimGetLuckDrawErrorMessage } from 'src/constants';

export const useGetLuckyDraw = (): UseQueryResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>
> => {
  const setLuckyNumber = useSetRecoilState(luckyNumberState);
  return useQuery('useGetLuckyDraw', eoullimGetLuckyDraw, {
    onSuccess: ({ data }) => {
      setLuckyNumber({ number: data, errorMessage: '' });
    },
    onError: (error) => {
      console.log(error, 'error');
      const message = error.response?.data.message;
      setLuckyNumber({
        number: 0,
        errorMessage: eoullimGetLuckDrawErrorMessage[message ?? ('' || PAY_FAILED)],
      });
    },
    retry: 0,
    staleTime: Infinity,
  });
};
