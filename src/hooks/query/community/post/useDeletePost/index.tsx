import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, DeletePostValues, deletePost } from 'src/api';
import { ErrorToast } from 'src/constants';
import { useNavigate } from 'src/hooks/useNavigate';

export const useDeletePost = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeletePostValues
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation('useDeletePost', deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetMyPosts', 'useGetPosts'] });
      navigate('UserPost');
      Toast.show({
        type: 'success',
        text1: '게시글이 성공적으로 삭제되었어요',
      });
    },
    onError: (error) => {
      console.log(error.response?.data, 'onError');
      const message = error.response?.data.message;
      ErrorToast(message ?? '알 수 없는 오류가 발생했어요');
    },
  });
};
