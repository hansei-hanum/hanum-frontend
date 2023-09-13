import { atom } from 'recoil';

import { VerificationUser } from 'src/api';

export const studentVerifyState = atom<
  Omit<VerificationUser, 'type' | 'graduated_at' | 'valid_until'>
>({
  key: 'studentVerifyState',
  default: {
    department: null,
    grade: null,
    classroom: null,
    number: null,
    isUsed: false,
  },
});
