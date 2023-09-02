import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

export const checkHeight = height > 800 ? true : false;
export const checkWidth = width > 376 ? true : false;
export const iosCheckHeight = Platform.OS === 'ios' && checkHeight ? true : false;
