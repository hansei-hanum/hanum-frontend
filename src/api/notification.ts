import AsyncStorage from '@react-native-async-storage/async-storage';

import { authInstance } from './api';
import { API_SUFFIX } from './suffix';

export interface ConnectNotificationValue {
  token: string;
  platform: string;
}

export const connectNotification = async ({ token, platform }: ConnectNotificationValue) => {
  const { data } = await authInstance.post(API_SUFFIX.INFO.NOTIFICATION, {
    token,
    platform,
  });
  return data;
};

export const disconnectNotification = async () => {
  await authInstance.delete(API_SUFFIX.INFO.NOTIFICATION);
  await AsyncStorage.removeItem('token');
};
