import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  EditPostValues,
  LimitedArticleScopeOfDisclosure,
  editPost,
} from 'src/api';
import { ErrorToast } from 'src/constants';
import { useNavigate } from 'src/hooks/useNavigate';

import { useGetPosts } from '../useGetPosts';
import { useGetMyPosts } from '../../etc';

export const useEditPost = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  EditPostValues
> => {
  const { refetch: postsRefetch } = useGetPosts({
    scope: LimitedArticleScopeOfDisclosure.Public,
    cursor: null,
  });
  const { refetch: myPostsRefetch } = useGetMyPosts({
    cursor: null,
  });
  const navigate = useNavigate();
  return useMutation('useEditPost', editPost, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
      postsRefetch();
      myPostsRefetch();
      navigate('UserPost');
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
