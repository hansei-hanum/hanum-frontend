import { useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export interface AnimatedHocProps {
  duration?: number;
  children: React.ReactNode;
  isOpen: boolean;
}
export const AnimatedHoc: React.FC<AnimatedHocProps> = ({ duration, children, isOpen }) => {
  const [init, setInit] = useState<boolean>(false);
  const [_height, setHeight] = useState<number>(0);
  const viewHeight = useSharedValue(0);

  useEffect(() => {
    if (!init && _height > 0 && isOpen) {
      viewHeight.value = _height;
      setInit(true);
    } else {
      viewHeight.value = 0;
      setInit(false);
    }
  }, [_height, isOpen]);

  const onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  };

  const fadeDown = useAnimatedStyle(() => {
    return {
      height: withTiming(viewHeight.value, {
        duration: duration || 250,
      }),
    };
  }, [init]);
  return (
    <>
      <Animated.View style={[{ height: 0, overflow: 'hidden', width: '100%' }, fadeDown]}>
        {children}
      </Animated.View>

      {!_height && !isOpen && (
        <View onLayout={onLayout} style={{ opacity: 0 }}>
          {children}
        </View>
      )}
    </>
  );
};
