import { useRef } from 'react';
import { runOnJS } from 'react-native-reanimated';

import { useSetRecoilState } from 'recoil';

import { backDropVisibleAtom } from 'src/atoms';
import { BottomSheetRefProps } from 'src/components';

export const useBottomSheet = () => {
  const setBackDropVisible = useSetRecoilState(backDropVisibleAtom);
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const openBottomSheet = () => {
    runOnJS(setBackDropVisible)(true);
    bottomSheetRef.current?.scrollTo(-300);
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
