import { atom } from 'recoil';

import { VerificationUser } from 'src/api';

export const useUserVerifyState = atom<Omit<VerificationUser, 'graduated_at' | 'valid_until'>>({
  key: 'useUserVerifyState',
  default: {
    type: null,
    department: null,
    grade: null,
    classroom: null,
    number: null,
    isUsed: false,
  },
});
