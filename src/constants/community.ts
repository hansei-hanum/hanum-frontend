export interface CommunityListItems {
  author: {
    name: string;
    isHidden: boolean;
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
  'https://cdn.discordapp.com/attachments/976313946812350474/1177900739604008970/IMG_0961.jpg?ex=6574308c&is=6561bb8c&hm=6bbfc3690d36b90d5a4d1db8b65b7591f25ab67da49a1f5b0a92d846a3460891&';

const POSTER =
  'https://cdn.discordapp.com/attachments/1142361627501547552/1176511662447144990/comImg.png?ex=656f22de&is=655cadde&hm=c9ed37e1214d7ed4008e8599d40bcdb17c1d9ddc0e1bc59175baa087e3a461de&';

const IMAGE =
  'https://cdn.discordapp.com/attachments/1169142358210789446/1169912051506872340/IMG_1145.png?ex=65699580&is=65572080&hm=2d3b5173507e028f8aa5995563b4ee6d800e7960a815631630136cb8df61871e&';

const PHONE =
  'https://cdn.discordapp.com/attachments/1142361627501547552/1177126126804541511/Screenshot_2023-11-23_at_2.58.40_PM.png?ex=65715f22&is=655eea22&hm=8514b3421780cef3f7b7dfa7b29e42896849aec27bf2adc9116e16a7fea7df88&';

export const COMMUNITY_LIST: CommunityListItems[] = [
  {
    author: {
      name: '김민수',
      image: null,
      isHidden: false,
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
      isHidden: true,
    },
    time: '2023-11-22T07:00:00.000Z',
    content: {
      message: `점심시간에 에어팟이 사라졌어요\n혹시 보신 분?`,
      image: [CHAT, PHONE],
      likes: 5,
      comments: 3,
    },
    type: 'PRIVATE',
  },
  {
    author: {
      name: '너검무검',
      image: null,
      isHidden: false,
    },
    time: '2023-11-19T15:00:00.000Z',
    content: {
      message: `보안관제 동아리에서 신입부원을 모집합니다!\n\n- 모집 기간: 기원전 12년 ~ 기원전 11년\n- 모집 인원: 미정\n- 지원하기: https://hsoc.kr/`,
      image: [CHAT, POSTER],
      likes: 5,
      comments: 3,
    },
    type: 'STUDENT',
  },
  {
    author: {
      name: '너검무검',
      image: null,
      isHidden: false,
    },
    time: '2023-11-19T15:00:00.000Z',
    content: {
      message: `보안관제 동아리에서 신입부원을 모집합니다!\n\n- 모집 기간: 기원전 12년 ~ 기원전 11년\n- 모집 인원: 미정\n- 지원하기: https://hsoc.kr/`,
      image: [POSTER, IMAGE, IMAGE],
      likes: 5,
      comments: 3,
    },
    type: 'STUDENT',
  },
  {
    author: {
      name: '너검무검',
      image: null,
      isHidden: false,
    },
    time: '2023-11-19T15:00:00.000Z',
    content: {
      message: `보안관제 동아리에서 신입부원을 모집합니다!\n\n- 모집 기간: 기원전 12년 ~ 기원전 11년\n- 모집 인원: 미정\n- 지원하기: https://hsoc.kr/`,
      image: [IMAGE, IMAGE, IMAGE, IMAGE],
      likes: 5,
      comments: 3,
    },
    type: 'STUDENT',
  },
  {
    author: {
      name: '너검무검',
      image: null,
      isHidden: false,
    },
    time: '2023-11-19T15:00:00.000Z',
    content: {
      message: `보안관제 동아리에서 신입부원을 모집합니다!\n\n- 모집 기간: 기원전 12년 ~ 기원전 11년\n- 모집 인원: 미정\n- 지원하기: https://hsoc.kr/`,
      image: [IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE],
      likes: 5,
      comments: 3,
    },
    type: 'STUDENT',
  },
];

export interface ReplyItems {
  author: {
    name: string;
    image: null;
    isHidden: boolean;
  };
  time: string;
  message: string;
  likes: number;
}

export const REPLY_LIST: ReplyItems[] = [
  {
    author: {
      name: '너검무검',
      image: null,
      isHidden: false,
    },
    time: '2023-11-25T15:30:00.000Z',
    message: '잉기 디찌?',
    likes: 3,
  },
  {
    author: {
      name: '너검무검',
      image: null,
      isHidden: false,
    },
    time: '2023-11-25T15:30:00.000Z',
    message: '잉기 디찌?',
    likes: 3,
  },
  {
    author: {
      name: '너검무검',
      image: null,
      isHidden: false,
    },
    time: '2023-11-25T15:30:00.000Z',
    message: '잉기 디찌?',
    likes: 3,
  },
];

export interface CommunityChatListItems extends Omit<CommunityListItems, 'content' | 'type'> {
  replies: ReplyItems[];
  message: string;
  likes: number;
}

export const COMMUNITY_CHAT_LIST: CommunityChatListItems[] = [
  {
    author: {
      name: '김민수',
      image: null,
      isHidden: false,
    },
    time: '2023-11-26T14:00:00.000Z',
    message: '잉기 디밍기?',
    likes: 5,
    replies: [],
  },
  {
    author: {
      name: '너검무검',
      image: null,
      isHidden: false,
    },
    time: '2023-11-25T15:30:00.000Z',
    message: '잉기 디찌?',
    likes: 3,
    replies: [],
  },
  {
    author: {
      name: '기모링',
      image: null,
      isHidden: false,
    },
    time: '2023-11-25T15:30:00.000Z',
    message: '잉기 디푹?',
    likes: 5,
    replies: REPLY_LIST,
  },
  {
    author: {
      name: '기모링',
      image: null,
      isHidden: false,
    },
    time: '2023-11-25T15:30:00.000Z',
    message:
      '잉기 디asdfdsafdasgjhfgsdahjfgdashjfdsajhFhjsdagjhksad디asdfdsafdasgjhfgsdahjfgdashjfdsajhFhjsdagjhksad디asdfdsafdasgjhfgsdahjfgdashjfdsajhFhjsdagjhksad디asdfdsafdasgjhfgsdahjfgdashjfdsajhFhjsdagjhksad디asdfdsafdasgjhfgsdahjfgdashjfdsajhFhjsdagjhksad디asdfdsafdasgjhfgsdahjfgdashjfdsajhFhjsdagjhksad디asdfdsafdasgjhfgsdahjfgdashjfdsajhFhjsdagjhksad디asdfdsafdasgjhfgsdahjfgdashjfdsajhFhjsdagjhksad디asdfdsafdasgjhfgsdahjfgdashjfdsajhFhjsdagjhksad',
    likes: 5,
    replies: [],
  },
];

export interface CommunityPostItems extends CommunityListItems {
  chats: CommunityChatListItems[];
}

export const COMMUNITY_POST: CommunityPostItems = {
  author: {
    name: '너검무검',
    image: null,
    isHidden: false,
  },
  time: '2023-11-19T15:00:00.000Z',
  content: {
    message: `보안관제 동아리에서 신입부원을 모집합니다!\n\n- 모집 기간: 기원전 12년 ~ 기원전 11년\n- 모집 인원: 미정\n- 지원하기: https://hsoc.kr/`,
    image: [CHAT],
    likes: 5,
    comments: 3,
  },
  type: 'STUDENT',
  chats: COMMUNITY_CHAT_LIST,
};
