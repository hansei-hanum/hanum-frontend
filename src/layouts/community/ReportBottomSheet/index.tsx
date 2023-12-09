/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dimensions, FlatList, TouchableHighlight } from 'react-native';
import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ReAnimated, {
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

import { BackDrop, Text } from 'src/components';
import { REPORT_LIST } from 'src/constants';
import { BottomSheetRefProps } from 'src/types';

import * as S from './styled';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

interface ReportBottomSheetProps extends AnimatedScrollViewProps {
  scrollHeight: number;
}

export const ReportBottomSheet = React.forwardRef<BottomSheetRefProps, ReportBottomSheetProps>(
  ({ scrollHeight, ...rest }: ReportBottomSheetProps, ref) => {
    const flatListRef = useRef<FlatList>(null);

    const inset = useSafeAreaInsets();

    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const scrollBegin = useSharedValue(0);
    const scrollY = useSharedValue(0);

    const [enableScroll, setEnableScroll] = useState(false);

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
        if (translateY.value > scrollHeight / 1.2) {
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

    const onTouchStart = () => {
      scrollTo(0);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      runOnJS(setEnableScroll)(false);
    };

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

    return (
      <>
        <BackDrop
          onTouchStart={onTouchStart}
          rBackdropStyle={rBackdropStyle}
          rBackdropProps={rBackdropProps}
        />
        <GestureDetector gesture={gesture}>
          <S.ReportBottomSheetContainer style={rBottomSheetStyle}>
            <S.ReportBottomSheetLine />
            <ReAnimated.FlatList
              data={REPORT_LIST}
              {...rest}
              scrollEnabled={enableScroll}
              bounces={false}
              scrollEventThrottle={16}
              onScroll={onScroll}
              numColumns={3}
              contentContainerStyle={{
                width: '100%',
                paddingBottom: 100,
              }}
              initialScrollIndex={0}
              ref={flatListRef}
              renderItem={({ item, index }) => {
                return (
                  <TouchableHighlight onPress={() => null}>
                    <Text size={15}>잉기 디밍기</Text>
                  </TouchableHighlight>
                );
              }}
            />
          </S.ReportBottomSheetContainer>
        </GestureDetector>
      </>
    );
  },
);
