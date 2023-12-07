import { useRef } from 'react';

import { BottomSheetRefProps } from 'src/components';

export const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = () => {
    console.log('openBottomSheet', bottomSheetRef.current);
    bottomSheetRef.current?.expand();
  };

  return {
    bottomSheetRef,
    openBottomSheet,
  };
};
