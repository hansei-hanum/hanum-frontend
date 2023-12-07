/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Animated,
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
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

import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

import { useTheme } from '@emotion/react';

import { Button, Icon, ScaleOpacity, Spinner, Text } from 'src/components';
import { PhotoPermissionProps } from 'src/screens';
import { isIos } from 'src/utils';

import * as S from './styled';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

interface ScrollBottomSheetProps extends AnimatedScrollViewProps {
  scrollHeight: number;
  permission: PhotoPermissionProps;
}

export type ScrollBottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};
const REPLY_BOX_IOS_OFFSET = -30;
const REPLY_BOX_ANDROID_OFFSET = -60.6;

export const ScrollBottomSheet = React.forwardRef<
  ScrollBottomSheetRefProps,
  ScrollBottomSheetProps
>(({ scrollHeight, permission, ...rest }: ScrollBottomSheetProps, ref) => {
  const hasPermission = permission.granted || permission.limited;

  const theme = useTheme();

  const flatListRef = useRef<FlatList>(null);

  const inset = useSafeAreaInsets();

  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const scrollBegin = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const buttonTranslateY = useRef<any>(new Animated.Value(0)).current;

  const [enableScroll, setEnableScroll] = useState(false);
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getPhotosNum, setGetPhotosNum] = useState(60);
  const [selectedPhotos, setSelectedPhotos] = useState<boolean[]>([]);

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
        runOnJS(setSelectedPhotos)([]);
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
    runOnJS(setSelectedPhotos)([]);
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

  const fetchPhotos = useCallback(async () => {
    setIsLoading(true);
    const res = await CameraRoll.getPhotos({
      first: getPhotosNum,
      assetType: 'Photos',
    });
    await new Promise((resolve) => setTimeout(resolve, 300));
    setPhotos(res?.edges);
    setIsLoading(false);
  }, [getPhotosNum]);

  const endReached = () => {
    if (!isLoading && photos.length >= getPhotosNum) {
      setGetPhotosNum((prev) => prev + getPhotosNum);
    }
  };

  const selectPhoto = useCallback(
    (index: number) => {
      if (selectedPhotos.filter((item) => item).length < 10) {
        setSelectedPhotos((prev) => {
          const temp = [...prev];
          temp[index] = !temp[index];
          return temp;
        });
      } else {
        setSelectedPhotos((prev) => {
          const temp = [...prev];
          temp[index] = false;
          return temp;
        });
      }
    },
    [selectedPhotos],
  );

  const openPhotoSettings = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    if (hasPermission) {
      fetchPhotos();
    }
  }, [permission, fetchPhotos]);

  useEffect(() => {
    if (selectedPhotos.filter((item) => item).length > 0) {
      Animated.spring(buttonTranslateY, {
        toValue: isIos ? REPLY_BOX_IOS_OFFSET : REPLY_BOX_ANDROID_OFFSET,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(buttonTranslateY, {
        toValue: 50,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedPhotos]);

  return (
    <>
      <ReAnimated.View
        onTouchStart={onTouchStart}
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
          {permission ? (
            <>
              {permission.limited && (
                <S.WarningContainer>
                  <Text size={13} color={theme.placeholder}>
                    권한 설정에 따라 접근이 허가된 일부 사진만 표시돼요.
                  </Text>
                  <ScaleOpacity onPress={openPhotoSettings}>
                    <Text size={14}>설정</Text>
                  </ScaleOpacity>
                </S.WarningContainer>
              )}
              <GestureDetector gesture={gesture}>
                <ReAnimated.FlatList
                  data={photos}
                  {...rest}
                  scrollEnabled={enableScroll}
                  bounces={false}
                  scrollEventThrottle={16}
                  onScroll={onScroll}
                  numColumns={3}
                  contentContainerStyle={{
                    width: '100%',
                    ...(!permission.limited && { paddingTop: 10 }),
                    paddingBottom: 100,
                  }}
                  onEndReached={endReached}
                  onEndReachedThreshold={0.5}
                  initialScrollIndex={0}
                  ref={flatListRef}
                  ListFooterComponent={
                    isLoading ? (
                      <View style={{ marginTop: 10 }}>
                        <Spinner />
                      </View>
                    ) : null
                  }
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableWithoutFeedback onPress={() => selectPhoto(index)}>
                        <S.ImageWrapper>
                          {selectedPhotos[index] && (
                            <S.IconWrapper>
                              <Icons name="checkmark-circle" color={theme.primary} size={24} />
                            </S.IconWrapper>
                          )}
                          <S.Image
                            key={item?.node?.image?.uri}
                            source={{ uri: item?.node?.image?.uri }}
                            height={140}
                            resizeMode="cover"
                            style={{
                              opacity: selectedPhotos[index] ? 0.5 : 1,
                              borderColor: theme.lightGray,
                              borderWidth: 0.4,
                            }}
                          />
                        </S.ImageWrapper>
                      </TouchableWithoutFeedback>
                    );
                  }}
                />
              </GestureDetector>
            </>
          ) : (
            <S.PermissionDeninedContainer>
              <Icon icon="⚠️" size={60} includeBackground={false} />
              <Text size={13} color={theme.placeholder} isCenter style={{ width: '80%' }}>
                사진 라이브러리 접근 권한을 허용해요. 친구들과 사진들을 공유하기 위해서 권한을
                허용해주세요.
              </Text>
              <Button onPress={openPhotoSettings} isModalBtn>
                설정
              </Button>
            </S.PermissionDeninedContainer>
          )}
        </S.ScrollBottomSheetContainer>
      </GestureDetector>
      <S.ScrollBottomButtonWrapper
        ref={buttonTranslateY}
        style={{
          transform: [{ translateY: buttonTranslateY }],
        }}
      >
        <Button>선택된 사진 ({selectedPhotos.filter((item) => item).length})</Button>
      </S.ScrollBottomButtonWrapper>
    </>
  );
});
