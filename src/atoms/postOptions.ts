import { atom } from 'recoil';

import {
  ANONYMITY_OPTION_LIST,
  AnonymityOptionItems,
  LIMITED_VISIBLE_TYPE_LIST,
  VISIBLE_TYPE_LIST,
  VisibleTypeItems,
} from 'src/constants';

export interface VisibleTypeProps {
  text: VisibleTypeItems['text'];
  limitType: string;
}

export const visibleTypeAtom = atom<VisibleTypeProps>({
  key: 'visibleTypeAtom',
  default: {
    text: VISIBLE_TYPE_LIST[0].text,
    limitType: LIMITED_VISIBLE_TYPE_LIST[0],
  },
});

export const anonymityTypeAtom = atom<AnonymityOptionItems['title']>({
  key: 'anonymityTypeAtom',
  default: ANONYMITY_OPTION_LIST[0].title,
});
