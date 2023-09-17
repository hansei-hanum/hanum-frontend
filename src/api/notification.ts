import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_SUFFIX, instance, setAccessToken } from './api';

export interface ConnectNotificationValue {
  token: string;
  platform: string;
}

export const connectNotification = async ({ token, platform }: ConnectNotificationValue) => {
  const { data } = await instance.post(API_SUFFIX.NOTIFICATION, {
    token,
    platform,
  });
  return data;
};

export const disconnectNotification = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return null;
  setAccessToken(token);
  await instance.delete(API_SUFFIX.NOTIFICATION);
  await AsyncStorage.removeItem('token');
};
