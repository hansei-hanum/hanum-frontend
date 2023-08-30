import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

import { PhoneValue, phone } from 'src/api';
import { APIErrorResponse, APIResponse } from 'src/api';
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
      navigate('Home');
    },
    onError: (data) => {
      console.log(data.response?.data);
    },
  });
};
