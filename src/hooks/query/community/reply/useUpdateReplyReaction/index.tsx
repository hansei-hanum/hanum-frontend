import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import {
  APIErrorResponse,
  APIResponse,
  UpdateReplyReactionValues,
  updateReplyReaction,
} from 'src/api';
import { ErrorToast } from 'src/constants';

export const useUpdateReplyReaction = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  UpdateReplyReactionValues
> => {
  return useMutation('useUpdateReplyReaction', updateReplyReaction, {
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
