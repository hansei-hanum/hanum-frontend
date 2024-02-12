import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { Animated } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { AnonymitySettingsCard, PostSettingForm } from 'src/components';
import { ANONYMITY_OPTION_LIST } from 'src/constants';
import { isIos } from 'src/utils';
import { fonts } from 'src/styles';
import { anonymityTypeAtom } from 'src/atoms';

import * as S from './styled';

export type AnonymityActiveOptionType = { [key in string]?: string };

export const AnonymitySettingsScreen: React.FC = () => {
  const [anonymityType, setAnonymityType] = useRecoilState(anonymityTypeAtom);

  const navigation = useNavigation();

  const theme = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [nickname, setNickname] = useState<string>('');

  const [activeOption, setActiveOption] = useState<AnonymityActiveOptionType>(() => {
    const initialState: AnonymityActiveOptionType = {};
    ANONYMITY_OPTION_LIST.filter(({ title }) => {
      initialState[title] = anonymityType === title ? title : '';
    });
    return initialState;
  });

  const onPressVisibleType = (index: number) => {
    const option = ANONYMITY_OPTION_LIST[index].title;
    setActiveOption((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as AnonymityActiveOptionType);
      newState[option] = option;
      return newState;
    });
    textInputAnimation(index === 2 ? 1 : 0);
  };

  const onChangeText = (text: string) => {
    setNickname(text);
  };

  const textInputAnimation = (value: number) => {
    Animated.timing(fadeAnim, {
      toValue: value,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const isFocused = useIsFocused();

  const onComplete = () => {
    const type = Object.entries(activeOption).find(([key, value]) => value !== '');
    type && setAnonymityType(type[0]);

    navigation.goBack();
  };

  useEffect(() => {
    if (isFocused && anonymityType === ANONYMITY_OPTION_LIST[2].title) {
      textInputAnimation(1);
    }
  }, [anonymityType, isFocused]);

  return (
    <PostSettingForm
      keyboardAvoidingViewEnabled={isIos}
      headerTitle="익명성 설정"
      onButtonPress={onComplete}
    >
      <S.AnonymitySettingsContainer>
        {ANONYMITY_OPTION_LIST.map((props, index) => (
          <AnonymitySettingsCard
            index={index}
            activeOption={activeOption}
            onPressVisibleType={onPressVisibleType}
            {...props}
            key={index}
          />
        ))}
      </S.AnonymitySettingsContainer>
      <S.AnonymityNicknameWrapper style={{ opacity: fadeAnim }}>
        <TextInput
          placeholder="사용할 닉네임을 입력하세요"
          placeholderTextColor={theme.placeholder}
          value={nickname}
          onChangeText={onChangeText}
          style={{ color: theme.default, fontFamily: fonts.medium, padding: isIos ? 14 : 8 }}
        />
      </S.AnonymityNicknameWrapper>
    </PostSettingForm>
  );
};
