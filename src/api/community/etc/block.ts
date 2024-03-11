import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface BlockValue {
  targetId: number;
}

export const block = async ({ targetId }: BlockValue) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.put(`${API_SUFFIX.COMMUNITY.BLOCK}/${targetId}`);
  return data;
};
