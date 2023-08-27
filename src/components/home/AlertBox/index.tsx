import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ContentBox, Text } from 'src/components';
import { colors } from 'src/styles';

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

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 50 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.4}
      onPress={() => navigate(navigateUrl)}
    >
      <Animated.View style={[animatedStyle]}>
        <ContentBox>
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
        </ContentBox>
      </Animated.View>
    </TouchableOpacity>
  );
};
