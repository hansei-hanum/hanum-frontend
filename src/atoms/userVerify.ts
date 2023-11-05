import { atom } from 'recoil';

import { VerificationUser } from 'src/api';

export const userVerifyAtom = atom<Omit<VerificationUser, 'graduated_at' | 'valid_until'>>({
  key: 'userVerifyAtom',
  default: {
    type: null,
    department: null,
    grade: null,
    classroom: null,
    number: null,
    isUsed: false,
  },
});
