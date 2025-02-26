import { UseMutationResult, useMutation, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, DeleteReplyValues, deleteReply } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useDeleteReply = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeleteReplyValues
> => {
  const queryClient = useQueryClient();

  return useMutation('useDeleteReply', deleteReply, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetReplies'] });
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
