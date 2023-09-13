import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, studentCodeVerify, StudentCodeVerifyValue } from 'src/api';
import { authState, studentVerifyState } from 'src/atoms';
import { useFetchUser, useNavigate } from 'src/hooks';

export const useStudentCodeVerify = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  StudentCodeVerifyValue
> => {
  const [auth, setAuth] = useRecoilState(authState);
  const setStudentVerify = useSetRecoilState(studentVerifyState);
  const navigate = useNavigate();
  const userProfile = useFetchUser();

  return useMutation('useStudentCodeVerify', studentCodeVerify, {
    onSuccess: ({ data }, variables) => {
      userProfile.refetch();
      variables.isCheck
        ? setStudentVerify({
            department: data.department,
            grade: data.grade,
            classroom: data.classroom,
            number: data.number,
            isUsed: data.isUsed,
          })
        : navigate('Main');
    },
    onError: (error) => {
      const message = error.response?.data.message;
      if (message === 'UNAUTHORIZED') {
        setAuth({
          ...auth,
          errorMessage: '로그인 토큰이 만료되었거나, 존재하지 않습니다.',
        });
      } else {
        console.log(error, 'error');
        setAuth({ ...auth, errorMessage: '알 수 없는 오류가 발생했습니다.' });
      }
    },
    retry: 0,
  });
};
