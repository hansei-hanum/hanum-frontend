import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const RPH = (percentage: number) => {
  console.log('RPH', (percentage / 100) * screenHeight);
  return (percentage / 100) * screenHeight;
};

export const RPW = (percentage: number) => {
  console.log('RPW', (percentage / 100) * screenWidth);
  return (percentage / 100) * screenWidth;
};
