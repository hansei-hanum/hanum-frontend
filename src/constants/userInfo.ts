export interface UserInfoItem {
  name: string;
  list: string[];
}

export const USER_INFO_LIST: UserInfoItem[] = [
  {
    name: '기본정보',
    list: ['전화번호'],
  },
  {
    name: '인증정보',
    list: ['분류', '유효기간'],
  },
];
