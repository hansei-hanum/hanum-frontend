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
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      console.log(error.response?.data, 'useCreateReply onError');
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
