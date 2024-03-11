import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, API_SUFFIX, setAccessToken } from 'src/api';

export interface DeletePostValues {
  id: number;
}

export const deletePost = async ({ id }: DeletePostValues) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.delete(`${API_SUFFIX.COMMUNITY.BASE_URL}/${id}`);
  return data;
};
