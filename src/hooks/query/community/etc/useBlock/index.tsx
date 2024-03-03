import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, BlockValue, block } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useBlock = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  BlockValue
> => {
  return useMutation('useBlock', block, {
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: '성공적으로 차단되었어요',
      });
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
