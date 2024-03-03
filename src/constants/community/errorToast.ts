import Toast from 'react-native-toast-message';

import { AUTH_ERROR_MESSAGE, communityErrorMessage } from '../error';

export const ErrorToast = (message?: string) => {
  Toast.show({
    type: 'error',
    text1: communityErrorMessage[message ?? ('' || AUTH_ERROR_MESSAGE)],
  });
};
