import { GetCommentsAuthorProps, RichTextType } from 'src/api';

export interface PaginationType<T> {
  limit: number;
  total: number;
  totalPage: number;
  cursor: number;
  nextCursor: number;
  items: T[];
}

export interface AttachmentType {
  thumbnail: string;
  original: string;
  id: number;
  type: string;
}

export interface PaginationItemProps {
  id: number;
  isAnonymous: boolean;
  author?: GetCommentsAuthorProps;
  authorName: string;
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
  attachment: AttachmentType;
  createdAt: string;
  reactions: [
    {
      emoji: string;
      count: number;
      isReacted: boolean;
    },
  ];
}
