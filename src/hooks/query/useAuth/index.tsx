import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  APIErrorResponse,
  APIResponse,
  RegisterValues,
  LoginValues,
  login,
  register,
  AuthResponse,
} from 'src/api';
import { authState } from 'src/atoms';
import { useNavigate } from 'src/hooks';

export const useAuth = (): UseMutationResult<
  APIResponse<AuthResponse>,
  AxiosError<APIErrorResponse>,
  RegisterValues | LoginValues
> => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  return useMutation(
    'useAuth',
    (data) => {
      if (auth.name === '') {
        return login({ ...(data as LoginValues) });
      } else {
        return register({ ...(data as RegisterValues) });
      }
    },
    {
      onSuccess: async ({ data }) => {
        await AsyncStorage.setItem('token', data);
        navigate('Main');
      },
      onError: (error) => {
        const message = error.response?.data.message;
        switch (message) {
          case 'ALREADY_REGISTERED':
            setAuth({
              ...auth,
              errorMessage: '이미 가입된 전화번호입니다. 로그인을 진행해주세요.',
            });
            break;
          case 'INVALID_VERIFICATION_CODE':
            setAuth({
              ...auth,
              errorMessage: '인증 번호가 틀립니다.',
            });
            break;
          case 'RATE_LIMITED':
            setAuth({
              ...auth,
              errorMessage:
                '동일 IP로 회원가입을 수차례 요청하여 해당 네트워크에서의 요청이 일시적으로 차단되었습니다.',
            });
            break;
          default:
            console.log(error, 'error');
            setAuth({ ...auth, errorMessage: '알 수 없는 오류가 발생했습니다.' });
            break;
        }
      },
      retry: 0,
    },
  );
};
