import React from 'react';
import { Image } from 'react-native';

import { CommunityListItems } from 'src/constants';
import { RPH } from 'src/utils';

import * as S from './styled';

export interface ImageCardProps {
  item: CommunityListItems;
  index: number;
  imageHeights: number[];
}

export const ImageCard: React.FC<ImageCardProps> = ({ item, imageHeights, index }) => {
  if (item.content.image.length === 1) {
    return (
      <S.ImageCardWrapper>
        {item.content.image.map((image, i) => {
          const imageHeight = imageHeights[index * item.content.image.length + i];
          console.log(imageHeight, 'imageHeight');
          return (
            <S.ImageCardImage
              count={1}
              key={i}
              source={{
                uri: image,
                height: imageHeight > RPH(45) ? RPH(45) : imageHeight,
              }}
              resizeMode="contain"
            />
          );
        })}
      </S.ImageCardWrapper>
    );
  } else if (item.content.image.length === 2) {
    return (
      <S.ImageCardWrapper>
        {item.content.image.map((image, i) => {
          const imageHeight = imageHeights[index * item.content.image.length + i];
          console.log(imageHeight, 'imageHeight');
          return (
            <S.ImageCardImage
              count={2}
              key={i}
              source={{
                uri: image,
                height: imageHeight > RPH(45) ? RPH(45) : imageHeight,
              }}
              resizeMode="contain"
            />
          );
        })}
      </S.ImageCardWrapper>
    );
  } else if (item.content.image.length === 3) {
    return (
      <S.ImageCardContainer>
        {item.content.image.slice(0, 1).map((image, i) => {
          const imageHeight = imageHeights[index * item.content.image.length + i];
          console.log(imageHeight, 'imageHeight');
          return (
            <S.ImageCardImage
              count={1}
              key={i}
              source={{
                uri: image,
                height: imageHeight > RPH(20) ? RPH(20) : imageHeight,
              }}
              resizeMode="contain"
            />
          );
        })}
        <S.ImageCardWrapper>
          {item.content.image.slice(1).map((image, i) => {
            const imageHeight = imageHeights[index * item.content.image.length + i];
            console.log(imageHeight, 'imageHeight');
            return (
              <S.ImageCardImage
                count={3}
                key={i}
                source={{
                  uri: image,
                  height: imageHeight > RPH(45) ? RPH(45) : imageHeight,
                }}
                resizeMode="contain"
              />
            );
          })}
        </S.ImageCardWrapper>
      </S.ImageCardContainer>
    );
  } else {
    return null;
  }
};
