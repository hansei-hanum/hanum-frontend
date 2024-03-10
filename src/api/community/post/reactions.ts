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
  setAccessToken('9');
  const { data } = await communityInstance.post(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/reactions`,
    {
      emoji,
    },
  );

  return data;
};
