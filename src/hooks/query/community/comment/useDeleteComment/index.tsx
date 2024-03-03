import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, DeleteCommentValues, deleteComment } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useDeleteComment = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeleteCommentValues
> => {
  return useMutation('useDeleteComment', deleteComment, {
    onSuccess: (response) => {
      // TODO: refresh comment list
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
