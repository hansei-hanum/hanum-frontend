import { UseMutationResult, useMutation } from 'react-query';
import Toast from 'react-native-toast-message';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  DeletePostValues,
  LimitedArticleScopeOfDisclosure,
  deletePost,
} from 'src/api';
import { ErrorToast } from 'src/constants';
import { useNavigate } from 'src/hooks/useNavigate';

import { useGetMyPosts } from '../../etc';

export const useDeletePost = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeletePostValues
> => {
  const { refetch } = useGetMyPosts({
    scope: LimitedArticleScopeOfDisclosure.Public,
    cursor: null,
  });

  const navigate = useNavigate();

  return useMutation('useDeletePost', deletePost, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
      navigate('UserPost');
      Toast.show({
        type: 'success',
        text1: '게시글이 성공적으로 삭제되었어요',
      });
      refetch();
    },
    onError: (error) => {
      console.log(error.response?.data, 'onError');
      const message = error.response?.data.message;
      ErrorToast(message ?? '알 수 없는 오류가 발생했어요');
    },
  });
};
