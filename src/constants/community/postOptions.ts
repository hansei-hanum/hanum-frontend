export enum PostOptionEnum {
  IMAGE_UPLOAD = '사진 업로드',
  VISIBLE = '공개 범위 설정',
  ANONYMOUS = '익명성 설정',
}

export interface PostOptionItems {
  text: PostOptionEnum;
  icon: string;
}

export const POST_OPTION_LIST: PostOptionItems[] = [
  {
    text: PostOptionEnum.IMAGE_UPLOAD,
    icon: '📷',
  },
  {
    text: PostOptionEnum.VISIBLE,
    icon: '👥',
  },
  {
    text: PostOptionEnum.ANONYMOUS,
    icon: '🔒',
  },
];
