import { atom } from 'recoil';

import {
  ANONYMITY_OPTION_LIST,
  AnonymityOptionItems,
  LIMITED_VISIBLE_TYPE_LIST,
  VISIBLE_TYPE_LIST,
  VisibleTypeItems,
} from 'src/constants';

export const visibleTypeAtom = atom<VisibleTypeItems['text']>({
  key: 'visibleTypeAtom',
  default: VISIBLE_TYPE_LIST[0].text,
});

export const anonymityTypeAtom = atom<AnonymityOptionItems['title']>({
  key: 'anonymityTypeAtom',
  default: ANONYMITY_OPTION_LIST[0].title,
});
