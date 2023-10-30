import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, memberVerify, MemberVerifyValue } from 'src/api';
import { authState, useUserVerifyState } from 'src/atoms';
import { useFetchUser, useInitNavigate } from 'src/hooks';
import { AUTH_ERROR_MESSAGE, authUserVerifyErrorMessage } from 'src/constants';

export const useUserVerify = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  MemberVerifyValue
> => {
  const [auth, setAuth] = useRecoilState(authState);
  const verify = useSetRecoilState(useUserVerifyState);
  const { initNavigate } = useInitNavigate();
  const userProfile = useFetchUser();

  return useMutation('useUserVerify', memberVerify, {
    onSuccess: ({ data }, variables) => {
      userProfile.refetch();
      variables.isCheck
        ? verify({
            type: data.type,
            department: data.department,
            grade: data.grade,
            classroom: data.classroom,
            number: data.number,
            isUsed: data.isUsed,
          })
        : initNavigate('Main');
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
