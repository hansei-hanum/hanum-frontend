import React from 'react';
import { Platform } from 'react-native';

import { Text } from 'src/components';

import * as S from './styled';

export const CalendarScreen: React.FC = () => {
  return (
    <S.CalenderScreenContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: Platform.OS === 'ios' ? 130 : 100,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20,
        rowGap: 20,
      }}
    >
      <Text size={16}>Calender Screen</Text>
    </S.CalenderScreenContainer>
  );
};
