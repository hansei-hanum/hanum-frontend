import React, { useEffect, useState } from 'react';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { Button, MealTableCard, MealTableLayout, Modal, Spinner } from 'src/components';
import { useGetMealTable, useGetUser } from 'src/hooks';
import { GetLunchMenusResponse } from 'src/api';

import * as S from './styled';

const asdData: GetLunchMenusResponse[] = [
  {
    date: '2023-10-04',
    menus: ['스팸마요밥', '콩나물김칫국', '함박스테이크', '참나물새콤무침', '오이피클', '과일음료'],
    kcal: 1013,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=kj7rHKdGzh91FBlXQfaV1cRFYKxirJfCSJwu903fES3UHtLinkwSTzMSzTa3TKOJ.hostingwas2_servlet_engine5?atchFileId=2855361&fileSn=0',
  },
  {
    date: '2023-10-05',
    menus: ['현미밥', '쇠고기미역국', '분모자순대닭갈비', '모듬잡채', '포기김치', '미니케이크'],
    kcal: 938,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=k2gGtSAOodwtFMzFQ5IstuekdT8MomrlS1voPgV62nSqqlw7nmg6T83ULYZmwlNW.hostingwas1_servlet_engine6?atchFileId=2859121&fileSn=0',
  },
  {
    date: '2023-10-06',
    menus: [
      '주꾸미덮밥',
      '두부미역장국',
      '치즈/고구마고로케',
      '치커리사과무침',
      '포기김치',
      '과일에이드',
    ],
    kcal: 732,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=kYdQ9lfL73Bfl0ZTQ1OAqbVzoTVuMAGoS17atY6dngcH1Wqsn13La9SD1SgZ3DLM.hostingwas1_servlet_engine4?atchFileId=2859122&fileSn=0',
  },
  {
    date: '2023-10-10',
    menus: ['오곡밥', '버섯만둣국', '안동식찜닭', '진미채견과조림', '얼갈이된장나물', '포기김치'],
    kcal: 1152,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5fWO9aoojnWR09J2QD2DuzR19NmobMySSretZYlHZrSQh13QnhmdVd4DSMYOGio0.hostingwas3_servlet_engine5?atchFileId=2860442&fileSn=0',
  },
  {
    date: '2023-10-11',
    menus: [
      '날치알김치볶음밥',
      '가쓰오장국',
      '고구마치즈롤카츠',
      '마카로니샐러드',
      '포도무절임',
      '마시는요거트',
    ],
    kcal: 854,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5ak0R2Q753C84E9uQ2kUyaNY1WsM11hbSy1Bz4sqpt0cat8ynSS0N81TxcSW0uAk.hostingwas3_servlet_engine7?atchFileId=2862903&fileSn=0',
  },
  {
    date: '2023-10-12',
    menus: ['차조밥', '근대된장국', '매운돈사태찜', '계란말이', '오이양파생채', '포기김치'],
    kcal: 727,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5UrCI2C1WlUES2rsQzJaiy4m9aR3tXaxSRdeAVfaSIPN16kanqt0YGyZ9Nb9Sx0M.hostingwas3_servlet_engine4?atchFileId=2863886&fileSn=0',
  },
  {
    date: '2023-10-13',
    menus: ['백미밥', '하이스소스', '구워주는피자', '망고요거트샐러드', '깍두기', '과일음료'],
    kcal: 806,
  },
  {
    date: '2023-10-16',
    menus: [
      '현미밥',
      '단배추된장국',
      '데리야끼수육/상추쌈',
      '비빔야채막국수',
      '보쌈김치',
      '파인애플',
    ],
    kcal: 995,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5342Y0Ez1LYIP988QOjgSaH9DCk8IJCHSbKW5bGAfF9ql7JHncsL0j6ayBuKEBqX.hostingwas1_servlet_engine7?atchFileId=2867943&fileSn=0',
  },
  {
    date: '2023-10-17',
    menus: [
      '참치김치덮밥',
      '쑥갓어묵국',
      '허니갈릭순살치킨',
      '콘샐러드',
      '하얀무피클',
      '비타민음료',
    ],
    kcal: 1026,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5exa3knaVqCVkLpMQ3K1EOQAAvTahUzSSSBTJpjUj9hJnEkhnlk1mKxnrhkgXeHD.hostingwas1_servlet_engine5?atchFileId=2869238&fileSn=0',
  },
  {
    date: '2023-10-23',
    menus: ['현미밥', '바지락된장찌개', '제육볶음', '맛살계란찜', '포기김치', '구이김'],
    kcal: 832,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5HwVeI9PbSdGCOkXQlNTiFbrclu0YNriSo7HXz0pN22PpZZdnCv1SapSWhfs9NMZ.hostingwas3_servlet_engine8?atchFileId=2876374&fileSn=0',
  },
  {
    date: '2023-10-24',
    menus: ['백미밥', '설렁탕/소면사리', '새우고기완자전', '골뱅이초무침', '석박지', '사과음료'],
    kcal: 789,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5kjgERGpaE3ECA8qQJZeuhN3oT3e2nt1SWcoIHkhQkxxQkxCnOTfKRYuE04LlX11.hostingwas2_servlet_engine6?atchFileId=2877757&fileSn=0',
  },
  {
    date: '2023-10-25',
    menus: [
      '햄야채볶음밥',
      '팽이미소국',
      '통인시장기름떡볶이',
      '미니핫도그/팝만두',
      '포기김치',
      '쁘띠첼',
    ],
    kcal: 906,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5nx9fjz1929OwEHRQDbFoPznGA0wMdmmSVddONVv799kSxeinqQIX6GtgyaAreub.hostingwas1_servlet_engine8?atchFileId=2880573&fileSn=0',
  },
  {
    date: '2023-10-26',
    menus: ['잡곡밥', '짬뽕순두부찌개', '모듬돈장조림', '볼어묵칠리볶음', '취나물무침', '포기김치'],
    kcal: 824,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5gPgQBES1S336Kt1QES8wMfLYIgPHTQJSbIX6zde0NOekm5onNyoOO7jfZxg3Xq5.hostingwas2_servlet_engine4?atchFileId=2882384&fileSn=0',
  },
  {
    date: '2023-10-27',
    menus: [
      '자장면(추가밥)',
      '계란파국',
      '목화솜탕수육',
      '블루베리단호박범벅',
      '단무지/김치',
      '유산균음료',
    ],
    kcal: 932,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=5JJUU266C1xBlUrKQHIP9ZyzAY99ZGfMS69ptt4UTmyjE9djnU6PlSjlH2Rtl3nc.hostingwas2_servlet_engine5?atchFileId=2885153&fileSn=0',
  },
  {
    date: '2023-10-30',
    menus: [
      '현미밥',
      '고추장호박찌개',
      '연탄불고기/무쌈',
      '부추전/미니간장',
      '콩나물대파채무침',
      '포기김치',
    ],
    kcal: 914,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=55lKhmV8VKOnceytQBzc1htGidqP17WTSCNebv4IigeylIQAnaN2aG0yDodZEnD8.hostingwas1_servlet_engine4?atchFileId=2888702&fileSn=0',
  },
  {
    date: '2023-10-31',
    menus: ['수수밥', '뼈없는감자탕', '가자미커틀렛/타르소스', '메추리알조림', '탕평채', '깍두기'],
    kcal: 970,
    picture:
      'https://hansei.sen.hs.kr/dggb/module/file/selectImageView.do;jsessionid=53LU66Ii4tgAj4vKQrkrncdaI3UPcJz9SKTQtTgqqRhguIUyn9TLN7cQ95IUFYE9.hostingwas3_servlet_engine5?atchFileId=2891930&fileSn=0',
  },
];

export const MealTableScreen: React.FC = () => {
  const date = new Date();

  const { userData } = useGetUser();

  const { data, isLoading } = useGetMealTable({ month: `${date.getMonth() + 1}` });
  const mealData = data?.data;
  console.log(mealData, 'mealData');

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const filteredMealList = mealData?.filter(
    (meal) => new Date(meal.date).getDate() >= date.getDate(),
  );

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if ((isFocused && !userData) || (isFocused && Boolean(mealData?.length) && !isLoading)) {
      setModalVisible(true);
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <MealTableLayout>
        <Spinner isCenter />
      </MealTableLayout>
    );
  } else if (!isLoading && mealData && userData) {
    return (
      <MealTableLayout>
        <S.MealTableWrapper
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            rowGap: 25,
          }}
        >
          <S.MealTableContainer>
            {asdData
              ?.reduce<GetLunchMenusResponse[][]>((acc, currentValue, index) => {
                if (index % 2 === 0) acc.push([currentValue]);
                else acc[acc.length - 1].push(currentValue);
                return acc;
              }, [])
              .map((items, index) => (
                <S.MealTableListContainer key={index}>
                  {items.map((item) => (
                    <MealTableCard {...item} />
                  ))}
                </S.MealTableListContainer>
              ))}
          </S.MealTableContainer>
        </S.MealTableWrapper>
      </MealTableLayout>
    );
  } else {
    return (
      <MealTableLayout>
        <Modal
          modalVisible={modalVisible}
          title="오류"
          text={'급식 정보를 불러오는데 실패했습니다.\n' + '다시 시도해주세요.'}
          button={
            <Button
              onPress={() => {
                navigation.goBack(), setModalVisible(false);
              }}
            >
              확인
            </Button>
          }
        />
      </MealTableLayout>
    );
  }
};
