import { useRecoilState } from 'recoil';

import { modalAtom } from 'src/atoms';

export const useModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalAtom);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { open, close, isOpen };
};
