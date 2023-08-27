import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { ImageSourcePropType } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { ContentBox, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export interface ContentProps {
  icon: ImageSourcePropType;
  name: string;
  children?: React.ReactNode;
  navigateUrl?: string;
  onPress?: () => void;
}

export const Content: React.FC<ContentProps> = ({ icon, name, children, navigateUrl, onPress }) => {
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
    <ContentBox>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.4}
        onPress={navigateUrl ? () => navigate(navigateUrl) : onPress}
      >
        <Animated.View style={[animatedStyle]}>
          <S.ContentTopSection>
            <S.ContentIconContainer>
              <WithLocalSvg width={size} height={size} asset={icon} />
              <Text size="15" fontFamily="bold">
                {name}
              </Text>
            </S.ContentIconContainer>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={navigateUrl ? () => navigate(navigateUrl) : onPress}
            >
              <MaterialIcons name="chevron-right" size={size} color={colors.placeholder} />
            </TouchableOpacity>
          </S.ContentTopSection>
        </Animated.View>
      </TouchableOpacity>
      {children}
    </ContentBox>
  );
};
