/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dimensions } from 'react-native';
import React, { useCallback, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { BackDrop } from '../BackDrop';

import * as S from './styled';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

interface BottomSheetProps {
  scrollHeight: number;
  children?: React.ReactNode;
  modalBackDropVisible?: boolean;
}

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

export const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ scrollHeight, children, modalBackDropVisible }: BottomSheetProps, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

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
      })
      .onEnd(() => {
        if (translateY.value > scrollHeight / 1.2) {
          scrollTo(0);
        } else {
          scrollTo(scrollHeight);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        'clamp',
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    const rBackdropStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active.value || modalBackDropVisible ? 1 : 0),
      };
    }, [modalBackDropVisible]);

    const rBackdropProps = useAnimatedProps(() => {
      return {
        pointerEvents: active.value ? 'auto' : 'none',
      } as any;
    }, []);

    const onTouchStart = () => {
      scrollTo(0);
    };

    return (
      <>
        <BackDrop
          onTouchStart={onTouchStart}
          rBackdropStyle={rBackdropStyle}
          rBackdropProps={rBackdropProps}
        />
        <GestureDetector gesture={gesture}>
          <S.ScrollBottomSheetContainer style={rBottomSheetStyle}>
            <S.ScrollBottomSheetLine />
            {children}
          </S.ScrollBottomSheetContainer>
        </GestureDetector>
      </>
    );
  },
);
