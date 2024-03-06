import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, DeleteCommentValues, deleteComment } from 'src/api';
import { ErrorToast } from 'src/constants';

import { useGetComments } from '../useGetComments';

export const useDeleteComment = ({
  articleId,
}: Pick<DeleteCommentValues, 'articleId'>): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeleteCommentValues
> => {
  const { refetch } = useGetComments({ articleId });
  return useMutation('useDeleteComment', deleteComment, {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error, 'useDeleteComment onError');
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
