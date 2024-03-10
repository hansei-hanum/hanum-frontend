import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';

import { UserLogo } from 'src/assets';
import { ScaleOpacity, Text } from 'src/components';
import { getPrevTimeString } from 'src/utils';
import { GetCommentsAuthorProps, LimitedArticleScopeOfDisclosure } from 'src/api';

import { CommunityPostProps } from '../Post';

import * as S from './styled';

export interface CommunityPostHeaderProps extends Pick<CommunityPostProps, 'createdAt'> {
  author?: GetCommentsAuthorProps;
  authorName: string;
  style?: StyleProp<ViewStyle>;
  openBottomSheet: () => void;
  onPress?: () => void;
  userImagePress?: () => void;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure;
}

export const CommunityPostHeader: React.FC<CommunityPostHeaderProps> = ({
  author,
  authorName,
  scopeOfDisclosure,
  createdAt,
  style,
  openBottomSheet,
  onPress,
  userImagePress,
}) => {
  console.log(scopeOfDisclosure, 'scopeOfDisclosure', LimitedArticleScopeOfDisclosure.Public);
  const theme = useTheme();

  return (
    <S.CommunityHeader style={style}>
      <S.CommunityHeaderTitle>
        <ScaleOpacity onPress={userImagePress}>
          <S.CommunityHeaderUserImg
            source={author && author.picture ? { uri: author.picture } : UserLogo}
            style={{ resizeMode: 'contain' }}
          />
        </ScaleOpacity>
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <Text size={16}>{authorName}</Text>
          <S.CommunityHeaderUserSection>
            <Text size={14} color={theme.placeholder}>
              {getPrevTimeString(createdAt)}
            </Text>
            {scopeOfDisclosure === LimitedArticleScopeOfDisclosure.Public ? (
              <MI name="public" size={16} color={theme.white} />
            ) : scopeOfDisclosure === LimitedArticleScopeOfDisclosure.Peer ? (
              <MCI name="account-group" size={16} color={theme.white} />
            ) : (
              <MI name="lock" size={16} color={theme.white} />
            )}
          </S.CommunityHeaderUserSection>
        </TouchableOpacity>
      </S.CommunityHeaderTitle>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ height: 40, flexGrow: 1 }} />
      <ScaleOpacity
        onPress={openBottomSheet}
        style={{
          alignItems: 'flex-end',
          flexGrow: 0.1,
          paddingVertical: 8,
        }}
      >
        <Icon name="more-horiz" size={24} color={theme.placeholder} />
      </ScaleOpacity>
    </S.CommunityHeader>
  );
};
