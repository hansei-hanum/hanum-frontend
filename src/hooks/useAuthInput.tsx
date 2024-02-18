import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { isDisableAtom } from 'src/atoms';
import { checkType } from 'src/utils';

export const useAuthInput = (regex: RegExp, isPhone?: boolean) => {
  const checkValid = checkType(isPhone ? 'number' : 'string');
  const [value, setValue] = useState('');
  const setIsDisabled = useSetRecoilState(isDisableAtom);

  const onChange = (input: string) => {
    const validInput = checkValid(input);
    setIsDisabled(!regex.test(validInput));
    setValue(validInput);
  };

  return { value, onChange };
};
