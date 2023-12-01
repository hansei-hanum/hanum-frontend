import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, View, Dimensions } from 'react-native';

import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useTheme } from '@emotion/react';

import { ScaleOpacity, Text } from 'src/components';

import * as S from './styled';

export interface ImageBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  hasPermission: boolean;
}

export const ImageBottomSheet: React.FC<ImageBottomSheetProps> = ({
  bottomSheetModalRef,
  hasPermission,
}) => {
  const theme = useTheme();

  const screenWidth = Dimensions.get('screen').width;

  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);

  const fetchPhotos = useCallback(async () => {
    const res = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    });
    setPhotos(res?.edges);
  }, []);

  const snapPoints = useMemo(() => ['100%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    if (hasPermission) {
      fetchPhotos();
    }
  }, [hasPermission, fetchPhotos]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: theme.background }}
        handleIndicatorStyle={{ backgroundColor: theme.placeholder }}
      >
        {hasPermission ? (
          <View
            style={{
              gap: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {photos?.map((item) => {
              return (
                <ScaleOpacity onPress={() => null} key={item?.node?.image?.uri}>
                  <Image
                    source={{ uri: item?.node?.image?.uri }}
                    style={{
                      width: Math.min(screenWidth / 4.032),
                      height: Math.min(screenWidth / 4.032),
                      borderWidth: 1,
                    }}
                    resizeMode="cover"
                  />
                </ScaleOpacity>
              );
            })}
          </View>
        ) : (
          <S.ImageBottomSheetContainer>
            <Text size={22} fontFamily="bold" isCenter style={{ width: '100%' }}>
              한움에서 사진과 {'\n'}동영상을 이용하세요
            </Text>
          </S.ImageBottomSheetContainer>
        )}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
