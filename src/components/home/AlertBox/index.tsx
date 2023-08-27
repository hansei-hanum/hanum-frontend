import React, { useState } from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { Animated, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Easing } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Text } from 'src/components';
import { colors } from 'src/styles';
import { boxShadow } from 'src/constant';

import * as S from './styled';

export interface AlertBoxProps {
  icon: ImageSourcePropType;
  subText: string;
  mainText: string;
  navigateUrl: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ icon, subText, mainText, navigateUrl }) => {
  const navigate = useNavigation().navigate as (screen: string) => void;
  const size = 30;

  const [animation] = useState(new Animated.Value(1)); // 애니메이션 값 초기화

  const handlePressIn = () => {
    // 버튼을 누를 때 작아지는 애니메이션 적용
    Animated.timing(animation, {
      toValue: 0.96, // 작아지는 정도
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    // 버튼을 뗄 때 복귀하는 애니메이션 적용
    Animated.timing(animation, {
      toValue: 1, // 원래 크기로 복귀
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  // 애니메이션 값을 스타일에 적용
  const animatedStyle = {
    transform: [{ scale: animation }],
    backgroundColor: animation.interpolate({
      inputRange: [0.96, 1], // 작아진 상태와 원래 크기의 중간 값
      outputRange: [colors.lightGray, colors.white], // 해당 범위에 따른 색깔 변화
    }),
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      onPress={() => navigate(navigateUrl)}
    >
      <S.AlertBoxWrapper style={[animatedStyle, boxShadow]}>
        <S.AlertBoxContainer>
          <S.AlertBoxContentContainer>
            <WithLocalSvg width={size} height={size} asset={icon} />
            <S.AlertBoxTextContainer>
              <Text size="15" fontFamily="bold" color={colors.placeholder}>
                {subText}
              </Text>
              <Text size="17" fontFamily="bold">
                {mainText}
              </Text>
            </S.AlertBoxTextContainer>
          </S.AlertBoxContentContainer>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigate(navigateUrl)}>
            <MaterialIcons name="chevron-right" size={size} color={colors.placeholder} />
          </TouchableOpacity>
        </S.AlertBoxContainer>
      </S.AlertBoxWrapper>
    </TouchableOpacity>
  );
};
