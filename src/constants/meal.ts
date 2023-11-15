export interface Menu {
  name: string;
  allergys: string[];
}

export interface MealItem {
  date: string;
  menus: Menu[];
}

export const MEAL_LIST: MealItem[] = [
  {
    date: '2023-011-10T00:00:00',
    menus: [
      {
        name: '치킨마요덮밥',
        allergys: [],
      },
      {
        name: '김치콩나물국',
        allergys: [],
      },
      {
        name: '오이피클',
        allergys: [],
      },
      {
        name: '과일음료',
        allergys: ['난류'],
      },
      {
        name: '소세지떡꼬치',
        allergys: [],
      },
      {
        name: '망고요거트샐러드',
        allergys: [],
      },
    ],
  },
  {
    date: '2023-11-11T00:00:00',
    menus: [
      {
        name: '현미밥',
        allergys: [],
      },
      {
        name: '모듬어묵국',
        allergys: ['난류', '밀', '대두', '아황산류'],
      },
      {
        name: '참나물새콤겉절이',
        allergys: ['밀', '대두', '아황산류'],
      },
      {
        name: '춘천식닭갈비',
        allergys: ['우유', '밀', '닭고기', '대두', '아황산류'],
      },
      {
        name: '콘치즈오븐구이',
        allergys: ['아황산류', '우유', '밀', '난류', '대두', '돼지고기'],
      },
      {
        name: '포기김치',
        allergys: ['새우', '아황산류'],
      },
    ],
  },
  {
    date: '2023-11-12T00:00:00',
    menus: [
      {
        name: '차조밥',
        allergys: [],
      },
      {
        name: '아욱된장국',
        allergys: ['대두', '새우', '밀', '아황산류'],
      },
      {
        name: '묵은지사태찜',
        allergys: ['대두', '새우', '아황산류', '밀', '돼지고기'],
      },
      {
        name: '상추겉절이',
        allergys: ['밀', '대두', '아황산류'],
      },
      {
        name: '치즈계란말이',
        allergys: ['난류', '대두', '우유'],
      },
      {
        name: '마시는요거트',
        allergys: ['우유'],
      },
    ],
  },
  {
    date: '2023-11-13T00:00:00',
    menus: [
      {
        name: '열무냉면',
        allergys: ['난류', '메밀', '대두', '밀', '새우', '아황산류', '쇠고기'],
      },
      {
        name: '치커리사과생채',
        allergys: ['아황산류'],
      },
      {
        name: '낙지덮밥',
        allergys: [],
      },
      {
        name: '핫도그/케찹',
        allergys: ['난류', '우유', '대두', '밀', '돼지고기', '토마토'],
      },
      {
        name: '포기김치',
        allergys: ['새우', '아황산류'],
      },
      {
        name: '아이스크림',
        allergys: ['샤베트'],
      },
    ],
  },
  {
    date: '2023-11-14T00:00:00',
    menus: [
      {
        name: '보리밥',
        allergys: [],
      },
      {
        name: '감자양파국',
        allergys: ['아황산류'],
      },
      {
        name: '제육볶음',
        allergys: [],
      },
      {
        name: '부추전/초간장',
        allergys: ['난류', '대두', '밀', '아황산류'],
      },
      {
        name: '구이김',
        allergys: ['아황산류'],
      },
      {
        name: '깍두기',
        allergys: ['새우', '아황산류'],
      },
    ],
  },
  {
    date: '2023-11-05T00:00:00',
    menus: [
      {
        name: '열무냉면',
        allergys: ['난류', '메밀', '대두', '밀', '새우', '아황산류', '쇠고기'],
      },
      {
        name: '치커리사과생채',
        allergys: ['아황산류'],
      },
      {
        name: '낙지덮밥',
        allergys: [],
      },
      {
        name: '핫도그/케찹',
        allergys: ['난류', '우유', '대두', '밀', '돼지고기', '토마토'],
      },
      {
        name: '포기김치',
        allergys: ['새우', '아황산류'],
      },
      {
        name: '아이스크림',
        allergys: ['샤베트'],
      },
    ],
  },
  {
    date: '2023-11-16T00:00:00',
    menus: [
      {
        name: '열무냉면',
        allergys: ['난류', '메밀', '대두', '밀', '새우', '아황산류', '쇠고기'],
      },
      {
        name: '치커리사과생채',
        allergys: ['아황산류'],
      },
      {
        name: '낙지덮밥',
        allergys: [],
      },
      {
        name: '핫도그/케찹',
        allergys: ['난류', '우유', '대두', '밀', '돼지고기', '토마토'],
      },
      {
        name: '포기김치',
        allergys: ['새우', '아황산류'],
      },
      {
        name: '아이스크림',
        allergys: ['샤베트'],
      },
    ],
  },
  {
    date: '2023-11-17T00:00:00',
    menus: [
      {
        name: '열무냉면',
        allergys: ['난류', '메밀', '대두', '밀', '새우', '아황산류', '쇠고기'],
      },
      {
        name: '치커리사과생채',
        allergys: ['아황산류'],
      },
      {
        name: '낙지덮밥',
        allergys: [],
      },
      {
        name: '핫도그/케찹',
        allergys: ['난류', '우유', '대두', '밀', '돼지고기', '토마토'],
      },
      {
        name: '포기김치',
        allergys: ['새우', '아황산류'],
      },
      {
        name: '아이스크림',
        allergys: ['샤베트'],
      },
    ],
  },
  {
    date: '2023-11-18T00:00:00',
    menus: [
      {
        name: '열무냉면',
        allergys: ['난류', '메밀', '대두', '밀', '새우', '아황산류', '쇠고기'],
      },
      {
        name: '치커리사과생채',
        allergys: ['아황산류'],
      },
      {
        name: '낙지덮밥',
        allergys: [],
      },
      {
        name: '핫도그/케찹',
        allergys: ['난류', '우유', '대두', '밀', '돼지고기', '토마토'],
      },
      {
        name: '포기김치',
        allergys: ['새우', '아황산류'],
      },
      {
        name: '아이스크림',
        allergys: ['샤베트'],
      },
    ],
  },
  {
    date: '2023-11-19T00:00:00',
    menus: [
      {
        name: '열무냉면',
        allergys: ['난류', '메밀', '대두', '밀', '새우', '아황산류', '쇠고기'],
      },
      {
        name: '치커리사과생채',
        allergys: ['아황산류'],
      },
      {
        name: '낙지덮밥',
        allergys: [],
      },
      {
        name: '핫도그/케찹',
        allergys: ['난류', '우유', '대두', '밀', '돼지고기', '토마토'],
      },
      {
        name: '포기김치',
        allergys: ['새우', '아황산류'],
      },
      {
        name: '아이스크림',
        allergys: ['샤베트'],
      },
    ],
  },
];
