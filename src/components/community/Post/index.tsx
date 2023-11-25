import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';
import moment from 'moment-timezone';

import { Text } from 'src/components';
import { RPH } from 'src/utils';
import { UserLogo } from 'src/assets';

import * as S from './styled';

export interface CommunityPostProps {
  index: number;
  author: {
    name: string;
    isHidden?: boolean;
    image: string | null;
  };
  time: string;
  content: {
    message: string;
    image: string[];
  };
  type: 'ALL' | 'PRIVATE' | 'STUDENT';
  imageHeights: number[];
  isSingle?: boolean;
}

export const CommunityPost: React.FC<CommunityPostProps> = ({
  author,
  content,
  type,
  time,
  imageHeights,
  index,
  isSingle,
}) => {
  const theme = useTheme();

  const getTime = (date: string) => {
    const now = moment().tz('Asia/Seoul');
    const target = moment(date).tz('Asia/Seoul');
    const units = ['방금 전', '분', '시간', '일', '주', '달', '년'];
    const diffs = [
      now.diff(target, 'seconds'),
      now.diff(target, 'minutes'),
      now.diff(target, 'hours'),
      now.diff(target, 'days'),
      now.diff(target, 'weeks'),
      now.diff(target, 'months'),
      now.diff(target, 'years'),
    ];

    for (let i = 0; i < units.length; i++) {
      if (diffs[i] < 1) {
        return units[i];
      } else if (diffs[i + 1] < 60) {
        return `${diffs[i + 1]}${units[i + 1]} 전`;
      }
    }

    return `${diffs[6]}${units[6]} 전`;
  };

  return (
    <S.CommunityPostContainer>
      <S.CommunityPostHeader>
        <S.CommunityPostHeaderTitle>
          <S.CommunityPostImage
            source={author.image && !author.isHidden ? { uri: author.image } : UserLogo}
            style={{ resizeMode: 'contain' }}
          />
          <View>
            <Text size={16}>{author.isHidden ? '익명' : author.name}</Text>
            <S.CommunityPostUserProfile>
              <Text size={14} color={theme.placeholder}>
                {getTime(time)}
              </Text>
              {type === 'ALL' && <Icon name="public" size={16} color={theme.placeholder} />}
              {type === 'PRIVATE' && <Icon name="lock" size={16} color={theme.placeholder} />}
              {type === 'STUDENT' && <Icon name="school" size={16} color={theme.placeholder} />}
            </S.CommunityPostUserProfile>
          </View>
        </S.CommunityPostHeaderTitle>
        <Icon name="more-horiz" size={24} color={theme.placeholder} />
      </S.CommunityPostHeader>
      <S.CommunityPostContentWrapper>
        {content.image.length <= 0 ? (
          <Text size={18} style={{ width: '100%' }}>
            {content.message}
          </Text>
        ) : (
          <Text size={16} style={{ width: '100%' }}>
            {content.message}
          </Text>
        )}
      </S.CommunityPostContentWrapper>
      {content.image.length > 0 && (
        <Swiper
          loop={false}
          containerStyle={{
            height:
              imageHeights[index * content.image.length] > RPH(48) || isSingle
                ? RPH(48)
                : imageHeights[index * content.image.length],
          }}
          dotColor="#A3A3A3"
          activeDotColor={theme.primary}
        >
          {content.image.map((image, i) => {
            const imageHeight = isSingle
              ? imageHeights[i]
              : imageHeights[index * content.image.length + i];
            return (
              <S.CommunityPostImageWrapper key={i}>
                <Image
                  style={{ width: '100%' }}
                  key={i}
                  source={{
                    uri: image,
                    height: imageHeight > RPH(48) ? RPH(48) : imageHeight,
                  }}
                  resizeMode="contain"
                />
              </S.CommunityPostImageWrapper>
            );
          })}
        </Swiper>
      )}
    </S.CommunityPostContainer>
  );
};
