import React from 'react';
import {
  Animated,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { usePressingAnimation } from 'src/hooks';

export interface ScaleOpacityCustomProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export type ScaleOpacityProps = ScaleOpacityCustomProps & TouchableOpacityProps;

export const ScaleOpacity: React.FC<ScaleOpacityProps> = ({
  children,
  onPress,
  style,
  ...props
}) => {
  const { scaleAnimatedStyle, handlePressIn, handlePressOut } = usePressingAnimation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
      onPress={onPress}
      {...props}
    >
      <Animated.View style={scaleAnimatedStyle}>{children}</Animated.View>
    </TouchableOpacity>
  );
};
