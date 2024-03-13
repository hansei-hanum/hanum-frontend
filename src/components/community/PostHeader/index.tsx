import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';
import { WithLocalSvg } from 'react-native-svg';

import { useTheme } from '@emotion/react';

import { UserLogo, VerifyCheckIcon } from 'src/assets';
import { ScaleOpacity, Text } from 'src/components';
import { getPrevTimeString, onProfilePress } from 'src/utils';
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
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ rowGap: 2 }}>
          <S.AuthorContainer>
            <Text size={16}>{authorName}</Text>
            {author && author.verificationInfo && (
              <ScaleOpacity onPress={() => onProfilePress(author.id, author.verificationInfo)}>
                <WithLocalSvg asset={VerifyCheckIcon} width={16} height={16} />
              </ScaleOpacity>
            )}
          </S.AuthorContainer>
          <S.CommunityHeaderUserSection>
            <Text size={14} color={theme.placeholder}>
              {getPrevTimeString(createdAt)}
            </Text>
            {scopeOfDisclosure === LimitedArticleScopeOfDisclosure.Public ? (
              <MI name="public" size={16} color={theme.placeholder} />
            ) : scopeOfDisclosure === LimitedArticleScopeOfDisclosure.Peer ? (
              <MCI name="account-group" size={16} color={theme.placeholder} />
            ) : (
              <MI name="lock" size={16} color={theme.placeholder} />
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
