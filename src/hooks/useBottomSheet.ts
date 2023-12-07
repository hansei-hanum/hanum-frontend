import { useRef } from 'react';

import { BottomSheetRefProps } from 'src/components';

export const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return {
    bottomSheetRef,
    openBottomSheet,
  };
};
