import { ComImg } from 'src/assets';

export interface CommunityListItems {
  author: {
    name: string;
    image: string | null;
  };
  time: string;
  content: {
    message: string;
    image: string[];
    likes: number;
    comments: number;
  };
  type: 'ALL' | 'STUDENT' | 'PRIVATE';
}

export const COMMUNITY_LIST: CommunityListItems[] = [
  {
    author: {
      name: '김민수',
      image: null,
    },
    time: '2023-11-20T15:00:00.000Z',
    content: {
      message: `점심시간에 에어팟이 사라졌어요\n혹시 보신 분?`,
      image: [],
      likes: 5,
      comments: 3,
    },
    type: 'ALL',
  },
  {
    author: {
      name: '김잉기',
      image: null,
    },
    time: '2023-11-21T11:00:00.000Z',
    content: {
      message: `점심시간에 에어팟이 사라졌어요\n혹시 보신 분?`,
      image: [ComImg, ComImg, ComImg, ComImg],
      likes: 5,
      comments: 3,
    },
    type: 'PRIVATE',
  },
  {
    author: {
      name: '너검무검',
      image: null,
    },
    time: '2023-11-19T15:00:00.000Z',
    content: {
      message: `보안관제 동아리에서 신입부원을 모집합니다!\n\n- 모집 기간: 기원전 12년 ~ 기원전 11년\n- 모집 인원: 미정\n- 지원하기: https://hsoc.kr/`,
      image: [ComImg, ComImg, ComImg, ComImg, ComImg, ComImg, ComImg],
      likes: 5,
      comments: 3,
    },
    type: 'STUDENT',
  },
];
