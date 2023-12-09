import { useRef } from 'react';

import { COMMUNITY_BOTTOM_SHEET_HEIGHT } from 'src/constants';
import { BottomSheetRefProps } from 'src/types';

export const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.scrollTo(COMMUNITY_BOTTOM_SHEET_HEIGHT);
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
