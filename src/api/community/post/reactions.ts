import AsyncStorage from '@react-native-async-storage/async-storage';

import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface UpdatePostReactionsValues {
  articleId: number;
  emoji?: string;
}

export const updatePostReactions = async ({
  articleId,
  emoji = 'Heart',
}: UpdatePostReactionsValues) => {
  const token = await AsyncStorage.getItem('token');
  setAccessToken(token);
  const { data } = await communityInstance.post(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/reactions`,
    {
      emoji,
    },
  );

  return data;
};
