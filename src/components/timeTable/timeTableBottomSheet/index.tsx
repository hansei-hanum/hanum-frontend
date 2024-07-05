import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useTheme } from '@emotion/react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Text } from 'src/components/common';
import { useGetUser, useGetTimeTable } from 'src/hooks';
import * as S from './styled';

interface TimeTableBottomSheetProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const TimeTableBottomSheet: React.FC<TimeTableBottomSheetProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const theme = useTheme();
  const { classroom, grade, department } = useGetUser();
  const { data, isLoading } = useGetTimeTable();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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

  const handleItemPress = (item: string) => {
    setSelectedItem(item);
  };

  const dummy = [
    '클라우드보안과 1학년 1반',
    '클라우드보안과 1학년 2반',
    '메타버스게임과 1학년 1반',
    '클라우드보안과 2학년 1반',
    '클라우드보안과 2학년 2반',
    '메타버스게임과 2학년 1반',
    '메타버스게임과 2학년 2반',
    '클라우드보안과 3학년 1반',
    '네트워크보안과 3학년 1반',
    '게임과 3학년 1반',
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
                  <S.BottomSheetItem
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => handleItemPress(item)}
                  >
                    <Text size={16} style={{ height: 60 }}>
                      {item}
                    </Text>
                    {selectedItem === item && (
                      <Octicons name="check" size={26} color={theme.primary} />
                    )}
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
