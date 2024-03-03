import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, BlockValue, block } from 'src/api';
import { AUTH_ERROR_MESSAGE, communityErrorMessage } from 'src/constants';

export const useBlock = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  BlockValue
> => {
  return useMutation('useBlock', block, {
    onSuccess: () => {
      console.log('useBlock onSuccess');
    },
    onError: (error) => {
      const message = error.response?.data.message;
      console.log('useBlock onError', message);
      Toast.show({
        type: 'error',
        text1: communityErrorMessage[message ?? ('' || AUTH_ERROR_MESSAGE)],
      });
    },
  });
};
