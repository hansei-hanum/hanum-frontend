import { atom } from 'recoil';

import {
  ANONYMITY_OPTION_LIST,
  AnonymityOptionItems,
  VISIBLE_TYPE_LIST,
  VisibleTypeItems,
} from 'src/constants';

export const visibleTypeAtom = atom<VisibleTypeItems['text']>({
  key: 'visibleTypeAtom',
  default: VISIBLE_TYPE_LIST[0].text,
});

export interface AnonymityTypeProps {
  type: AnonymityOptionItems['title'];
  nickname?: string;
}

export const anonymityTypeAtom = atom<AnonymityTypeProps>({
  key: 'anonymityTypeAtom',
  default: {
    type: ANONYMITY_OPTION_LIST[0].title,
    nickname: '',
  },
});
