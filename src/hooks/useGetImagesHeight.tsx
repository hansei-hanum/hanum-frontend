import { useCallback, useState } from 'react';
import { Dimensions, Image } from 'react-native';

export const useGetImagesHeight = () => {
  const screen = Dimensions.get('window');

  const [imageHeights, setImageHeights] = useState<Array<number>>([]);

  const getHeightsForImage = useCallback((uri: string, index: number) => {
    try {
      Image.getSize(uri, (imgWidth, imgHeight) => {
        const ratio = 6 / 4;
        setImageHeights((prev) => {
          const newImageHeights = [...prev];
          newImageHeights[index] = Math.min(screen.width * ratio, imgHeight); // 이미지의 높이를 화면의 너비 * 6/4 와 이미지의 높이 중 작은 값으로 설정
          return newImageHeights;
        });
      });
    } catch (error) {
      console.error('Error getting image size:', error);
    }
  }, []);

  return { imageHeights, getHeightsForImage };
};
