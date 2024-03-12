import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, createPost, CreatePostValues } from 'src/api';
import { ErrorToast } from 'src/constants';
import { useNavigate } from 'src/hooks/useNavigate';

export const useCreatePost = (): UseMutationResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>,
  CreatePostValues
> => {
  const navigate = useNavigate();
  return useMutation('useCreatePost', createPost, {
    onSuccess: () => {
      navigate('CommunityMain');
      Toast.show({
        type: 'success',
        text1: '게시글이 작성되었어요',
      });
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
    retry: 0,
  });
};
