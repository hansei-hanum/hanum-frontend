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
  activeScale?: boolean;
}

export type ScaleOpacityProps = ScaleOpacityCustomProps & TouchableOpacityProps;

export const ScaleOpacity: React.FC<ScaleOpacityProps> = ({
  children,
  onPress,
  style,
  activeScale = true,
  ...props
}) => {
  const { scaleAnimatedStyle, handlePressIn, handlePressOut } = usePressingAnimation();

  return (
    <TouchableOpacity
      {...(activeScale
        ? {
            activeOpacity: 0.8,
            onPressIn: handlePressIn,
            onPressOut: handlePressOut,
            onPress: onPress,
          }
        : {
            activeOpacity: 1,
          })}
      style={style}
      {...props}
    >
      <Animated.View style={scaleAnimatedStyle}>{children}</Animated.View>
    </TouchableOpacity>
  );
};
