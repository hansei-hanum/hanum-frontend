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
  setAccessToken,
} from 'src/api';
import { authState } from 'src/atoms';
import { useFetchUser, useInitNavigate, useNavigate } from 'src/hooks';
import { AUTH_ERROR_MESSAGE, authErrorMessage } from 'src/constants';

export const useAuth = (): UseMutationResult<
  APIResponse<AuthResponse>,
  AxiosError<APIErrorResponse>,
  RegisterValues | LoginValues
> => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const { initNavigate } = useInitNavigate();
  const userProfile = useFetchUser();

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
        setAccessToken(data);
        if (auth.isCurrentStudent) {
          navigate('Verify');
        } else {
          initNavigate('Main');
        }
        userProfile.refetch();
      },
      onError: (error) => {
        console.log(error, 'error');
        const message = error.response?.data.message;
        setAuth({
          ...auth,
          errorMessage: authErrorMessage[message ?? ('' || AUTH_ERROR_MESSAGE)],
        });
      },
      retry: 0,
    },
  );
};
