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
import Icons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';
import { Portal } from '@gorhom/portal';

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
    const theme = useTheme();
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
          runOnJS(setEnableScroll)(false);
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

    const onTouchStart = useCallback(() => {
      scrollTo(0);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      runOnJS(setEnableScroll)(false);
    }, [scrollTo]);

    const onScroll = useAnimatedScrollHandler({
      onBeginDrag: (event) => {
        console.log(event.contentOffset.y, 'onBeginDrag');
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
        <Portal>
          <GestureDetector gesture={gesture}>
            <S.ReportBottomSheetContainer
              style={[rBottomSheetStyle, { backgroundColor: theme.background }]}
            >
              <S.ReportBottomSheetLine style={{ backgroundColor: theme.placeholder }} />
              <S.ReportBottomSheetHeader>
                <Text size={16} fontFamily="bold" color={theme.default}>
                  이 게시물을 신고하는 이유
                </Text>
                <Text size={13} color={theme.placeholder}>
                  지적재산권 침해를 신고하는 경우를 제외하고 회원님의 신고는 익명으로 처리됩니다.
                  누군가 위급한 상황에 있다고 생각된다면 즉시 문의 주시기 바랍니다.
                </Text>
              </S.ReportBottomSheetHeader>
              <ReAnimated.FlatList
                data={REPORT_LIST}
                {...rest}
                scrollEnabled={enableScroll}
                bounces={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                numColumns={1}
                contentContainerStyle={{
                  width: '100%',
                  paddingBottom: 100,
                  paddingTop: 10,
                }}
                initialScrollIndex={0}
                ref={flatListRef}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableHighlight onPress={() => null} key={index}>
                      <S.ReportBottmoSheetOptionList
                        style={[
                          {
                            borderTopColor: theme.lightGray,
                            borderTopWidth: 1,
                            backgroundColor: theme.modalBg,
                          },
                          index === REPORT_LIST.length - 1 && {
                            borderBottomWidth: 1,
                            borderBottomColor: theme.lightGray,
                          },
                        ]}
                      >
                        <Text size={15} color={theme.default}>
                          {item}
                        </Text>
                        <Icons name="chevron-forward" size={26} color={theme.placeholder} />
                      </S.ReportBottmoSheetOptionList>
                    </TouchableHighlight>
                  );
                }}
              />
            </S.ReportBottomSheetContainer>
          </GestureDetector>
        </Portal>
      </>
    );
  },
);
