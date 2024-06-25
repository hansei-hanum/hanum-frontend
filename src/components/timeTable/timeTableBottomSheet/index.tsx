import React, { useEffect, useRef } from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  Dimensions,
  ScrollView,
} from 'react-native';

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
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 50) {
          closeModal();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
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

  const dummy = [
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
            <Animated.View
              style={{ width: '100%', height: 30 }}
              {...handlePanResponder.panHandlers}
            >
              <S.BottomSheetHandle />
            </Animated.View>
            <S.BottomSheetItemContainer>
              <ScrollView>
                {dummy.map((item, index) => (
                  <S.BottomSheetItem key={index} activeOpacity={0.8}>
                    <Text size={16} style={{ height: 60 }}>
                      {item}
                    </Text>
                  </S.BottomSheetItem>
                ))}
              </ScrollView>
            </S.BottomSheetItemContainer>
          </S.BottomSheetContainer>
        </S.Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
