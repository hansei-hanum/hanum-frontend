import React, { useEffect, useRef } from 'react';
import { Modal, Animated, TouchableWithoutFeedback, PanResponder, Dimensions } from 'react-native';

import { Text } from 'src/components/common';

import * as S from './styled';

interface TimeTableBottomSheetProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const TimeTableBottomSheet: React.FC<TimeTableBottomSheetProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const translateY = panY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [0, screenHeight],
    extrapolate: 'clamp',
  });

  const openBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const fadeOutOverlay = Animated.timing(opacity, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const handlePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: panY }], { useNativeDriver: false }),
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 50) {
          // Adjust the threshold as needed
          closeModal();
        } else {
          openBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        openBottomSheet,
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    Animated.parallel([fadeOutOverlay, closeBottomSheet]).start(() => {
      setModalVisible(false);
      panY.setValue(screenHeight);
      opacity.setValue(1);
    });
  };

  const a = [
    '클라우드보안과 1학년 10반',
    '클라우드보안과 1학년 10반',
    '클라우드보안과 2학년 10반',
    '클라우드보안과 2학년 10반',
    '클라우드보안과 2학년 10반',
    '클라우드보안과 2학년 10반',
    '클라우드보안과 2학년 10반',
  ];

  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent statusBarTranslucent>
      <TouchableWithoutFeedback onPress={closeModal}>
        <S.Overlay style={{ opacity }}>
          <S.BottomSheetContainer style={{ transform: [{ translateY: translateY }] }}>
            <S.BottomSheetHandle {...handlePanResponder.panHandlers} />
            <S.BottomSheetItemContainer>
              <S.StyledScrollView>
                {a.map((item, index) => {
                  return (
                    <S.BottomSheetItem key={index} activeOpacity={0.8}>
                      <Text size={16} style={{ height: 60 }}>
                        {item}
                      </Text>
                    </S.BottomSheetItem>
                  );
                })}
              </S.StyledScrollView>
            </S.BottomSheetItemContainer>
          </S.BottomSheetContainer>
        </S.Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
