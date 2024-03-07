import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIResponse, CreateCommentValues, createComment } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useCreateComment = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIResponse<null>>,
  CreateCommentValues
> => {
  return useMutation('useCreateComment', createComment, {
    onError: (error) => {
      console.log(error.response?.data, 'useCreateComment onError');
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
