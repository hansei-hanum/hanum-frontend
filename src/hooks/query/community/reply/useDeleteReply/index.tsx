import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, DeleteReplyValues, deleteReply } from 'src/api';
import { ErrorToast } from 'src/constants';

import { useGetReplies } from '../useGetReplies';

export const useDeleteReply = ({
  articleId,
  commentId,
}: Pick<DeleteReplyValues, 'articleId' | 'commentId'>): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeleteReplyValues
> => {
  const { refetch } = useGetReplies({ articleId, commentId });
  return useMutation('useDeleteReply', deleteReply, {
    onSuccess: (response) => {
      refetch();
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
