import React, { useEffect, useRef, useState } from 'react';
import { Animated, Switch } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { PostSettingForm, Text, VisibleTypeCard } from 'src/components';
import { LIMITED_VISIBLE_TYPE_LIST, VISIBLE_TYPE_LIST, VisibleTypeItems } from 'src/constants';
import { visibleTypeAtom } from 'src/atoms';
import { useSetAnimation } from 'src/hooks';

import * as S from './styled';

export type VisibleActiveOptionType = { [key in VisibleTypeItems['text'] | string]?: string };

export const VisibleTypeScreen: React.FC = () => {
  const { animation } = useSetAnimation();

  const [visibleType, setVisibleType] = useRecoilState(visibleTypeAtom);

  const navigation = useNavigation();

  const theme = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [activeOption, setActiveOption] = useState<VisibleActiveOptionType>(() => {
    const initialState: VisibleActiveOptionType = {};
    VISIBLE_TYPE_LIST.filter(({ text }) => {
      initialState[text] = visibleType.text === text ? text : '';
    });
    return initialState;
  });

  const onOptionClick = (index: number) => {
    const option = VISIBLE_TYPE_LIST[index].text;
    setActiveOption((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as VisibleActiveOptionType);
      newState[option] = option;
      return newState;
    });
    animation({ animation: fadeAnim, value: index === 2 ? 1 : 0 });
  };

  const [limitedSelectedType, setLimitedSelectedType] = useState(
    LIMITED_VISIBLE_TYPE_LIST.map((item) => (item === visibleType.limitType ? true : false)),
  );

  const onPressLimitedVisibleType = (index: number) => {
    setLimitedSelectedType((prev) => prev.map((_, i) => (i === index ? true : false)));
  };

  const onComplete = () => {
    const type = Object.entries(activeOption).find(([key, value]) => value !== '');
    type &&
      setVisibleType({
        text: type[0] as VisibleTypeItems['text'],
        limitType: LIMITED_VISIBLE_TYPE_LIST.filter((_, i) => limitedSelectedType[i]).toString(),
      });

    navigation.goBack();
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && visibleType.text === VISIBLE_TYPE_LIST[2].text) {
      animation({ animation: fadeAnim, value: 1 });
    }
  }, [visibleType, isFocused]);

  return (
    <PostSettingForm headerTitle="공개 범위" onButtonPress={onComplete}>
      {VISIBLE_TYPE_LIST.map((props, index) => (
        <VisibleTypeCard
          key={index}
          index={index}
          activeOption={activeOption}
          onOptionClick={onOptionClick}
          {...props}
        />
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
