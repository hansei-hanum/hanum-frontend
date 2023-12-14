import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, TextInput } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@emotion/react';

import { Button, CommunityHeader, Icon, ScaleOpacity, Text } from 'src/components';
import { ANONYMITY_OPTION_LIST } from 'src/constants';

import * as S from './styled';

export const AnonymitySettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const theme = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [text, setText] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState(
    ANONYMITY_OPTION_LIST.map((_, i) => (i === 0 ? true : false)),
  );

  const onPressVisibleType = (index: number) => {
    setSelectedOption((prev) => prev.map((_, i) => (i === index ? true : false)));
    Animated.timing(fadeAnim, {
      toValue: index === 2 ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onChangeText = (text: string) => {
    setText(text);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommunityHeader title="공개 범위" />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <S.VisibleTypeWrapper>
          <S.VisibleTypeContainer>
            {ANONYMITY_OPTION_LIST.map(({ icon, title, description }, index) => (
              <ScaleOpacity onPress={() => onPressVisibleType(index)}>
                <S.VisibleTypeListContainer>
                  <S.VisibleTypeList>
                    <Icon icon={icon} size={34} includeBackground={false} />
                    <Text.Column>
                      <Text size={18}>{title}</Text>
                      <Text size={15}>{description}</Text>
                    </Text.Column>
                  </S.VisibleTypeList>
                  <MCI
                    name={selectedOption[index] ? 'circle-slice-8' : 'circle-outline'}
                    size={30}
                    color={selectedOption[index] ? theme.primary : theme.placeholder}
                  />
                </S.VisibleTypeListContainer>
              </ScaleOpacity>
            ))}
            <S.VisibleTypeBoxContainer style={{ opacity: fadeAnim }}>
              <TextInput
                placeholder="사용할 닉네임을 입력하세요"
                placeholderTextColor={theme.placeholder}
                value={text}
                onChangeText={onChangeText}
                style={{ color: theme.default }}
              />
            </S.VisibleTypeBoxContainer>
          </S.VisibleTypeContainer>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
          >
            완료
          </Button>
        </S.VisibleTypeWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
