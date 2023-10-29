import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, memberVerify, MemberVerifyValue } from 'src/api';
import { authState, meberVerifyState } from 'src/atoms';
import { useFetchUser, useInitNavigate } from 'src/hooks';

export const useMemberVerify = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  MemberVerifyValue
> => {
  const [auth, setAuth] = useRecoilState(authState);
  const verify = useSetRecoilState(meberVerifyState);
  const { initNavigate } = useInitNavigate();
  const userProfile = useFetchUser();

  return useMutation('useMemberVerify', memberVerify, {
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
      const message = error.response?.data.message;
      verify({
        type: null,
        department: null,
        grade: null,
        classroom: null,
        number: null,
      });

      if (message === 'UNAUTHORIZED') {
        setAuth({
          ...auth,
          errorMessage: '로그인 토큰이 만료되었거나, 존재하지 않아요.',
        });
      } else if (message === 'KEY_NOT_FOUND') {
        setAuth({ ...auth, errorMessage: '인증 코드가 잘못되었어요' });
      } else {
        console.log(error, 'error');
        setAuth({ ...auth, errorMessage: '알 수 없는 오류가 발생했습니다.' });
      }
    },
    retry: 0,
  });
};
