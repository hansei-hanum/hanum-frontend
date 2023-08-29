import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Text } from 'src/components';
import { SHOW_MORE_SECTION_LIST } from 'src/constants/showMore';
import { colors } from 'src/styles';
import { usePressingAnimation } from 'src/hooks';

import * as S from './styled';

export const Section: React.FC = () => {
  const navigate = useNavigation().navigate as (screen: string) => void;

  const SectionItem: React.FC<{ name: string; icon: string; navigateUrl: string }> = ({
    name,
    icon,
    navigateUrl,
  }) => {
    const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();

    return (
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        onPress={() => navigate(navigateUrl)}
      >
        <S.SectionItem style={[animatedStyle]}>
          <S.SectionIconContainer>
            <S.SectionIconWrapper>
              <Text key={name} size="30" fontFamily="tossIcon">
                {icon}
              </Text>
            </S.SectionIconWrapper>
            <Text key={name} size="16">
              {name}
            </Text>
          </S.SectionIconContainer>
          <MaterialIcons name="chevron-right" size={30} color={colors.placeholder} />
        </S.SectionItem>
      </TouchableOpacity>
    );
  };

  return (
    <S.SectionContainer>
      {SHOW_MORE_SECTION_LIST.map(({ name, section }) => (
        <S.Section key={name}>
          <Text size="18" fontFamily="bold">
            {name}
          </Text>
          {section.map(({ name, icon, navigateUrl }) => (
            <SectionItem key={name} name={name} icon={icon} navigateUrl={navigateUrl} />
          ))}
        </S.Section>
      ))}
    </S.SectionContainer>
  );
};
