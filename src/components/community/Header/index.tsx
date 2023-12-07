import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { UserLogo } from 'src/assets';
import { ScaleOpacity, Text } from 'src/components';
import { getPrevTimeString } from 'src/utils';

import { CommunityPostProps } from '../Post';

import * as S from './styled';

export interface CommunityHeaderProps extends Pick<CommunityPostProps, 'author' | 'type' | 'time'> {
  style?: StyleProp<ViewStyle>;
  openBottomSheet: () => void;
}

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  author,
  type,
  time,
  style,
  openBottomSheet,
}) => {
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
              {getPrevTimeString(time)}
            </Text>
            {type === 'ALL' && <Icon name="public" size={16} color={theme.placeholder} />}
            {type === 'PRIVATE' && <Icon name="lock" size={16} color={theme.placeholder} />}
            {type === 'STUDENT' && <MCI name="account-group" size={16} color={theme.placeholder} />}
          </S.CommunityHeaderUserSection>
        </View>
      </S.CommunityHeaderTitle>
      <ScaleOpacity onPress={openBottomSheet}>
        <Icon name="more-horiz" size={24} color={theme.placeholder} />
      </ScaleOpacity>
    </S.CommunityHeader>
  );
};
