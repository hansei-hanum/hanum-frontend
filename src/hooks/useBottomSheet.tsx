import { useRef } from 'react';

import { BottomSheetRefProps } from 'src/types';

export const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = ({ scrollTo }: { scrollTo: number }) => {
    bottomSheetRef.current?.scrollTo(scrollTo);
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
