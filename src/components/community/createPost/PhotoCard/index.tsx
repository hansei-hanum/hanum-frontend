import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { ScaleOpacity } from 'src/components/common';
import { communityEditAtom } from 'src/atoms';

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
  const [communityEdit, setCommunityEdit] = useRecoilState(communityEditAtom);
  const theme = useTheme();

  const onPress = () => {
    if (Boolean(communityEdit.image?.length)) {
      setCommunityEdit({
        ...communityEdit,
        image: communityEdit.image?.filter((_, i) => i !== index),
      });
      setSelectedImage(selectedImage?.filter((_, i) => i !== index));
    } else {
      setSelectedImage(selectedImage?.filter((_, i) => i !== index));
    }
  };

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
