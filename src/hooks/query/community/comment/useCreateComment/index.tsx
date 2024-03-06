import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIResponse, CreateCommentValues, createComment } from 'src/api';
import { ErrorToast } from 'src/constants';

import { useGetComments } from '../useGetComments';

export const useCreateComment = ({
  articleId,
}: Pick<CreateCommentValues, 'articleId'>): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIResponse<null>>,
  CreateCommentValues
> => {
  const { refetch } = useGetComments({ articleId });
  return useMutation('useCreateComment', createComment, {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      const message = error.response?.data.message;
      console.log(message, 'error');
      ErrorToast(message);
    },
  });
};
