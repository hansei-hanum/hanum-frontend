import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

import { PhoneValue, phone, APIErrorResponse, APIResponse } from 'src/api';
import { authState } from 'src/atoms';
import { useNavigate } from 'src/hooks';

export const usePhone = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  PhoneValue
> => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  return useMutation('usePhone', phone, {
    onSuccess: (variables) => {
      setAuth({ ...auth, phone: variables.phone });
      navigate('VerifyCode');
    },
    onError: (error) => {
      const message = error.response?.data.message;
      if (message === 'RATE_LIMITED') {
        return setAuth({ ...auth, errorModal: { ratedLimit: true, externalApi: false } });
      } else if (message === 'EXTERNAL_API_EXCEPTION') {
        return setAuth({ ...auth, errorModal: { ratedLimit: false, externalApi: true } });
      } else {
        return console.log(error, 'error');
      }
    },
    retry: 0,
  });
};
