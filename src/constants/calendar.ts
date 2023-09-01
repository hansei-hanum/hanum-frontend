import { LocaleConfig } from 'react-native-calendars';

export interface CalendarListType {
  id: number;
  title: string;
  contents: string[];
  date: string;
}

export const CALENDAR_LIST: CalendarListType[] = [
  {
    id: 1,
    title: '제목입니다.',
    contents: ['내용입니다.', '내용입니다.', '내용입니다.', '내용입니다.'],
    date: '2023-09-01',
  },
  {
    id: 2,
    title: '제목입니다.',
    contents: ['내용입니다.', '내용입니다.', '내용입니다.', '내용입니다.'],
    date: '2023-09-02',
  },
  {
    id: 2,
    title: '제목입니다.',
    contents: ['ssss', '내용입니다.', '내용입니다.', '내용입니다.'],
    date: '2023-09-03',
  },
  {
    id: 2,
    title: '제목입니다.',
    contents: ['qwer', '내용입니다.', '내용입니다.', '내용입니다.'],
    date: '2023-09-04',
  },
  {
    id: 2,
    title: '제목입니다.',
    contents: ['내용입니다.', '내용입니다.', '내용입니다.', '내용입니다.'],
    date: '2023-09-05',
  },
  {
    id: 2,
    title: '제목입니다.',
    contents: ['내용입니다.', '내용입니다.', '내용입니다.', '내용입니다.'],
    date: '2023-09-06',
  },
  {
    id: 2,
    title: '제목입니다.',
    contents: ['내용입니다.', '내용입니다.', '내용입니다.', '내용입니다.'],
    date: '2023-09-07',
  },
];

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
