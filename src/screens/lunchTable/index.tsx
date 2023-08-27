import React from 'react';
import { WithLocalSvg } from 'react-native-svg';

import { Text, LunchBox } from 'src/components';
import { LunchTableIcon } from 'src/assets';

import * as S from './styled';

export const LunchTableScreen: React.FC = () => {
  return (
    <S.LunchTableWrapper>
      <S.LunchTableContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 140,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: 25,
        }}
      >
        <S.LunchTableAlertContainer>
          <Text size="18" fontFamily="medium">
            매일 아침 알림 받기
          </Text>
        </S.LunchTableAlertContainer>
        <S.LunchTableBoxContainer>
          <LunchBox
            isPrimary={true}
            date="5/27(수)"
            lunch="현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스"
          />
          <LunchBox
            isPrimary={false}
            date="5/27(수)"
            lunch="현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스"
          />
          <LunchBox
            isPrimary={false}
            date="5/27(수)"
            lunch="현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스"
          />
          <LunchBox
            isPrimary={false}
            date="5/27(수)"
            lunch="현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스"
          />
        </S.LunchTableBoxContainer>
      </S.LunchTableContainer>
      <S.LunchTableHeader>
        <WithLocalSvg width={40} height={40} asset={LunchTableIcon} />
        <Text size="22" fontFamily="bold">
          급식표
        </Text>
      </S.LunchTableHeader>
    </S.LunchTableWrapper>
  );
};
