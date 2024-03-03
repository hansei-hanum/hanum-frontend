import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, DeleteCommentValues, deleteComment } from 'src/api';

export const useDeleteComment = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeleteCommentValues
> => {
  return useMutation('useDeleteComment', deleteComment, {
    onSuccess: (response) => {
      console.log(response, 'onSuccess');
    },
    onError: (error) => {
      // TODO: 에러 처리 토스트 추가
      console.log('onError', error);
    },
  });
};
