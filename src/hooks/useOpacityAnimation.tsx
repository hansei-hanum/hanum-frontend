import { Animated } from 'react-native';

export interface IUseOpacityAnimation {
  animation: Animated.Value;
  value: number;
  duration?: number;
}

export const useSetAnimation = () => {
  const animation = ({ animation, value, duration = 200 }: IUseOpacityAnimation) => {
    Animated.timing(animation, {
      toValue: value,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  return { animation };
};
