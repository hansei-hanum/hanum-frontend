/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Section {
  name: string;
  icon: any;
  navigateUrl: string;
}

export interface ShowMoreSectionItem {
  name: string;
  section: Section[];
}

export const SHOW_MORE_SECTION_LIST: ShowMoreSectionItem[] = [
  {
    name: '학교 생활정보',
    section: [
      {
        name: '학사일정',
        icon: '📆',
        navigateUrl: 'Calendar',
      },
    ],
  },
  {
    name: '행사',
    section: [
      {
        name: '한움페이',
        icon: '💳',
        navigateUrl: 'HanumPay',
      },
      // {
      //   name: '2023 한세어울림한마당',
      //   icon: '🎉',
      //   navigateUrl: 'HanseiFestival',
      // },
    ],
  },
];
