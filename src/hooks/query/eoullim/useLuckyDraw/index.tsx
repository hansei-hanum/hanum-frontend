import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, EoullimLuckyDrawValue, eoullimLuckyDraw } from 'src/api';
import { luckyNumberState } from 'src/atoms/luckyNumber';

export const useLuckyDraw = (): UseMutationResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>,
  EoullimLuckyDrawValue
> => {
  const setLuckyNumber = useSetRecoilState(luckyNumberState);
  return useMutation('useLuckyDraw', eoullimLuckyDraw, {
    onSuccess: ({ data }) => {
      console.log(data);
      setLuckyNumber(data);
    },
    onError: (error) => {
      setLuckyNumber(null);
      console.log(error);
    },
    retry: 0,
  });
};
