import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';

import { useNavigation, useRoute } from '@react-navigation/native';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, EditPostValues, editPost } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useEditPost = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  EditPostValues
> => {
  const queryClient = useQueryClient();
  const route = useRoute();
  const navigation = useNavigation();

  return useMutation('useEditPost', editPost, {
    onSuccess: () => {
      route.name === 'CommunityPostDetail' ? navigation.goBack() : null;
      queryClient.invalidateQueries({ queryKey: ['useGetPosts'] });
      queryClient.invalidateQueries({ queryKey: ['useGetMyPosts'] });
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
