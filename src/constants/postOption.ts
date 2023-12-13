export interface PostOptionItems {
  text: string;
  iconName: string;
}

export const POST_OPTION_LIST: PostOptionItems[] = [
  {
    text: '사진 업로드',
    iconName: 'image',
  },
  {
    text: '공개 범위 설정',
    iconName: 'lock',
  },
  {
    text: '익명성 설정',
    iconName: 'eye',
  },
];
