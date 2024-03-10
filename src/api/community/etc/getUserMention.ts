import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface GetUserMentionValue {
  name: string;
}

export interface GetUserMentionResponse {
  items: [
    {
      id: number;
      name: string;
      picture: string;
      verificationInfo: string;
    },
  ];
}

export const getUserMention = async ({ name }: GetUserMentionValue) => {
  console.log('name', name);
  setAccessToken('11');
  if (name === '') return null;
  const { data } = await communityInstance.get(`${API_SUFFIX.COMMUNITY.USER_MENTION}`, {
    params: {
      name,
    },
  });

  return data;
};
