import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';

import { ScaleOpacity } from 'src/components/common';

import * as S from './styled';

export interface PhotoCardProps {
  item?: string;
  index: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<(string | undefined)[] | undefined>>;
  selectedImage: (string | undefined)[];
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  index,
  item,
  selectedImage,
  setSelectedImage,
}) => {
  const theme = useTheme();

  return (
    <ScaleOpacity
      onPress={() => {
        setSelectedImage(selectedImage?.filter((_, i) => i !== index));
      }}
    >
      <S.PhotoCardContainer>
        <S.PhotoCardImage source={{ uri: item }} />
        <S.PhotoCardIconWrapper>
          <Icons name="close" size={26} color={theme.default} />
        </S.PhotoCardIconWrapper>
      </S.PhotoCardContainer>
    </ScaleOpacity>
  );
};
