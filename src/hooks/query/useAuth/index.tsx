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
import { useFetchUser, useNavigate } from 'src/hooks';

export const useAuth = (): UseMutationResult<
  APIResponse<AuthResponse>,
  AxiosError<APIErrorResponse>,
  RegisterValues | LoginValues
> => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const userProfile = useFetchUser();

  return useMutation(
    'useAuth',
    (data) => {
      if (auth.name === '') {
        return login({ ...(data as LoginValues) });
      } else {
        console.log(auth);
        return register({ ...(data as RegisterValues) });
      }
    },
    {
      onSuccess: async ({ data }) => {
        await AsyncStorage.setItem('token', data);
        navigate(auth.isCurrentStudent ? 'StudentVerify' : 'Main');
        userProfile.refetch();
      },
      onError: (error) => {
        const message = error.response?.data.message;
        switch (message) {
          case 'ALREADY_REGISTERED':
            setAuth({
              ...auth,
              errorMessage: '이미 가입되어 있어요. 로그인을 해주세요.',
            });
            break;
          case 'INVALID_VERIFICATION_CODE':
            setAuth({
              ...auth,
              errorMessage: '인증번호가 잘못되었어요',
            });
            break;
          case 'RATE_LIMITED':
            setAuth({
              ...auth,
              errorMessage: '요청이 너무 빨라요. 잠시 후에 다시 시도해주세요.',
            });
            break;
          case 'ACCOUNT_SUSPENDED':
            setAuth({
              ...auth,
              errorMessage:
                '이용약관 위반으로 이용제한 조치된 계정이에요.\n자세한 사항은 문의하기를 통해 문의해주세요.',
            });
            break;
          case 'USER_NOT_FOUND':
            setAuth({
              ...auth,
              errorMessage: '가입 이력이 없어요. 회원가입을 진행해주세요.',
            });
            break;
          default:
            console.log(error, 'error');
            setAuth({
              ...auth,
              errorMessage:
                '알 수 없는 문제가 발생했어요.\n문제가 지속되면 문의하기를 통해 문의해주세요.',
            });
            break;
        }
      },
      retry: 0,
    },
  );
};
