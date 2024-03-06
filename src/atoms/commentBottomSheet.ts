import { atom } from 'recoil';

export const commentBottomSheetAtom = atom<boolean>({
  key: 'commentBottomSheetAtom',
  default: false,
});
