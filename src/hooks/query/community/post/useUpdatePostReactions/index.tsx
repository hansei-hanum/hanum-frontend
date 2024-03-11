import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  UpdatePostReactionsValues,
  updatePostReactions,
} from 'src/api';
import { ErrorToast } from 'src/constants';

export const useUpdatePostReactions = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  UpdatePostReactionsValues
> => {
  return useMutation('useUpdatePostReactions', updatePostReactions, {
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
