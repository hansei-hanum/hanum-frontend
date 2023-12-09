import { useRef } from 'react';

import {
  COMMUNITY_CHAT_SCREEN_REPORT_BOTTOM_SHEET_HEIGHT,
  COMMUNITY_MAIN_SCREEN_REPORT_BOTTOM_SHEET_HEIGHT,
} from 'src/constants';
import { BottomSheetRefProps } from 'src/types';

export const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = (isChatScreen: boolean) => {
    bottomSheetRef.current?.scrollTo(
      isChatScreen
        ? COMMUNITY_CHAT_SCREEN_REPORT_BOTTOM_SHEET_HEIGHT
        : COMMUNITY_MAIN_SCREEN_REPORT_BOTTOM_SHEET_HEIGHT,
    );
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.scrollTo(0);
  };

  return {
    bottomSheetRef,
    closeBottomSheet,
    openBottomSheet,
  };
};
