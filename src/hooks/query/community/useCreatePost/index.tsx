import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, createPost, createPostValues } from 'src/api';

export const useCreatePost = (): UseMutationResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>,
  createPostValues
> => {
  return useMutation('useCreatePost', createPost, {
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: '게시글이 성공적으로 작성되었요',
      });
    },
    onError: (error) => {
      console.log('onError', error);
      // TODO: 에러 처리 토스트 추가
    },
    retry: 0,
  });
};
