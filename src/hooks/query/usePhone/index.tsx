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
    onSuccess: ({ data }, variables) => {
      setAuth({ ...auth, phone: variables.phone });
      navigate('VerifyCode');
    },
    onError: (error) => {
      const message = error.response?.data.message;
      if (message === 'RATE_LIMITED') {
        setAuth({
          ...auth,
          errorMessage:
            '요청이 너무 빨라요. 잠시 후에 다시 시도해주세요.',
        });
      } else if (message === 'EXTERNAL_API_EXCEPTION') {
        setAuth({
          ...auth,
          errorMessage: '내부 오류로 인해 인증번호를 보낼 수 없어요.\n문제가 지속되면 문의하기를 통해 문의해주세요.',
        });
      } else {
        console.log(error, 'error');
        setAuth({ ...auth, errorMessage: '알 수 없는 문제가 발생했어요.\n문제가 지속되면 문의하기를 통해 문의해주세요.' });
      }
    },
    retry: 0,
  });
};
