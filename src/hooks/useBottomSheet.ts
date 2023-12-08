import { useRef } from 'react';

import { useSetRecoilState } from 'recoil';

import { backDropVisibleAtom } from 'src/atoms';
import { BottomSheetRefProps } from 'src/components';

export const useBottomSheet = () => {
  const setBackDropVisible = useSetRecoilState(backDropVisibleAtom);
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = () => {
    setBackDropVisible(true);
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    setBackDropVisible(false);
    bottomSheetRef.current?.close();
  };

  return {
    bottomSheetRef,
    closeBottomSheet,
    openBottomSheet,
  };
};
