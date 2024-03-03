import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

import { BlockValue } from './block';

export interface ReleaseBlockValue extends BlockValue {}

export const releaseBlock = async ({ targetId }: ReleaseBlockValue) => {
  setAccessToken('1');
  const { data } = await communityInstance.delete(`${API_SUFFIX.COMMUNITY.BLOCK}/${targetId}`);
  return data;
};
