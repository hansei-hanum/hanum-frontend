import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

import { useTheme } from '@emotion/react';

import { FormattedContent, Text } from 'src/components';
import { RPH } from 'src/utils';
import { GetPostsDetail } from 'src/api';

import * as S from './styled';

export interface CommunityPostProps {
  index: number;
  createdAt: string;
  content: GetPostsDetail['content'];
  attachments: GetPostsDetail['attachments'];
  imageHeights: number[];
  onPress?: () => void;
}

export const CommunityPost: React.FC<CommunityPostProps> = ({
  content,
  imageHeights,
  attachments,
  index,
  onPress,
}) => {
  const imageHeight = imageHeights[index * attachments.length];
  const oneImage = attachments.length === 1;

  const theme = useTheme();

  return (
    <S.CommunityPostContainer>
      <S.CommunityPostContentWrapper style={oneImage && { paddingTop: 12 }}>
        <TouchableOpacity activeOpacity={onPress ? 0.8 : 1} onPress={onPress}>
          {content.spans &&
            (attachments.length <= 0 ? (
              <Text size={18} style={{ width: '100%' }}>
                <FormattedContent spans={content.spans} />
              </Text>
            ) : (
              <Text size={16} style={{ width: '100%' }}>
                <FormattedContent spans={content.spans} />
              </Text>
            ))}
        </TouchableOpacity>
      </S.CommunityPostContentWrapper>
      {attachments.length > 0 && (
        <Swiper
          loop={false}
          containerStyle={{
            height:
              imageHeight > RPH(48) || (oneImage && imageHeight > RPH(48)) ? RPH(48) : imageHeight,
          }}
          dotColor="#A3A3A3"
          activeDotColor={theme.primary}
        >
          {attachments.map(({ original }, i) => {
            const imageHeight = oneImage
              ? imageHeights[i]
              : imageHeights[index * attachments.length + i];
            return (
              <S.CommunityPostImageWrapper key={i}>
                <Image
                  style={{ width: '100%' }}
                  key={i}
                  source={{
                    uri: original,
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
