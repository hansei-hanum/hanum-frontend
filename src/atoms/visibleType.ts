import { atom } from 'recoil';

export type VisibleTypeEnum = 'ALL' | 'LIMITED' | 'STUDENT';

export const visibleTypeAtom = atom<VisibleTypeEnum>({
  key: 'visibleTypeAtom',
  default: 'ALL' as VisibleTypeEnum,
});
