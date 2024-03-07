import { communityInstance, setAccessToken } from 'src/api/api';
import { API_SUFFIX } from 'src/api/suffix';
import { PaginationItemProps, PaginationType } from 'src/types';

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

export interface GetCommentsDetail extends PaginationItemProps {
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

  const nextPage = data.data.nextCursor;

  return { ...data, nextPage };
};
