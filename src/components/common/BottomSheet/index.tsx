import React, { ReactNode, forwardRef, useCallback, useImperativeHandle } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { backDropVisibleAtom } from 'src/atoms';

import * as S from './styled';

type BottomSheetProps = {
  snapTo: string;
  children?: ReactNode;
  withModal?: boolean;
};

export interface BottomSheetRefProps {
  expand: () => void;
  close: () => void;
}

export const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ snapTo, children, withModal }: BottomSheetProps, ref) => {
    const [backDropVisible, setBackDropVisible] = useRecoilState(backDropVisibleAtom);
    const theme = useTheme();

    const inset = useSafeAreaInsets();

    const { height } = Dimensions.get('screen');

    const percentage = parseFloat(snapTo.replace('%', '')) / 100; // 50% -> 0.5
    const closeHeight = height;
    const openHeight = height - height * percentage;

    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(openHeight, {
        duration: 200,
      });
    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
      'worklet';
      runOnJS(setBackDropVisible)(false);
      topAnimation.value = withTiming(closeHeight, {
        duration: 200,
      });
    }, [closeHeight, topAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return { top };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate((event) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(context.value + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (topAnimation.value > openHeight + 20) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
          runOnJS(setBackDropVisible)(false);
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    const backDropAnimation = useAnimatedStyle(() => {
      const animation = interpolate(topAnimation.value, [closeHeight, openHeight], [0, 0.5]);
      let opacity = 0;
      if (withModal) {
        opacity = backDropVisible ? 0.5 : 0;
      } else {
        opacity = animation;
      }
      const display = opacity === 0 ? 'none' : 'flex';
      return {
        opacity,
        display,
      };
    });

    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => {
            close();
          }}
        >
          <S.BottomSheetBackDrop style={[backDropAnimation, { backgroundColor: theme.black }]} />
        </TouchableWithoutFeedback>
        <GestureDetector gesture={pan}>
          <S.BottomSheetContainer
            style={[
              animationStyle,
              {
                backgroundColor: theme.background,
                paddingBottom: inset.bottom,
              },
            ]}
          >
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            {children}
          </S.BottomSheetContainer>
        </GestureDetector>
      </>
    );
  },
);

const styles = StyleSheet.create({
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'gray',
    borderRadius: 20,
  },
});
