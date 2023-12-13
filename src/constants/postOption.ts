export enum PostOptionEnum {
  IMAGE_UPLOAD = '사진 업로드',
  VISIBLE = '공개 범위 설정',
  ANONYMOUS = '익명성 설정',
}

export interface PostOptionItems {
  text: PostOptionEnum;
  iconName: string;
}

export const POST_OPTION_LIST: PostOptionItems[] = [
  {
    text: PostOptionEnum.IMAGE_UPLOAD,
    iconName: 'image',
  },
  {
    text: PostOptionEnum.VISIBLE,
    iconName: 'lock',
  },
  {
    text: PostOptionEnum.ANONYMOUS,
    iconName: 'eye',
  },
];
