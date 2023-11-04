import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useRecoilValue } from 'recoil';

import { loadingAtom } from 'src/atoms/loading';

export const useBlockGesture = () => {
  const loading = useRecoilValue(loadingAtom);

  useEffect(() => {
    const backAction = () => {
      return loading;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [loading]);
};
