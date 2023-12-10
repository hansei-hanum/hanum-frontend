import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import MaskedView from '@react-native-masked-view/masked-view';

import { Theme } from '@emotion/react';

import { RPH, RPW } from 'src/utils';
import { Text } from 'src/components';
import { usePressingAnimation } from 'src/hooks';
import { BottomSheetRefProps } from 'src/types';
import { COMPLETE_WINDOW_CONTENT_LIST } from 'src/constants';

import * as S from './styled';

export interface ReportCompleteProps {
  reportScreenAnimationValue: Animated.Value;
  theme: Theme;
  reportBottomSheetRef: React.RefObject<BottomSheetRefProps>;
  setReportWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReportCompleteWindow: React.FC<ReportCompleteProps> = ({
  reportScreenAnimationValue,
  reportBottomSheetRef,
  theme,
  setReportWindowOpen,
}) => {
  const { handlePressIn, handlePressOut, scaleAnimatedStyle } = usePressingAnimation();

  const size = RPW(18);
  return (
    <S.CompleteWindowContainer
      style={{
        transform: [{ translateX: reportScreenAnimationValue }],
        backgroundColor: theme.background,
      }}
    >
      <S.CompleteWindowHeader>
        <MaskedView
          style={{ width: size, flexDirection: 'row', height: size }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="checkmark-circle-outline" size={size} color="white" />
            </View>
          }
        >
          <LinearGradient colors={theme.primaryLinear} style={{ flex: 1 }} />
        </MaskedView>
        <Text size={22} fontFamily="bold" color={theme.default}>
          알려주셔서 고맙습니다
        </Text>
        <Text size={14} fontFamily="medium" color={theme.placeholder}>
          신고 용도:
        </Text>
      </S.CompleteWindowHeader>
      <S.CompleteWindowContentContainer>
        {COMPLETE_WINDOW_CONTENT_LIST.map(({ icon, text }) => (
          <S.CompleteWindowContent key={text}>
            <Icon name={icon} size={30} color={theme.default} />
            <Text size={14} color={theme.default}>
              {text}
            </Text>
          </S.CompleteWindowContent>
        ))}
      </S.CompleteWindowContentContainer>
      <TouchableOpacity
        onPress={() => {
          setReportWindowOpen(false);
          reportBottomSheetRef.current?.scrollTo(0);
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          ...scaleAnimatedStyle,
          width: '100%',
          position: 'absolute',
          bottom: RPH(48),
        }}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={theme.primaryLinear}
          style={{
            width: '100%',
            borderRadius: 10,
            paddingVertical: 14,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 6,
          }}
        >
          <Text size={16} isCenter color={theme.default}>
            확인
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </S.CompleteWindowContainer>
  );
};
