import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export const useBlockGesture = (isLoading: boolean) => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      return isLoading;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    if (isLoading) {
      navigation.setOptions({
        gestureEnabled: false,
      });
    } else {
      navigation.setOptions({
        gestureEnabled: true,
      });
    }

    return () => backHandler.remove();
  }, [isLoading]);
};
