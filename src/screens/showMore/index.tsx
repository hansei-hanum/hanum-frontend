import React from 'react';
import { Platform } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { Text, Box } from 'src/components';
import { UserLogo } from 'src/assets';
import { colors } from 'src/styles';

import * as S from './styled';

export const ShowMoreScreen: React.FC = () => {
  return (
    <S.ShowMoreScreenContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: Platform.OS === 'ios' ? 80 : 60,
        paddingBottom: 40,
        paddingLeft: 10,
        paddingRight: 10,
        rowGap: 16,
      }}
    >
      <S.ShowMoreHeaderScreen>
        <Text size="24" fontFamily="bold">
          더 보기
        </Text>
      </S.ShowMoreHeaderScreen>
      <Box navigateUrl="Main">
        <S.ShowMoreUserContainer>
          <S.ShowMoreUserInfo>
            <S.ShowMoreUserImage source={UserLogo} />
            <S.ShowMoreUserNameContainer>
              <Text size="22" fontFamily="bold">
                박찬영
              </Text>
              <Text size="15" fontFamily="medium">
                클라우드보안과 2학년 2반 재학생
              </Text>
            </S.ShowMoreUserNameContainer>
          </S.ShowMoreUserInfo>
          <MaterialIcons name="chevron-right" size={30} color={colors.placeholder} />
        </S.ShowMoreUserContainer>
      </Box>
    </S.ShowMoreScreenContainer>
  );
};
