import React, { useRef, useState } from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { Icon, PostSettingForm, ScaleOpacity, Text } from 'src/components';
import { LIMITED_VISIBLE_TYPE_LIST, VISIBLE_TYPE_LIST } from 'src/constants/visibleType';
import { visibleTypeAtom } from 'src/atoms';

import * as S from './styled';

export const VisibleTypeScreen: React.FC = () => {
  const [visibleType, setVisibleType] = useRecoilState(visibleTypeAtom);

  const navigation = useNavigation();

  const theme = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [selectedType, setSelectedType] = useState(
    VISIBLE_TYPE_LIST.map((_, i) =>
      (visibleType === 'ALL' ? i === 0 : visibleType === 'STUDENT' ? i === 1 : i === 2)
        ? true
        : false,
    ),
  );

  const [limitedSelectedType, setLimitedSelectedType] = useState(
    LIMITED_VISIBLE_TYPE_LIST.map((_, i) => (i === 0 ? true : false)),
  );

  const onPressVisibleType = (index: number) => {
    setSelectedType((prev) => prev.map((_, i) => (i === index ? true : false)));
    Animated.timing(fadeAnim, {
      toValue: index === 2 ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressLimitedVisibleType = (index: number) => {
    setLimitedSelectedType((prev) => prev.map((_, i) => (i === index ? true : false)));
  };

  return (
    <PostSettingForm
      headerTitle="공개 범위"
      onButtonPress={() => {
        navigation.goBack();
        setVisibleType(selectedType[0] ? 'ALL' : selectedType[1] ? 'STUDENT' : 'LIMITED');
      }}
    >
      {VISIBLE_TYPE_LIST.map(({ icon, text }, index) => (
        <ScaleOpacity onPress={() => onPressVisibleType(index)}>
          <S.VisibleTypeListContainer>
            <S.VisibleTypeList>
              <Icon icon={icon} size={34} includeBackground={false} />
              <Text size={18}>{text}</Text>
            </S.VisibleTypeList>
            <MCI
              name={selectedType[index] ? 'circle-slice-8' : 'circle-outline'}
              size={30}
              color={selectedType[index] ? theme.primary : theme.placeholder}
            />
          </S.VisibleTypeListContainer>
        </ScaleOpacity>
      ))}
      <S.VisibleTypeBoxContainer style={{ opacity: fadeAnim }}>
        {LIMITED_VISIBLE_TYPE_LIST.map((item, index) => (
          <S.VisibleTypeLimitContainer>
            <Text size={18}>{item}</Text>
            <Switch
              style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
              trackColor={{ false: theme.lightGray, true: theme.primary }}
              thumbColor={limitedSelectedType[index] ? theme.white : theme.white}
              ios_backgroundColor={theme.lightGray}
              onValueChange={() => onPressLimitedVisibleType(index)}
              value={limitedSelectedType[index]}
            />
          </S.VisibleTypeLimitContainer>
        ))}
      </S.VisibleTypeBoxContainer>
    </PostSettingForm>
  );
};
