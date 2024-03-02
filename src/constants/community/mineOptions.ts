export enum CommunityMineBottomSheetTextEnum {
  EDIT = '편집',
  DELETE = '삭제',
}

export interface CommunityMineBottomSheetOptionItems {
  text: CommunityMineBottomSheetTextEnum;
  icon: string;
  isDanger?: boolean;
}

export const COMMUNITY_MINE_BOTTOM_SHEET_OPTION_LIST: CommunityMineBottomSheetOptionItems[] = [
  {
    text: CommunityMineBottomSheetTextEnum.EDIT,
    icon: 'edit',
  },
  {
    text: CommunityMineBottomSheetTextEnum.DELETE,
    icon: 'trash-alt',
    isDanger: true,
  },
];
