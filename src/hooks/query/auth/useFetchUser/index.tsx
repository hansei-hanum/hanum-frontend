import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { APIErrorResponse, APIResponse, FetchUserResponse, fetchUser } from 'src/api';
import { userProfileState } from 'src/atoms';

export const useFetchUser = (): UseQueryResult<
  APIResponse<FetchUserResponse>,
  AxiosError<APIErrorResponse>
> => {
  const setProfile = useSetRecoilState(userProfileState);
  return useQuery('useFetchUser', fetchUser, {
    onSuccess: (data) => {
      console.log(data, 'data');
      if (data) {
        setProfile({
          created_at: data.data.created_at,
          id: data.data.id,
          name: data.data.name,
          phone: data.data.phone,
          profile: data.data.profile,
          verification: data.data.verification,
        });
      }
    },
    onError: async (error) => {
      console.log(error, 'error');
      await AsyncStorage.removeItem('token');
    },
    staleTime: Infinity,
    retry: 0,
  });
};
