export interface ShowMoreSectionItem {
  name: string;
  icon: string;
  navigateUrl: string;
}

export interface ShowMoreItem {
  name: string;
  section: ShowMoreSectionItem[];
}

export const SHOW_MORE_LIST: ShowMoreItem[] = [
  {
    name: '학교 생활정보',
    section: [
      {
        name: '학사일정',
        icon: '📆',
        navigateUrl: 'Schedule',
      },
      {
        name: '급식표',
        icon: '🍴',
        navigateUrl: 'Meal',
      },
      {
        name: '시간표',
        icon: '⏰',
        navigateUrl: 'TimeTable',
      },
    ],
  },
  // {
  //   name: '행사',
  //   section: [
  //     {
  //       name: '한움페이',
  //       icon: '💳',
  //       navigateUrl: 'HanumPayMain',
  //     },
  //     {
  //       name: '2023 한세어울림한마당',
  //       icon: '🎉',
  //       navigateUrl: 'EoullimMain',
  //     },
  //   ],
  // },
];
