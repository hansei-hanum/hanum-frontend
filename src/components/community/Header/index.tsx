import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import { UserLogo } from 'src/assets';
import { Text } from 'src/components';
import { getPostTime } from 'src/utils';

import { CommunityPostProps } from '../Post';

import * as S from './styled';

export interface CommunityHeaderProps extends Pick<CommunityPostProps, 'author' | 'type' | 'time'> {
  style?: StyleProp<ViewStyle>;
}

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({ author, type, time, style }) => {
  const theme = useTheme();
  return (
    <S.CommunityHeader style={style}>
      <S.CommunityHeaderTitle>
        <S.CommunityHeaderUserImg
          source={author.image && !author.isHidden ? { uri: author.image } : UserLogo}
          style={{ resizeMode: 'contain' }}
        />
        <View>
          <Text size={16}>{author.isHidden ? '익명' : author.name}</Text>
          <S.CommunityHeaderUserSection>
            <Text size={14} color={theme.placeholder}>
              {getPostTime(time)}
            </Text>
            {type === 'ALL' && <Icon name="public" size={16} color={theme.placeholder} />}
            {type === 'PRIVATE' && <Icon name="lock" size={16} color={theme.placeholder} />}
            {type === 'STUDENT' && <Icon name="school" size={16} color={theme.placeholder} />}
          </S.CommunityHeaderUserSection>
        </View>
      </S.CommunityHeaderTitle>
      <Icon name="more-horiz" size={24} color={theme.placeholder} />
    </S.CommunityHeader>
  );
};
