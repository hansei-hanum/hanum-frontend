import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, ReleaseBlockValue, releaseBlock } from 'src/api';
import { ErrorToast } from 'src/constants';

export const useReleaseBlock = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  ReleaseBlockValue
> => {
  return useMutation(releaseBlock, {
    onError: (error) => {
      const message = error.response?.data.message;
      ErrorToast(message);
    },
  });
};
