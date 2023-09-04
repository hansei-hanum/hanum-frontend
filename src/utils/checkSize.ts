import { Dimensions } from 'react-native';

import { isIos } from './checkOs';

const { height, width } = Dimensions.get('window');

export const checkHeight = height > 800 ? true : false;
export const checkWidth = width > 376 ? true : false;
export const iosCheckHeight = isIos && checkHeight ? true : false;
