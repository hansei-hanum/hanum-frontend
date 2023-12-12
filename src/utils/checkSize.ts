import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants';

import { isIos } from './checkOs';

export const checkHeight = SCREEN_HEIGHT > 800 ? true : false;
export const checkWidth = SCREEN_WIDTH > 376 ? true : false;
export const iosCheckHeight = isIos && checkHeight ? true : false;
