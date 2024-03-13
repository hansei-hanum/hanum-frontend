import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@emotion/react';

import { ScaleOpacity, Text } from 'src/components/common';
import { useGetUser, useNavigate } from 'src/hooks';

import { CommunityUserImage } from '../../UserImage';

import * as S from './styled';

export const UserThinkBox: React.FC = () => {
  const { userProfile } = useGetUser();

  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <View>
      <ScaleOpacity onPress={() => navigate('CommunityCreatePost', { isEdit: false })}>
        <S.UserThinkBoxContainer>
          <CommunityUserImage userImage={userProfile} />
          <S.UserThinkBoxWrapper>
            <Text size={16} color={theme.placeholder}>
              어떤 생각을 하고 계신가요?
            </Text>
          </S.UserThinkBoxWrapper>
        </S.UserThinkBoxContainer>
      </ScaleOpacity>
    </View>
  );
};
