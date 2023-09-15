import { useState } from 'react';
import { Animated, Easing } from 'react-native';

import { colors } from 'src/styles';

export const usePressingAnimation = () => {
  const [animation] = useState(new Animated.Value(1)); // 애니메이션 값 초기화

  const handlePressIn = () => {
    // 버튼을 누를 때 작아지는 애니메이션 적용
    Animated.timing(animation, {
      toValue: 0.96, // 작아지는 정도
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // 버튼을 뗄 때 복귀하는 애니메이션 적용
    Animated.timing(animation, {
      toValue: 1, // 원래 크기로 복귀
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  // 애니메이션 값을 스타일에 적용
  const animatedStyle = {
    transform: [{ scale: animation }],
    backgroundColor: animation.interpolate({
      inputRange: [0.96, 1], // 작아진 상태와 원래 크기의 중간 값
      outputRange: [colors.lightGray, colors.white], // 해당 범위에 따른 색깔 변화
    }),
  };

  const buttonAnimatedStyle = {
    transform: [{ scale: animation }],
  };

  return { animatedStyle, buttonAnimatedStyle, handlePressIn, handlePressOut };
};
