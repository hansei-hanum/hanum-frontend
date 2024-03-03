import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, EditPostValues, editPost } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useEditPost = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  EditPostValues
> => {
  return useMutation('useEditPost', editPost, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
      Toast.show({
        type: 'success',
        text1: '게시글이 성공적으로 수정되어었요',
      });
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
    retry: 0,
  });
};
