import { useRef } from 'react';

import { BottomSheetRefProps } from 'src/components';

export const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = (isChat?: boolean) => {
    bottomSheetRef.current?.scrollTo(isChat ? -250 : -300);
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
