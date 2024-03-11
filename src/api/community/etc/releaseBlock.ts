import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

import { BlockValue } from './block';

export interface ReleaseBlockValue extends BlockValue {}

export const releaseBlock = async ({ targetId }: ReleaseBlockValue) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.delete(`${API_SUFFIX.COMMUNITY.BLOCK}/${targetId}`);
  return data;
};
