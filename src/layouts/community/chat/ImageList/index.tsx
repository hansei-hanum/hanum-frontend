import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

import * as S from './styled';

export interface ImagesListProps {
  hasPermission: boolean;
}

export const ImagesList: React.FC<ImagesListProps> = ({ hasPermission }) => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPhotos = useCallback(async () => {
    const res = await CameraRoll.getPhotos({
      first: 27,
      assetType: 'Photos',
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    setPhotos(res?.edges);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (hasPermission) {
      console.log('hasPermission');
      fetchPhotos();
    }
  }, [hasPermission, fetchPhotos]);

  return (
    <FlatList
      numColumns={3}
      data={isLoading ? Array(15).fill('') : photos}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <S.Image
            key={item?.node?.image?.uri}
            source={{ uri: item?.node?.image?.uri }}
            height={140}
          />
        );
      }}
      style={{ padding: 14 }}
    />
  );
};
