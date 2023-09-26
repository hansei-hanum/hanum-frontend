import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, EoullimLuckyDrawValue, eoullimLuckyDraw } from 'src/api';
import { luckyNumberState } from 'src/atoms';
import { eoulimLuckDrawErrorMessage } from 'src/constants';
import { useNavigate } from 'src/hooks/useNavigate';

export const useLuckyDraw = (): UseMutationResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>,
  EoullimLuckyDrawValue
> => {
  const navigate = useNavigate();
  const setLuckyNumber = useSetRecoilState(luckyNumberState);
  return useMutation('useLuckyDraw', eoullimLuckyDraw, {
    onSuccess: ({ data }) => {
      console.log(data, 'data');
      setLuckyNumber({ number: data, errorMessage: '' });
      navigate('EoullimStatus');
    },
    onError: (error) => {
      console.log(error, 'error');
      const message = error.response?.data.message;
      setLuckyNumber({
        number: 0,
        errorMessage: eoulimLuckDrawErrorMessage[message ?? ('' || '결제에 실패했습니다.')],
      });
      navigate('EoullimStatus');
    },
    retry: 0,
  });
};
