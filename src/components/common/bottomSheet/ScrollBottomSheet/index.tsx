/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dimensions, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  AnimatedScrollViewProps,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

import { ScaleOpacity } from '../../ScaleOpacity';

import * as S from './styled';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

interface ScrollBottomSheetProps extends AnimatedScrollViewProps {
  scrollHeight: number;
  hasPermission: boolean;
}

export type ScrollBottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

export const ScrollBottomSheet = React.forwardRef<
  ScrollBottomSheetRefProps,
  ScrollBottomSheetProps
>(({ scrollHeight, hasPermission, ...rest }: ScrollBottomSheetProps, ref) => {
  const inset = useSafeAreaInsets();
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const [enableScroll, setEnableScroll] = useState(false);
  const scrollBegin = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const scrollTo = useCallback(
    (destination: number) => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, {
        damping: 100,
        stiffness: 400,
      });
    },
    [active, translateY],
  );

  const isActive = useCallback(() => {
    'worklet';
    return active.value;
  }, [active]);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      if (event.translationY > 0 && scrollY.value === 0) {
        runOnJS(setEnableScroll)(false);
      }
    })
    .onEnd(() => {
      if (translateY.value > scrollHeight) {
        scrollTo(0);
      } else if (translateY.value < context.value.y) {
        scrollTo(-SCREEN_HEIGHT + inset.top);
        runOnJS(setEnableScroll)(true);
      } else {
        runOnJS(setEnableScroll)(false);
        scrollTo(scrollHeight);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  const rBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active.value ? 1 : 0),
    };
  }, []);

  const rBackdropProps = useAnimatedProps(() => {
    return {
      pointerEvents: active.value ? 'auto' : 'none',
    } as any;
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag: (event) => {
      scrollBegin.value = event.contentOffset.y;
    },
    onMomentumEnd: (event) => {
      if (event.contentOffset.y === 0) {
        runOnJS(setEnableScroll)(true);
      }
    },
    onEndDrag: (event) => {
      if (event.contentOffset.y === 0) {
        runOnJS(setEnableScroll)(false);
        scrollTo(scrollHeight);
      }
    },
  });

  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPhotos = useCallback(async () => {
    const res = await CameraRoll.getPhotos({
      first: 27,
      assetType: 'Photos',
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    setPhotos(res?.edges);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (hasPermission) {
      console.log('hasPermission');
      fetchPhotos();
    }
  }, [hasPermission, fetchPhotos]);

  return (
    <>
      <Animated.View
        onTouchStart={() => {
          scrollTo(0);
          runOnJS(setEnableScroll)(false);
        }}
        animatedProps={rBackdropProps}
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.4)',
            paddingBottom: inset.bottom,
          },
          rBackdropStyle,
        ]}
      />
      <GestureDetector gesture={gesture}>
        <S.ScrollBottomSheetContainer style={rBottomSheetStyle}>
          <S.ScrollBottomSheetLine />
          <GestureDetector gesture={gesture}>
            <Animated.FlatList
              data={isLoading ? Array(15).fill('') : photos}
              {...rest}
              scrollEnabled={enableScroll}
              bounces={false}
              scrollEventThrottle={16}
              onScroll={onScroll}
              numColumns={3}
              contentContainerStyle={{ paddingBottom: 70, paddingTop: 10 }}
              renderItem={({ item }) => {
                return (
                  <ScaleOpacity style={{ width: '33%' }} onPress={() => console.log('pressed')}>
                    <S.Image
                      key={item?.node?.image?.uri}
                      source={{ uri: item?.node?.image?.uri }}
                      height={140}
                      resizeMode="cover"
                    />
                  </ScaleOpacity>
                );
              }}
            />
          </GestureDetector>
        </S.ScrollBottomSheetContainer>
      </GestureDetector>
    </>
  );
});
