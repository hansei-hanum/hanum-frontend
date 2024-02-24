import React, { forwardRef, useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView, TextInput, TextInputProps } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useRecoilValue } from 'recoil';
import { useTheme } from '@emotion/react';

import { hanowlApplyAtom } from 'src/atoms';
import { AppLayout, Modal, Text } from 'src/components';
import { HANOWL_APPLY } from 'src/constants';

import * as S from './styled';

export interface ApplyDetailInputCustomProps {
  height: number;
  placeholder: string;
}

export type ApplyDetailInputProps = ApplyDetailInputCustomProps & TextInputProps;

export const ApplyDetailInput = forwardRef<TextInput, ApplyDetailInputProps>(
  ({ height, placeholder, ...props }, ref) => {
    const theme = useTheme();

    return (
      <S.ApplyDetailInput
        ref={ref}
        height={height}
        multiline={true}
        style={{ borderColor: theme.lightGray }}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholder}
        {...props}
      />
    );
  },
);
export const ApplyDetailsScreen: React.FC = () => {
  const ApplyDetailContentContainerRef = useRef<ScrollView>(null);
  const inputsRef = useRef<TextInput[]>([]);

  const hanowlApply = useRecoilValue(hanowlApplyAtom);

  const [height, setHeight] = useState<number[]>([]);

  const onInputBlur = () => {
    for (const input of inputsRef.current) {
      input.blur();
    }
  };

  const onLayout = (e: LayoutChangeEvent, index: number) => {
    const layout = e.nativeEvent.layout;
    console.log('layout', layout, layout.y);
    setHeight((prev) => {
      const newHeight = [...prev];
      newHeight[index] = layout.y;
      return newHeight;
    });
  };

  const onInputFocus = (index: number) => {
    console.log('index', height);
    ApplyDetailContentContainerRef.current?.scrollTo({ y: height[index] });
    inputsRef.current[index].focus();
  };

  return (
    <AppLayout
      headerText={`${hanowlApply.team} 지원에 필요한\n내용을 작성해 주세요`}
      bottomText="다음"
      isLoading={false}
      onPress={() => {}}
      isNotAuth
      subHeaderText={
        <TouchableWithoutFeedback onPress={onInputBlur}>
          {HANOWL_APPLY.APPLY_DETAIL_SUBTEXTS.map((item, index) => (
            <Text key={index} size={14} color="gray">
              {item}
            </Text>
          ))}
        </TouchableWithoutFeedback>
      }
    >
      <S.ApplyDetailContentContainer
        ref={ApplyDetailContentContainerRef}
        contentContainerStyle={{ rowGap: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {HANOWL_APPLY.DETAIL_CONTENTS.map(({ height, placeholder }, index) => (
          <ApplyDetailInput
            key={index}
            onLayout={(e) => onLayout(e, index)}
            onFocus={() => onInputFocus(index)}
            height={height}
            placeholder={placeholder}
            {...{ ref: (el: TextInput) => (inputsRef.current[index] = el) }}
          />
        ))}
      </S.ApplyDetailContentContainer>
    </AppLayout>
  );
};
