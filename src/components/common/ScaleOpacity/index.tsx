import React from 'react';
import { Animated, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { usePressingAnimation } from 'src/hooks';

export interface ScaleOpacity {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ScaleOpacity: React.FC<ScaleOpacity> = ({ children, onPress, style }) => {
  const { scaleAnimatedStyle, handlePressIn, handlePressOut } = usePressingAnimation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
      onPress={onPress}
    >
      <Animated.View style={scaleAnimatedStyle}>{children}</Animated.View>
    </TouchableOpacity>
  );
};
