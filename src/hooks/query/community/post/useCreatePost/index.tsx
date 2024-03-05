import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, createPost, CreatePostValues } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useCreatePost = (): UseMutationResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>,
  CreatePostValues
> => {
  return useMutation('useCreatePost', createPost, {
    onSuccess: (data) => {
      console.log(data);
      Toast.show({
        type: 'success',
        text1: '게시글이 성공적으로 작성되어었요',
      });
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
    retry: 0,
  });
};
