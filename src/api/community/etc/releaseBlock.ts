import { communityInstance } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

import { BlockValue } from './block';

export interface ReleaseBlockValue extends BlockValue {}

export const releaseBlock = async ({ targetId }: ReleaseBlockValue) => {
  const { data } = await communityInstance.delete(`${API_SUFFIX.COMMUNITY.BLOCK}/${targetId}`);
  return data;
};
