import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, ReleaseBlockValue, releaseBlock } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useReleaseBlock = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  ReleaseBlockValue
> => {
  const queryClient = useQueryClient();
  return useMutation('useReleaseBlock', releaseBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetBlockList'] });
      Toast.show({
        type: 'success',
        text1: '차단이 해제되었어요',
      });
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
