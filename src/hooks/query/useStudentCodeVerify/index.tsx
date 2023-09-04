import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, studentCodeVerify, StudentCodeVerifyValue } from 'src/api';
import { authState } from 'src/atoms';
import { useNavigate } from 'src/hooks';

export const useStudentCodeVerify = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  StudentCodeVerifyValue
> => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  return useMutation('useStudentCodeVerify', studentCodeVerify, {
    onSuccess: () => {
      navigate('Main');
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
