import Toast from 'react-native-toast-message';

import { AUTH_ERROR_MESSAGE, communityErrorMessage } from '../error';

export const ErrorToast = (message?: string) => {
  Toast.show({
    type: 'error',
    text1: communityErrorMessage[message ?? ('알 수 없는 오류가 발생했어요' || AUTH_ERROR_MESSAGE)],
  });
};
