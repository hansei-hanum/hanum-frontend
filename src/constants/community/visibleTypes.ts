export interface VisibleTypeItems {
  text: string;
  icon: string;
}

export const VISIBLE_TYPE_LIST: VisibleTypeItems[] = [
  {
    text: '모두에게 공개',
    icon: '🌏',
  },
  {
    text: '학생 공개',
    icon: '👨‍🎓',
  },
  {
    text: '제한적 공개',
    icon: '🔒',
  },
];

export const LIMITED_VISIBLE_TYPE_LIST: string[] = [
  '재학생에게 공개',
  '졸업생에게 공개',
  '교직원에게 공개',
];
