import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  UpdateCommentReactionValues,
  updateCommentReaction,
} from 'src/api';
import { ErrorToast } from 'src/constants';

export const useUpdateCommentReaction = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  UpdateCommentReactionValues
> => {
  return useMutation(updateCommentReaction, {
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
