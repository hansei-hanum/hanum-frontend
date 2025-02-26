import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';

import { ScaleOpacity } from 'src/components/common';

import * as S from './styled';

export interface PhotosInterface {
  uri: string;
  name: string;
  type: string;
}

export interface PhotoCardProps {
  item?: string;
  onPress: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ item, onPress }) => {
  const theme = useTheme();

  return (
    <ScaleOpacity onPress={onPress}>
      <S.PhotoCardContainer>
        <S.PhotoCardImage source={{ uri: item }} />
        <S.PhotoCardIconWrapper>
          <Icons name="close" size={26} color={theme.default} />
        </S.PhotoCardIconWrapper>
      </S.PhotoCardContainer>
    </ScaleOpacity>
  );
};
