import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  createPost,
  CreatePostValues,
  LimitedArticleScopeOfDisclosure,
} from 'src/api';
import { ErrorToast } from 'src/constants';
import { useNavigate } from 'src/hooks/useNavigate';

import { useGetPosts } from '../useGetPosts';

export const useCreatePost = (): UseMutationResult<
  APIResponse<number>,
  AxiosError<APIErrorResponse>,
  CreatePostValues
> => {
  const { refetch } = useGetPosts({ scope: LimitedArticleScopeOfDisclosure.Public, cursor: null });
  const navigate = useNavigate();
  return useMutation('useCreatePost', createPost, {
    onSuccess: () => {
      refetch();
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
