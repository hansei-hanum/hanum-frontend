import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, EditPostValues, editPost } from 'src/api';
import { ErrorToast } from 'src/constants';
import { useNavigate } from 'src/hooks/useNavigate';

export const useEditPost = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  EditPostValues
> => {
  const navigate = useNavigate();
  return useMutation('useEditPost', editPost, {
    onSuccess: () => {
      navigate('UserPost');
      Toast.show({
        type: 'success',
        text1: '게시글이 성공적으로 수정되었어요',
      });
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
    retry: 0,
  });
};
