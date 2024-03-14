import React, { useRef } from 'react';
import { Animated, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';
import { WithLocalSvg } from 'react-native-svg';
import Toast from 'react-native-toast-message';

import { useTheme } from '@emotion/react';

import { UserLogo, VerifyCheckIcon } from 'src/assets';
import { REPORT_BOTTOM_SHEET_HEIGHT, ReportBottomSheet, ScaleOpacity, Text } from 'src/components';
import { getPrevTimeString } from 'src/utils';
import { GetCommentsAuthorProps, LimitedArticleScopeOfDisclosure } from 'src/api';
import { BottomSheetRefProps } from 'src/types';
import { SCREEN_WIDTH } from 'src/constants';

import { CommunityPostProps } from '../Post';

import * as S from './styled';

export interface CommunityPostHeaderProps extends Pick<CommunityPostProps, 'createdAt'> {
  author?: GetCommentsAuthorProps;
  authorName: string;
  style?: StyleProp<ViewStyle>;
  openBottomSheet: () => void;
  onPress?: () => void;
  scopeOfDisclosure: LimitedArticleScopeOfDisclosure | null;
  onProfilePress?: () => void;
}

export const CommunityPostHeader: React.FC<CommunityPostHeaderProps> = ({
  author,
  authorName,
  scopeOfDisclosure,
  createdAt,
  style,
  openBottomSheet,
  onPress,
  onProfilePress,
}) => {
  const userReportBottomSheetRef = useRef<BottomSheetRefProps>(null);
  const userReportScreenAnimationValue = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  const theme = useTheme();

  const onVerifyIconPress = (authorId?: number, verificationInfo?: string) => {
    if (verificationInfo) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: `${verificationInfo}`,
      });
    } else if (authorId) {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: '미인증 사용자에요',
      });
    } else {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: '익명 사용자에요',
      });
    }
  };

  return (
    <>
      <S.CommunityHeader style={style}>
        <S.CommunityHeaderTitle>
          <ScaleOpacity onPress={onProfilePress}>
            <S.CommunityHeaderUserImg
              source={author && author.picture ? { uri: author.picture } : UserLogo}
              style={{ resizeMode: 'contain' }}
            />
          </ScaleOpacity>
          <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ rowGap: 2 }}>
            <S.AuthorContainer>
              <Text size={16}>{authorName}</Text>
              {author && author.verificationInfo && (
                <ScaleOpacity onPress={() => onVerifyIconPress(author.id, author.verificationInfo)}>
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={{ height: 40, flexGrow: 1 }}
        />
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
      <ReportBottomSheet
        reportScreenAnimationValue={userReportScreenAnimationValue}
        ref={userReportBottomSheetRef}
        scrollHeight={REPORT_BOTTOM_SHEET_HEIGHT}
      />
    </>
  );
};
