import { UseQueryResult, useQuery } from 'react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, FetchUserResponse, fetchUser } from 'src/api';
import { authAtom } from 'src/atoms';
import { ERROR_MESSAGE } from 'src/Router';

export const useFetchUser = (): UseQueryResult<
  APIResponse<FetchUserResponse>,
  AxiosError<APIErrorResponse>
> => {
  const setAuth = useSetRecoilState(authAtom);

  return useQuery('useFetchUser', fetchUser, {
    onError: (error) => {
      console.log(error.response?.data, 'useFetchUser error');
      if (error.response?.data.message === ERROR_MESSAGE) AsyncStorage.removeItem('token');
      setAuth((prev) => ({ ...prev, errorMessage: error.response?.data.message }));
    },
    staleTime: Infinity,
    retry: 3,
  });
};
