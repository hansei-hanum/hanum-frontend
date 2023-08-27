import React from 'react';

import { Text, LunchBox } from 'src/components';

import * as S from './styled';

export const LunchTableScreen: React.FC = () => {
  return (
    <S.LunchTableScreenContainer>
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
    </S.LunchTableScreenContainer>
  );
};
