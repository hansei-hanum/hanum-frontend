import React from 'react';
import { Platform } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';

import { Text, Box } from 'src/components';
import { headerIconStyle } from 'src/constants';
import { ShowMoreIcon, UserLogo } from 'src/assets';
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
        rowGap: 26,
      }}
    >
      <S.ShowMoreHeaderScreen>
        <Text size="20" fontFamily="bold">
          더보기
        </Text>
        <WithLocalSvg
          width={headerIconStyle.width}
          height={headerIconStyle.height}
          asset={ShowMoreIcon}
        />
      </S.ShowMoreHeaderScreen>
      <Box navigateUrl="Main">
        <S.ShowMoreUserContainer>
          <S.ShowMoreUserInfo>
            <S.ShowMoreUserImage source={UserLogo} />
            <S.ShowMoreUserNameContainer>
              <Text size="18" fontFamily="bold">
                박찬영
              </Text>
              <Text size="16" fontFamily="medium">
                클라우드보안과 2학년 2반 재학생
              </Text>
            </S.ShowMoreUserNameContainer>
          </S.ShowMoreUserInfo>
          <TouchableOpacity activeOpacity={0.5}>
            <MaterialIcons name="chevron-right" size={30} color={colors.placeholder} />
          </TouchableOpacity>
        </S.ShowMoreUserContainer>
      </Box>
    </S.ShowMoreScreenContainer>
  );
};
