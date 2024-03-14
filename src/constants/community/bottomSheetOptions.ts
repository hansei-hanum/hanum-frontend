export enum CommunityBottomSheetTextEnum {
  SHARE = '게시글 공유하기',
  REPORT = '이 게시글 신고하기',
  BLOCK = '이 작성자 차단하기',
}

export interface CommunityBottomSheetOptionItems {
  text: CommunityBottomSheetTextEnum;
  icon: string;
  isBlock?: boolean;
}

export enum CommunityBottomSheetUserTextEnum {
  REPORT = '이 사용자 신고하기',
  BLOCK = '이 사용자 차단하기',
}

export interface CommunityBottomSheetUserOptionItems {
  text: CommunityBottomSheetUserTextEnum;
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

export const COMMUNITY_BOTTOM_SHEET_USER_OPTION_LIST: CommunityBottomSheetUserOptionItems[] = [
  {
    text: CommunityBottomSheetUserTextEnum.REPORT,
    icon: 'flag-outline',
  },
  {
    text: CommunityBottomSheetUserTextEnum.BLOCK,
    icon: 'block',
    isBlock: true,
  },
];

export const CommunityOptionList = (isUserOption: boolean) => {
  const option = isUserOption
    ? COMMUNITY_BOTTOM_SHEET_USER_OPTION_LIST
    : COMMUNITY_BOTTOM_SHEET_OPTION_LIST;

  const enums = isUserOption ? CommunityBottomSheetUserTextEnum : CommunityBottomSheetTextEnum;

  return { option, enums };
};
