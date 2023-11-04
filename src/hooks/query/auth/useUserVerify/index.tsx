import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  APIErrorResponse,
  APIResponse,
  userVerify,
  UserVerifyResponse,
  UserVerifyValue,
} from 'src/api';
import { authAtom, userVerifyAtom } from 'src/atoms';
import { useFetchUser, useInitNavigate } from 'src/hooks';
import { AUTH_ERROR_MESSAGE, authUserVerifyErrorMessage } from 'src/constants';

export const useUserVerify = (): UseMutationResult<
  APIResponse<UserVerifyResponse>,
  AxiosError<APIErrorResponse>,
  UserVerifyValue
> => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const verify = useSetRecoilState(userVerifyAtom);
  const { initNavigate } = useInitNavigate();
  const userProfile = useFetchUser();

  return useMutation('useUserVerify', userVerify, {
    onSuccess: ({ data }: APIResponse<UserVerifyResponse>, variables) => {
      userProfile.refetch();
      variables.isCheck ? verify({ ...data }) : initNavigate('Main');
    },
    onError: (error) => {
      console.log(error, 'error');
      const message = error.response?.data.message;
      verify({
        type: null,
        department: null,
        grade: null,
        classroom: null,
        number: null,
      });

      setAuth({
        ...auth,
        errorMessage: authUserVerifyErrorMessage[message ?? ('' || AUTH_ERROR_MESSAGE)],
      });
    },
    retry: 0,
  });
};
