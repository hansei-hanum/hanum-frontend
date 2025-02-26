import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BackDropProps {
  onTouchStart: () => void;
  rBackdropStyle: {
    opacity: 0 | 1;
  };
  rBackdropProps: object;
}

export const BackDrop: React.FC<BackDropProps> = ({
  onTouchStart,
  rBackdropStyle,
  rBackdropProps,
}) => {
  const inset = useSafeAreaInsets();
  return (
    <Animated.View
      onTouchStart={onTouchStart}
      animatedProps={rBackdropProps}
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.4)',
          paddingBottom: inset.bottom,
          zIndex: 9999,
        },
        rBackdropStyle,
      ]}
    />
  );
};
