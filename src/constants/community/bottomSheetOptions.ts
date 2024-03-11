export enum CommunityBottomSheetTextEnum {
  SHARE = '게시글 공유하기',
  REPORT = '게시글 신고하기',
  BLOCK = '이 사용자 차단하기',
}

export interface CommunityBottomSheetOptionItems {
  text: CommunityBottomSheetTextEnum;
  icon: string;
  isBlock?: boolean;
}

export const COMMUNITY_BOTTOM_SHEET_OPTION_LIST: CommunityBottomSheetOptionItems[] = [
  {
    text: CommunityBottomSheetTextEnum.REPORT,
    icon: 'flag-outline',
  },
  {
    text: CommunityBottomSheetTextEnum.BLOCK,
    icon: 'block',
    isBlock: true,
  },
];
