import { atom } from 'recoil';

import { VISIBLE_TYPE_LIST, VisibleTypeItems } from 'src/constants';

export const visibleTypeAtom = atom<VisibleTypeItems['text']>({
  key: 'visibleTypeAtom',
  default: VISIBLE_TYPE_LIST[0].text,
});

export const anonymityTypeAtom = atom({
  key: 'anonymityTypeAtom',
  default: '설명 표시',
});
