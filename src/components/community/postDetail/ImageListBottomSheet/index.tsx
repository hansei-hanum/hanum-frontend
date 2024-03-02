/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Linking,
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
import { Portal } from '@gorhom/portal';

import { BackDrop, Button, Icon, ScaleOpacity, Text } from 'src/components';
import { PhotoPermissionProps, selectedPhotosInterface } from 'src/screens';
import { isIos } from 'src/utils';
import { BottomSheetRefProps } from 'src/types';
import { SCREEN_HEIGHT } from 'src/constants';

import * as S from './styled';

interface ImageListBottomSheetProps extends AnimatedScrollViewProps {
  scrollHeight: number;
  permission: PhotoPermissionProps;
  setSelectedPhotos: React.Dispatch<React.SetStateAction<selectedPhotosInterface[]>>;
  selectedPhotos: selectedPhotosInterface[];
  setDoneCheck: React.Dispatch<React.SetStateAction<boolean>>;
  doneCheck: boolean;
}

const REPLY_BOX_IOS_OFFSET = -70;
const REPLY_BOX_ANDROID_OFFSET = -40.6;

export const ImageListBottomSheet = React.forwardRef<
  BottomSheetRefProps,
  ImageListBottomSheetProps
>(
  (
    {
      scrollHeight,
      permission,
      setSelectedPhotos,
      selectedPhotos,
      setDoneCheck,
      doneCheck,
      ...rest
    }: ImageListBottomSheetProps,
    ref,
  ) => {
    const hasPermission = permission.granted || permission.limited;

    const theme = useTheme();

    const flatListRef = useRef<FlatList>(null);

    const inset = useSafeAreaInsets();
    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 20;

    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const scrollBegin = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const buttonTranslateY = useRef<any>(new Animated.Value(0)).current;

    const [enableScroll, setEnableScroll] = useState(false);
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [getPhotosNum, setGetPhotosNum] = useState(60);

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
        if (hasPermission) {
          if (translateY.value > scrollHeight) {
            scrollTo(0);
          } else if (translateY.value < context.value.y && -SCREEN_HEIGHT + inset.top) {
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

    const onTouchStart = () => {
      scrollTo(0);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      runOnJS(setEnableScroll)(false);
      runOnJS(setDoneCheck)(true);
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
      (props: selectedPhotosInterface) => {
        if (selectedPhotos.length < 10) {
          setSelectedPhotos((prev) => {
            const temp = [...prev];
            if (!selectedPhotos.find((photo) => photo.uri === props.uri)) {
              temp.push(props);
            } else {
              temp.splice(temp.indexOf(props), 1);
            }
            return temp;
          });
        } else {
          setSelectedPhotos((prev) => {
            const temp = [...prev];
            if (!selectedPhotos.find((photo) => photo.uri === props.uri)) {
              temp.splice(temp.indexOf(props), 1);
            }
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

    const onButtonPress = () => {
      runOnJS(setDoneCheck)(true);
      scrollTo(0);
      Animated.spring(buttonTranslateY, {
        toValue: 50,
        useNativeDriver: true,
      }).start();
    };

    useEffect(() => {
      if (selectedPhotos.length > 0 && !doneCheck) {
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
    }, [selectedPhotos, doneCheck, buttonTranslateY]);

    return (
      <Portal>
        <BackDrop
          onTouchStart={onTouchStart}
          rBackdropStyle={rBackdropStyle}
          rBackdropProps={rBackdropProps}
        />
        <GestureDetector gesture={gesture}>
          <S.ImageListBottomSheetContainer
            style={[rBottomSheetStyle, { backgroundColor: theme.background }]}
          >
            <S.ImageListBottomSheetLine style={{ backgroundColor: theme.placeholder }} />
            {hasPermission ? (
              <>
                {permission.limited && (
                  <S.WarningContainer>
                    <Text size={13} color={theme.placeholder}>
                      권한 설정에 따라 접근이 허가된 일부 사진만 표시돼요.
                    </Text>
                    <ScaleOpacity onPress={openPhotoSettings}>
                      <Text size={14} color={theme.primary}>
                        설정
                      </Text>
                    </ScaleOpacity>
                  </S.WarningContainer>
                )}
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
                        <ActivityIndicator size={26} color={theme.placeholder} />
                      </View>
                    ) : null
                  }
                  renderItem={({ item }) => {
                    const uri = item?.node?.image?.uri;
                    const name = item?.node?.image?.filename || 'image.png';
                    const isSelected = (uri: string) => {
                      return selectedPhotos.find((photo) => photo.uri === uri);
                    };
                    return (
                      <TouchableWithoutFeedback onPress={() => selectPhoto({ uri, name })}>
                        <S.ImageWrapper>
                          {isSelected(uri) && (
                            <S.IconWrapper>
                              <Icons name="checkmark-circle" color={theme.primary} size={24} />
                            </S.IconWrapper>
                          )}
                          <S.Image
                            key={uri}
                            source={{ uri }}
                            height={140}
                            resizeMode="cover"
                            style={{
                              opacity: isSelected(uri) ? 0.5 : 1,
                              borderColor: theme.lightGray,
                              borderWidth: 0.4,
                            }}
                          />
                        </S.ImageWrapper>
                      </TouchableWithoutFeedback>
                    );
                  }}
                />
              </>
            ) : (
              <S.PermissionDeninedContainer>
                <Icon icon="⚠️" size={60} includeBackground={false} />
                <Text size={15} color={theme.placeholder} isCenter style={{ width: '80%' }}>
                  사진 라이브러리 접근 권한을 허용해요. 친구들과 사진들을 공유하기 위해서 권한을
                  허용해주세요.
                </Text>
                <Button onPress={openPhotoSettings} isModalBtn>
                  <Text size={17} color={theme.primary}>
                    설정
                  </Text>
                </Button>
              </S.PermissionDeninedContainer>
            )}
          </S.ImageListBottomSheetContainer>
        </GestureDetector>
        <S.ImageListBottomSheetButtonWrapper
          ref={buttonTranslateY}
          style={{
            transform: [{ translateY: buttonTranslateY }],
          }}
        >
          <Button backgroundColor={theme.primary} onPress={onButtonPress}>
            <Text size={16} color={theme.white}>
              사진 ({selectedPhotos.length}) 보내기
            </Text>
          </Button>
        </S.ImageListBottomSheetButtonWrapper>
      </Portal>
    );
  },
);
