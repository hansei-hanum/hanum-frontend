import { useState } from 'react';
import { Image } from 'react-native';

import { SCREEN_WIDTH } from 'src/constants';

export const useGetImagesHeight = () => {
  const [imageHeights, setImageHeights] = useState<number[]>([]);

  const getHeightsForImage = (url: string, index: number) => {
    Image.getSize(url, (width, height) => {
      const aspectRatio = width / height;
      const imageHeight = SCREEN_WIDTH / aspectRatio;

      if (index >= imageHeights.length) {
        setImageHeights((oldArray) => [
          ...oldArray,
          ...new Array(Math.max(0, index - oldArray.length + 1)).fill(0),
          imageHeight,
        ]);
      } else {
        setImageHeights((oldArray) => [
          ...oldArray.slice(0, index),
          imageHeight,
          ...oldArray.slice(index + 1),
        ]);
      }
    });
  };

  return { getHeightsForImage, imageHeights };
};
