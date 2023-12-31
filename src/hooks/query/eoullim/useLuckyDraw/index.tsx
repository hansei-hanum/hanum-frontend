import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, EoullimLuckyDrawValue, eoullimLuckyDraw } from 'src/api';
import { luckyNumberAtom } from 'src/atoms';
import { PAY_FAILED, eoulimLuckDrawErrorMessage } from 'src/constants';
import { useNavigate } from 'src/hooks/useNavigate';

export const useLuckyDraw = (): UseMutationResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>,
  EoullimLuckyDrawValue
> => {
  const navigate = useNavigate();
  const setLuckyNumber = useSetRecoilState(luckyNumberAtom);
  return useMutation('useLuckyDraw', eoullimLuckyDraw, {
    onSuccess: ({ data }) => {
      setLuckyNumber({ number: data, errorMessage: '' });
      navigate('EoullimStatus');
    },
    onError: (error) => {
      console.log(error, 'error');
      const message = error.response?.data.message;
      setLuckyNumber({
        number: 0,
        errorMessage: eoulimLuckDrawErrorMessage[message ?? ('' || PAY_FAILED)],
      });
      navigate('EoullimStatus');
    },
    retry: 0,
  });
};
