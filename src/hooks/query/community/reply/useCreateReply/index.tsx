import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, createReply, createReplyValues } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useCreateReply = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  createReplyValues
> => {
  return useMutation('useCreateReply', createReply, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
