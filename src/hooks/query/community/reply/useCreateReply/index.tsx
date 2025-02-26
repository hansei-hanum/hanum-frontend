import { UseMutationResult, useMutation, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, createReply, CreateReplyValues } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useCreateReply = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  CreateReplyValues
> => {
  const queryClient = useQueryClient();

  return useMutation('useCreateReply', createReply, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetReplies'] });
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
    retry: 0,
  });
};
