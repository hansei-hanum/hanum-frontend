import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface GetUserMentionValue {
  name: string;
}

export interface GetUserMentionDetail {
  id: number;
  name: string;
  picture: string;
  verificationInfo: string;
}

export interface GetUserMentionResponse {
  items: GetUserMentionDetail[];
}

export const getUserMention = async ({ name }: GetUserMentionValue) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  if (name === '') return null;
  const { data } = await communityInstance.get(`${API_SUFFIX.COMMUNITY.USER_MENTION}`, {
    params: {
      name,
    },
  });

  return data;
};
