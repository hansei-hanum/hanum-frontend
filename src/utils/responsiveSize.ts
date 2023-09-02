import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const responsiveHeight = (size: number) => {
  if (height > 800) {
    return size;
  }
  return size * 2;
};
