import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, EoullimLuckyDrawValue, eoullimLuckyDraw } from 'src/api';
import { luckyNumberState } from 'src/atoms';
import { eoulimLuckDrawErrorMessage } from 'src/constants';

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
      console.log(error);
      const message = error.response?.data.message;
      setLuckyNumber({
        number: null,
        errorMessage: eoulimLuckDrawErrorMessage[message ?? ('' || '결제에 실패했습니다.')],
      });
    },
    retry: 0,
  });
};
