import React from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Theme } from '@emotion/react';

import { RPW } from 'src/utils';
import { Text } from 'src/components';
import { usePressingAnimation } from 'src/hooks';
import { BottomSheetRefProps } from 'src/types';

import * as S from './styled';

export interface ReportCompleteProps {
  reportScreenAnimationValue: Animated.Value;
  theme: Theme;
  reportBottomSheetRef: React.RefObject<BottomSheetRefProps>;
  setReportWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reportWindowHeight: number;
}

export const ReportCompleteWindow: React.FC<ReportCompleteProps> = ({
  reportScreenAnimationValue,
  reportBottomSheetRef,
  theme,
  setReportWindowOpen,
  reportWindowHeight,
}) => {
  const { handlePressIn, handlePressOut, scaleAnimatedStyle } = usePressingAnimation();

  return (
    <S.CompleteWindowContainer
      style={{
        transform: [{ translateX: reportScreenAnimationValue }],
        backgroundColor: theme.background,
      }}
    >
      <S.CompleteWindowHeader>
        <Icon name="checkmark-circle-outline" size={RPW(18)} color={theme.primary} />
        <Text size={22} fontFamily="bold" color={theme.default} isCenter>
          신고가 완료됐어요
        </Text>
        <Text size={14} color={theme.placeholder} isCenter>
          신고가 처리되면 처리 결과를 알려드릴게요.{'\n'}이 사용자의 게시글이 불쾌할 경우 차단할 수
          있어요.
        </Text>
      </S.CompleteWindowHeader>
      <S.CompleteWindowButtonContainer
        onPress={() => {
          setReportWindowOpen(false);
          reportBottomSheetRef.current?.scrollTo(0);
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          ...scaleAnimatedStyle,
          backgroundColor: theme.primary,
          position: 'absolute',
          top: -reportWindowHeight - 140,
        }}
        activeOpacity={0.8}
      >
        <Text size={16} isCenter color={theme.white}>
          확인
        </Text>
      </S.CompleteWindowButtonContainer>
    </S.CompleteWindowContainer>
  );
};
