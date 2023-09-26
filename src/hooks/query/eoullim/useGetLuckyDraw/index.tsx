import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, eoullimGetLuckyDraw } from 'src/api';
import { luckyNumberState } from 'src/atoms/luckyNumber';
import { eoullimGetLuckDrawErrorMessage } from 'src/constants';

export const useGetLuckyDraw = (): UseQueryResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>
> => {
  const setLuckyNumber = useSetRecoilState(luckyNumberState);
  return useQuery('useGetLuckyDraw', eoullimGetLuckyDraw, {
    onSuccess: ({ data }) => {
      console.log(data);
      setLuckyNumber({ number: data, errorMessage: '' });
    },
    onError: (error) => {
      console.log(error, 'error');
      const message = error.response?.data.message;
      setLuckyNumber({
        number: 0,
        errorMessage: eoullimGetLuckDrawErrorMessage[message ?? ('' || '결제에 실패했습니다.')],
      });
    },
    retry: 0,
    staleTime: Infinity,
  });
};
