import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';
import { PaginationType } from 'src/types';

export interface GetCommentsValues {
  articleId: number;
  limit?: number;
  cursor?: number | null;
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

export interface GetCommentsContentsProps {
  spans: [
    {
      text: string;
      type: RichTextType.TEXT;
    },
    {
      mention: string;
      id: number;
      type: RichTextType.MENTION;
    },
  ];
}

export interface GetCommentsDetail {
  id: number;
  isAnonymous: boolean;
  author?: GetCommentsAuthorProps;
  authorName?: string;
  content: {
    spans?: [
      {
        text: string;
        type: RichTextType.TEXT;
      },
      {
        mention: string;
        id: number;
        type: RichTextType.MENTION;
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

export const getComments = async ({ articleId, cursor, limit = 10 }: GetCommentsValues) => {
  setAccessToken('9');
  const { data } = await communityInstance.get(
    `${API_SUFFIX.COMMUNITY.BASE_URL}/${articleId}/comments`,
    {
      params: {
        limit,
        cursor: cursor,
      },
    },
  );

  const nextPage = data.data.cursor < data.data.nextCursor ? data.data.nextCursor : undefined;

  return { ...data, nextPage };
};
