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
import { ViewProps } from 'react-native';

import { Portal } from '@gorhom/portal';
import { useTheme } from '@emotion/react';

import { BottomSheetRefProps } from 'src/types';
import { SCREEN_HEIGHT } from 'src/constants';

import { BackDrop } from '../BackDrop';

import * as S from './styled';

interface BottomSheetProps {
  maxScrollHeight?: number;
  scrollHeight: number;
  children?: React.ReactNode;
  modalBackDropVisible?: boolean;
  style?: ViewProps['style'];
  onBottomSheetClosePress?: () => void;
}

export const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  (
    {
      scrollHeight,
      children,
      modalBackDropVisible,
      maxScrollHeight,
      style,
      onBottomSheetClosePress,
    }: BottomSheetProps,
    ref,
  ) => {
    const MAX_TRANSLATE_Y = !maxScrollHeight ? -SCREEN_HEIGHT + 50 : maxScrollHeight - 50;

    const theme = useTheme();
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
          onBottomSheetClosePress && onBottomSheetClosePress();
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
      };
    }, []);

    const onTouchStart = () => {
      onBottomSheetClosePress && onBottomSheetClosePress();
      scrollTo(0);
    };

    return (
      <>
        <BackDrop
          onTouchStart={onTouchStart}
          rBackdropStyle={rBackdropStyle}
          rBackdropProps={rBackdropProps}
        />
        <Portal>
          <GestureDetector gesture={gesture}>
            <S.ScrollBottomSheetContainer
              style={[rBottomSheetStyle, { backgroundColor: theme.background }, style]}
            >
              <S.ScrollBottomSheetLine style={{ backgroundColor: theme.placeholder }} />
              {children}
            </S.ScrollBottomSheetContainer>
          </GestureDetector>
        </Portal>
      </>
    );
  },
);
