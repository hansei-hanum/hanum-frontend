import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';

export interface GetCommentsValues {
  articleId: number;
  page: number;
  count: number;
}

export enum RichTextType {
  TEXT = 'Text',
  MENTION = 'Mention',
}

export interface GetCommentsDetail {
  id: number;
  isAnonymous: boolean;
  author: {
    id: number;
    name?: string;
    handle?: string;
    picture: string;
  };
  authorName?: string;
  content: {
    spans?: [
      {
        type: RichTextType;
      },
    ];
  };
  createdAt: string;
  reactions?: [
    {
      emoji: string;
      count: number;
    },
  ];
  replyCount: number;
}

export interface GetCommentsResponse {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  comments: [GetCommentsDetail];
}

export const getComments = async ({ articleId, page, count }: GetCommentsValues) => {
  setAccessToken('4');
  const { data } = await communityInstance.get(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments?page=${page}&limit=${count}`,
  );
  return data;
};
