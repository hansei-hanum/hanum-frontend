import React from 'react';
import { WithLocalSvg } from 'react-native-svg';

import { Text } from 'src/components';
import { ScheduleIcon } from 'src/assets';

import * as S from './styled';

export const ScheduleScreen: React.FC = () => {
  return (
    <S.ScheduleScreenContainer>
      <S.ScheduleScreenHeader>
        <S.ScheduleScreenIconContainer>
          <WithLocalSvg width={36} height={36} asset={ScheduleIcon} />
          <Text size="22" fontFamily="bold">
            시간표
          </Text>
        </S.ScheduleScreenIconContainer>
        <Text size="18">클라우드보안과 2학년 2반</Text>
      </S.ScheduleScreenHeader>
    </S.ScheduleScreenContainer>
  );
};
