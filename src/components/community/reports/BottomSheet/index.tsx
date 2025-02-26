import { Animated } from 'react-native';
import React, { useCallback, useImperativeHandle, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  AnimatedScrollViewProps,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@emotion/react';
import { Portal } from '@gorhom/portal';

import { BackDrop } from 'src/components';
import { BottomSheetRefProps } from 'src/types';

import { OptionList } from '../OptionList';
import { ReportCompleteWindow } from '../CompleteWindow';

import * as S from './styled';

interface ReportBottomSheetProps extends AnimatedScrollViewProps {
  isUserReport?: boolean;
  scrollHeight: number;
  reportScreenAnimationValue: Animated.Value;
}

export const ReportBottomSheet = React.forwardRef<BottomSheetRefProps, ReportBottomSheetProps>(
  ({ scrollHeight, reportScreenAnimationValue, isUserReport }: ReportBottomSheetProps, ref) => {
    const reportWindowHeight = -320;
    const theme = useTheme();

    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const [reportWindowOpen, setReportWindowOpen] = useState(false);

    const MAX_TRANSLATE_Y = !reportWindowOpen ? scrollHeight - 50 : reportWindowHeight - 50;

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
        if (!reportWindowOpen) {
          if (translateY.value > scrollHeight / 1.2) {
            scrollTo(0);
          } else {
            scrollTo(scrollHeight);
          }
        } else {
          if (translateY.value > reportWindowHeight / 1.2) {
            runOnJS(setReportWindowOpen)(false);
            scrollTo(0);
          } else {
            scrollTo(reportWindowHeight);
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
      };
    }, []);

    const onTouchStart = useCallback(() => {
      scrollTo(0);
      setReportWindowOpen(false);
    }, [scrollTo]);

    const openReportScreen = () => {
      scrollTo(reportWindowHeight);
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
                reportWindowHeight={reportWindowHeight}
                setReportWindowOpen={setReportWindowOpen}
                reportBottomSheetRef={ref as React.RefObject<BottomSheetRefProps>}
                reportScreenAnimationValue={reportScreenAnimationValue}
                theme={theme}
              />
              <OptionList isUserReport={isUserReport} theme={theme} onPress={openReportScreen} />
            </S.ReportBottomSheetContainer>
          </GestureDetector>
        </Portal>
      </>
    );
  },
);
