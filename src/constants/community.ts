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
    message:
      '나 엄용진인데 현재 새삥임 진짜 새 상품인데 나 데려갈 90번녀 구함 조건:내 미래를 책임져줘야함, 경험 많아야함, 18년째 모솔이고 진짜 새상품임 진심 새삥 i want a sex~~ 그리고 구몬 선생님 저랑 결혼해줘요 진심으로 제가 구몬 수업 들을 때부터 좋아했어요 구몬 쌤 때문에 수업에 집중도 못하고 계속 쳐다보느라 수업 진도를 못나가서 구몬 그만 뒀었어요 사랑해요 구몬 선생님 현재 짝사랑 970일 차 그리고 이건 내 비밀인데 사실 학교에서 야동을 박여준이라는 아이랑 같이 봤어 이 친구 좀 좆이 존나 작더라 물론 나도 평균 이하로 존나 작더라 근데 야동 내용이 7살 어린이를 상대로 한 이야기였어 이날 처음 접해봤는데 나름 좀 내 취향이드라 ㅋㅋ 나는 솔직히 말해서 내가 성격이 개차반인거 나도 좀 인정 하긴해~ 마지막으로 나는 여자에 존나 미쳤고 뭐~ 남자를 싫어하는건 아니고 내 맘에 들면 남자랑도 사귈 수도 있어 아 진짜 마지막으로 한가지 썰이 더 생각 났는데 나는 이해를 못하겠지만 내가 고백을 한 아이는 다 전학을 가더라 이게 내가 운이 없는걸까? 아니면 이 친구들이 나를 피하는 것일까? 솔직히 나는 전자 같아 내가 너무 운이 없어서 내가 고백을 하는 여자아이들이 전부 다 전학을 가는 거 같거든 그래도 나는 멈추지 않고 내가 조금이라도 맘에 드는 여자가 있으면 길을 걷거나 학교안에서 만나거나 도서관에서 만나든 장소를 신경안쓰고 모두 다 고백으로 혼내줘버릴거야~~~~~~ 기모띠~~ ',
    likes: 9999,
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
      name: 'kigmin',
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
      name: 'nigga',
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
      name: 'naega',
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
      name: 'di12',
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
