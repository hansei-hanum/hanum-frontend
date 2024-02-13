import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import { useGetUser, useNavigate, usePressingAnimation } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { Text } from 'src/components/common';

import * as S from './styled';

export const UserSection: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();
  const { userData, userProfile, verifyUser, formatUser } = useGetUser();

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      onPress={() => navigate('UserInfo')}
    >
      <S.UserSectionContainer style={[animatedStyle]}>
        <S.UserSectionProfileContainer>
          <S.UserSectionImage
            source={userProfile ? userProfile : UserLogo}
            style={{
              resizeMode: 'contain',
              borderColor: theme.lightGray,
              borderWidth: 1,
            }}
          />
          <S.UserSectionNameContainer>
            <Text size={18} fontFamily="bold">
              {userData?.name}
            </Text>
            <Text size={13} fontFamily="medium" color={verifyUser ? theme.default : theme.danger}>
              {verifyUser ? `${formatUser()}` : '정회원 인증 안 됨'}
            </Text>
          </S.UserSectionNameContainer>
        </S.UserSectionProfileContainer>
        <MaterialIcons name="chevron-right" size={30} color={theme.placeholder} />
      </S.UserSectionContainer>
    </TouchableOpacity>
  );
};
