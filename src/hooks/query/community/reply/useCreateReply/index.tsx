import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, createReply, CreateReplyValues } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useCreateReply = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  CreateReplyValues
> => {
  return useMutation('useCreateReply', createReply, {
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
    retry: 0,
  });
};
