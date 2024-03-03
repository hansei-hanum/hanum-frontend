import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, ReleaseBlockValue, releaseBlock } from 'src/api';
import { ErrorToast } from 'src/constants';

import { useGetBlockList } from '../useGetBlock';

export const useReleaseBlock = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  ReleaseBlockValue
> => {
  const blockList = useGetBlockList();
  return useMutation(releaseBlock, {
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: '차단이 해제되었어요',
      });
      blockList.refetch();
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
