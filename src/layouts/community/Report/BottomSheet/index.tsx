/* eslint-disable @typescript-eslint/no-explicit-any */
import { Animated, FlatList } from 'react-native';
import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  AnimatedScrollViewProps,
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

import { useTheme } from '@emotion/react';
import { Portal } from '@gorhom/portal';

import { BackDrop } from 'src/components';
import { BottomSheetRefProps } from 'src/types';
import { SCREEN_HEIGHT } from 'src/constants';

import { OptionWindow } from '../OptionWindow';
import { ReportCompleteWindow } from '../CompleteWindow';

import * as S from './styled';

interface ReportBottomSheetProps extends AnimatedScrollViewProps {
  scrollHeight: number;
  reportScreenAnimationValue: Animated.Value;
}

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

export const ReportBottomSheet = React.forwardRef<BottomSheetRefProps, ReportBottomSheetProps>(
  ({ scrollHeight, reportScreenAnimationValue }: ReportBottomSheetProps, ref) => {
    const theme = useTheme();

    const flatListRef = useRef<FlatList>(null);

    const inset = useSafeAreaInsets();

    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const scrollBegin = useSharedValue(0);
    const scrollY = useSharedValue(0);

    const [enableScroll, setEnableScroll] = useState(false);
    const [reportWindowOpen, setReportWindowOpen] = useState(false);

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
        if (!reportWindowOpen) {
          if (translateY.value > scrollHeight / 1.2) {
            runOnJS(setEnableScroll)(false);
            scrollTo(0);
          } else if (translateY.value < context.value.y) {
            scrollTo(-SCREEN_HEIGHT + inset.top);
            runOnJS(setEnableScroll)(true);
          } else {
            runOnJS(setEnableScroll)(false);
            scrollTo(scrollHeight);
          }
        } else {
          if (translateY.value > scrollHeight / 1.2) {
            scrollTo(0);
          } else {
            scrollTo(scrollHeight);
          }
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
        opacity: withTiming(active.value ? 1 : 0),
      };
    }, []);

    const rBackdropProps = useAnimatedProps(() => {
      return {
        pointerEvents: active.value ? 'auto' : 'none',
      } as any;
    }, []);

    const onTouchStart = useCallback(() => {
      setEnableScroll(false);
      scrollTo(0);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, [scrollTo]);

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

    const openReportScreen = () => {
      scrollTo(scrollHeight);
      setEnableScroll(false);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      setReportWindowOpen(true);
      const traslateX = Animated.timing(reportScreenAnimationValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      });
      traslateX.start();
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
            <S.ReportBottomSheetContainer
              style={[rBottomSheetStyle, { backgroundColor: theme.background }]}
            >
              <S.ReportBottomSheetLine style={{ backgroundColor: theme.placeholder }} />
              <ReportCompleteWindow
                setReportWindowOpen={setReportWindowOpen}
                reportBottomSheetRef={ref as React.RefObject<BottomSheetRefProps>}
                reportScreenAnimationValue={reportScreenAnimationValue}
                theme={theme}
              />
              <OptionWindow
                theme={theme}
                flatListRef={flatListRef}
                enableScroll={enableScroll}
                onScroll={onScroll}
                onPress={openReportScreen}
              />
            </S.ReportBottomSheetContainer>
          </GestureDetector>
        </Portal>
      </>
    );
  },
);
