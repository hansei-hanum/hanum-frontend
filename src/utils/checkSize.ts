import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const checkHeight = height > 800 ? true : false;
