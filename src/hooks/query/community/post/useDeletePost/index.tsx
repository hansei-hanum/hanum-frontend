import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, DeletePostValues, deletePost } from 'src/api';

export const useDeletePost = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeletePostValues
> => {
  return useMutation('useDeletePost', deletePost, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
      Toast.show({
        type: 'success',
        text1: '게시글이 성공적으로 삭제되었어요',
      });
    },
    onError: (error) => {
      // TODO: 에러 처리 토스트 추가
      console.log('onError', error);
    },
  });
};
