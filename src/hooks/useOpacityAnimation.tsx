import { Animated } from 'react-native';

export interface AnimationProps {
  animation: Animated.Value;
  value: number;
  duration?: number;
  useNativeDriver?: boolean;
}

export const useSetAnimation = () => {
  const animation = ({
    animation,
    value,
    duration = 200,
    useNativeDriver = true,
  }: AnimationProps) => {
    Animated.timing(animation, {
      toValue: value,
      duration: duration,
      useNativeDriver: useNativeDriver,
    }).start();
  };

  return { animation };
};
