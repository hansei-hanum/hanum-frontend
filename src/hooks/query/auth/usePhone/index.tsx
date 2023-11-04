import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { PhoneValue, phone, APIErrorResponse, APIResponse } from 'src/api';
import { authAtom } from 'src/atoms';
import { useNavigate } from 'src/hooks';
import { AUTH_ERROR_MESSAGE, authPhoneErrorMessage } from 'src/constants';
import { loadingAtom } from 'src/atoms/loading';

export const usePhone = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  PhoneValue
> => {
  const setLoading = useSetRecoilState(loadingAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();

  return useMutation('usePhone', phone, {
    onSuccess: ({ data }, variables) => {
      setAuth({ ...auth, phone: variables.phone });
      navigate('VerifyCode');
      setLoading(false);
    },
    onError: (error) => {
      console.log(error, 'error');
      const message = error.response?.data.message;
      setAuth({
        ...auth,
        errorMessage: authPhoneErrorMessage[message ?? ('' || AUTH_ERROR_MESSAGE)],
      });
    },
    retry: 0,
  });
};
