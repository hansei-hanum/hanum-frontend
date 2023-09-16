/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult, useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, disconnectNotification } from 'src/api';

export const useDisConnectNotification = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  null
> => {
  return useMutation('useDisConnectNotification', disconnectNotification, {
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
