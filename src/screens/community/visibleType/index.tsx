import React, { useRef, useState } from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated, Switch } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { Icon, PostSettingForm, ScaleOpacity, Text } from 'src/components';
import { LIMITED_VISIBLE_TYPE_LIST, VISIBLE_TYPE_LIST, VisibleTypeItems } from 'src/constants';
import { visibleTypeAtom } from 'src/atoms';

import * as S from './styled';

type ActiveOptionState = { [key in VisibleTypeItems['text']]?: string };

export const VisibleTypeScreen: React.FC = () => {
  const [visibleType, setVisibleType] = useRecoilState(visibleTypeAtom);

  const navigation = useNavigation();

  const theme = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [activeOption, setActiveOption] = useState<ActiveOptionState>(() => {
    const initialState: ActiveOptionState = {};
    VISIBLE_TYPE_LIST.filter(({ text }) => {
      initialState[text] = visibleType === text ? text : '';
    });
    return initialState;
  });

  const onOptionClick = (index: number) => {
    const option = VISIBLE_TYPE_LIST[index].text;
    setActiveOption({ [option]: option });
    setVisibleType(option);
    Animated.timing(fadeAnim, {
      toValue: index === 2 ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const [limitedSelectedType, setLimitedSelectedType] = useState(
    LIMITED_VISIBLE_TYPE_LIST.map((_, i) => (i === 0 ? true : false)),
  );

  const onPressLimitedVisibleType = (index: number) => {
    setLimitedSelectedType((prev) => prev.map((_, i) => (i === index ? true : false)));
  };

  return (
    <PostSettingForm
      headerTitle="공개 범위"
      onButtonPress={() => {
        navigation.goBack();
      }}
    >
      {VISIBLE_TYPE_LIST.map(({ icon, text }, index) => (
        <ScaleOpacity onPress={() => onOptionClick(index)}>
          <S.VisibleTypeListContainer>
            <S.VisibleTypeList>
              <Icon icon={icon} size={34} includeBackground={false} />
              <Text size={18}>{text}</Text>
            </S.VisibleTypeList>
            <MCI
              name={activeOption[text] ? 'circle-slice-8' : 'circle-outline'}
              size={30}
              color={activeOption[text] ? theme.primary : theme.placeholder}
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
