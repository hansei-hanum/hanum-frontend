import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';
import { PaginationType } from 'src/types';

export interface GetCommentsValues {
  articleId: number;
  page: number;
  count?: number;
}

export enum RichTextType {
  TEXT = 'Text',
  MENTION = 'Mention',
}

export interface GetCommentsAuthorProps {
  id: number;
  name?: string;
  handle?: string;
  picture: string;
}

export interface GetCommentsDetail {
  id: number;
  isAnonymous: boolean;
  author?: GetCommentsAuthorProps;
  authorName?: string;
  content?: {
    spans?: [
      {
        text: string;
        type: RichTextType;
      },
    ];
  };
  attachment: {
    thumbnail: string;
    original: string;
    id: number;
    type: string;
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

export type GetCommentsResponse = PaginationType<GetCommentsDetail>;

export const getComments = async ({ articleId, page, count = 10 }: GetCommentsValues) => {
  setAccessToken('9');
  const { data } = await communityInstance.get(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments`,
    {
      params: {
        page,
        count,
      },
    },
  );

  const nextPage = data.data.page < data.data.totalPage ? data.data.page + 1 : undefined;

  return { ...data, nextPage };
};
