import { UseMutationResult, useMutation, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, DeleteCommentValues, deleteComment } from 'src/api';
import { ErrorToast } from 'src/constants';

export interface UseDeleteCommentProps {
  refetch: () => void;
}

export const useDeleteComment = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeleteCommentValues
> => {
  const queryClient = useQueryClient();

  return useMutation('useDeleteComment', deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetComments'] });
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
