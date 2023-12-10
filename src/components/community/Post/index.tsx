import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

import { useTheme } from '@emotion/react';

import { Text } from 'src/components';
import { RPH } from 'src/utils';
import { useNavigate } from 'src/hooks';

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
  content,
  imageHeights,
  index,
  isSingle,
}) => {
  const imageHeight = imageHeights[index * content.image.length];

  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <S.CommunityPostContainer>
      <S.CommunityPostContentWrapper style={isSingle && { paddingTop: 12 }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('CommunityChat')}>
          {content.image.length <= 0 ? (
            <Text size={18} style={{ width: '100%' }}>
              {content.message}
            </Text>
          ) : (
            <Text size={16} style={{ width: '100%' }}>
              {content.message}
            </Text>
          )}
        </TouchableOpacity>
      </S.CommunityPostContentWrapper>
      {content.image.length > 0 && (
        <Swiper
          loop={false}
          containerStyle={{
            height:
              imageHeight > RPH(48) || (isSingle && imageHeight > RPH(48)) ? RPH(48) : imageHeight,
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
