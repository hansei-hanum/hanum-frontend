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
        console.log(message, 'message');
        setAuth({
          ...auth,
          errorMessage:
            '동일 IP로 인증을 수차례 요청하여 해당 네트워크에서의 메시지 발송 요청이 일시적으로 차단되었습니다.',
        });
      } else if (message === 'EXTERNAL_API_EXCEPTION') {
        setAuth({
          ...auth,
          errorMessage: '메시지 발송 서버가 응답하지 않아 메시지를 발송할 수 없습니다.',
        });
      } else {
        console.log(error, 'error');
        setAuth({ ...auth, errorMessage: '알 수 없는 오류가 발생했습니다.' });
      }
    },
    retry: 0,
  });
};
