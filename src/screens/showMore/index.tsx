import React from 'react';
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Text, Section } from 'src/components';
import { UserLogo } from 'src/assets';
import { colors } from 'src/styles';
import { usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export const ShowMoreScreen: React.FC = () => {
  const navigate = useNavigation().navigate as (screen: string) => void;
  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();

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
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        onPress={() => navigate('UserInformation')}
      >
        <S.ShowMoreUserContainer style={[animatedStyle]}>
          <S.ShowMoreUserInfo>
            <S.ShowMoreUserImage source={UserLogo} />
            <S.ShowMoreUserNameContainer>
              <Text size="20" fontFamily="bold">
                박찬영
              </Text>
              <Text size="15" fontFamily="medium">
                클라우드보안과 2학년 2반 재학생
              </Text>
            </S.ShowMoreUserNameContainer>
          </S.ShowMoreUserInfo>
          <MaterialIcons name="chevron-right" size={30} color={colors.placeholder} />
        </S.ShowMoreUserContainer>
      </TouchableOpacity>
      <Section />
    </S.ShowMoreScreenContainer>
  );
};
