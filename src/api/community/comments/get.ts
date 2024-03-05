import { communityInstance, setAccessToken } from 'src/api/api';

export interface GetCommentsValues {
  articleId: number;
  page?: number;
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

export interface GetCommentsResponse {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  comments: GetCommentsDetail[];
}

export const getComments = async ({ articleId, page, count }: GetCommentsValues) => {
  console.log('getComments', page, count);
  setAccessToken('8');
  const { data } = await communityInstance.get(
    `https://xx.nekos.me/articles/${articleId}/comments/?page=${page}&count=${count}`,
  );
  return data;
};
