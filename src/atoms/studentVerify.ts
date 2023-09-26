import { atom } from 'recoil';

import { VerificationUser } from 'src/api';

export const meberVerifyState = atom<Omit<VerificationUser, 'graduated_at' | 'valid_until'>>({
  key: 'meberVerifyState',
  default: {
    type: null,
    department: null,
    grade: null,
    classroom: null,
    number: null,
    isUsed: false,
  },
});
