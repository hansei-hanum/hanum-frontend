import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { Icon, Text } from 'src/components';
import { boxShadow } from 'src/constants';
import { useNavigate, usePressingAnimation } from 'src/hooks';
import { themeAtom } from 'src/atoms';
import { RootStackParamList } from 'src/types';

import * as S from './styled';

export interface AlertBoxProps {
  icon: string;
  subText: string;
  mainText: string;
  navigateUrl: keyof RootStackParamList;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ icon, subText, mainText, navigateUrl }) => {
  const themeValue = useRecoilValue(themeAtom);

  const theme = useTheme();

  const navigation = useNavigate();
  const size = 30;

  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      onPress={() => navigation(navigateUrl)}
    >
      <S.AlertBoxWrapper
        style={[
          animatedStyle,
          themeValue === 'dark' ? { backgroundColor: theme.modalBg } : boxShadow,
        ]}
      >
        <S.AlertBoxContainer>
          <S.AlertBoxContentContainer>
            <Icon icon={icon} includeBackground={false} />
            <S.AlertBoxTextContainer>
              <Text size={13} fontFamily="medium" color={theme.placeholder}>
                {subText}
              </Text>
              <Text size={15} fontFamily="bold">
                {mainText}
              </Text>
            </S.AlertBoxTextContainer>
          </S.AlertBoxContentContainer>
          <MaterialIcons name="chevron-right" size={size} color={theme.placeholder} />
        </S.AlertBoxContainer>
      </S.AlertBoxWrapper>
    </TouchableOpacity>
  );
};
