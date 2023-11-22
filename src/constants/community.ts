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

const CHAT =
  'https://cdn.discordapp.com/attachments/1142361627501547552/1176511445790371840/Screenshot_2023-11-17_at_1.13.18_PM.png?ex=656f22ab&is=655cadab&hm=6ce59e4d34e4346e73ae6908495abc6092c35b915b656830aa0f49045881edbb&';

const POSTER =
  'https://cdn.discordapp.com/attachments/1169142358210789446/1169912051506872340/IMG_1145.png?ex=65699580&is=65572080&hm=2d3b5173507e028f8aa5995563b4ee6d800e7960a815631630136cb8df61871e&';

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
    time: '2023-11-22T07:00:00.000Z',
    content: {
      message: `점심시간에 에어팟이 사라졌어요\n혹시 보신 분?`,
      image: [CHAT, CHAT, CHAT, CHAT],
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
      image: [POSTER, POSTER, POSTER, POSTER, POSTER, POSTER, POSTER],
      likes: 5,
      comments: 3,
    },
    type: 'STUDENT',
  },
];
