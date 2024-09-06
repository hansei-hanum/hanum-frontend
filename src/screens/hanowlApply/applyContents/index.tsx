import React, { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { hanowlApplyAtom, isDisableAtom } from 'src/atoms';
import { AppLayout, ApplyInput, Text } from 'src/components';
import { HANOWL_APPLY } from 'src/constants';
import { useBlockGesture, useNavigate } from 'src/hooks';

export const ApplyContentsScreen: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const scrollViewRef = useRef<ScrollView>(null);

  const [isDisabled, setIsDisabled] = useRecoilState(isDisableAtom);
  const [hanowlApply, setHanowlApply] = useRecoilState(hanowlApplyAtom);

  const [value, setValue] = useState<string[]>(['', '', '']);
  const [height, setHeight] = useState<number[]>([]);

  const onChange = (text: string, index: number) => {
    const newValue = [...value];
    newValue[index] = text;
    setValue(newValue);
    setIsDisabled(newValue.some((item) => item.length < 10));
  };

  const onLayout = (e: LayoutChangeEvent, index: number) => {
    const { height: layoutHeight } = e.nativeEvent.layout;
    const newHeight = [...height];
    newHeight[index] = layoutHeight;
    setHeight(newHeight);
  };

  const onFocused = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: height.slice(0, index).reduce((acc, cur) => acc + cur, height[index] / 2),
      });
    }
  };

  const onPressSubmitButton = () => {
    const [introduce, motive, aspiration] = value;
    setHanowlApply((prev) => ({
      ...prev,
      introduce,
      motive,
      aspiration,
    }));
    navigate('HanowlFinalConfirm');
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && hanowlApply.aspiration && hanowlApply.introduce && hanowlApply.motive) {
      setValue([hanowlApply.introduce, hanowlApply.motive, hanowlApply.aspiration]);
      setIsDisabled(false);
    }
  }, [isFocused]);

  useBlockGesture(true);

  return (
    <AppLayout
      headerText={`${hanowlApply.team.name} 지원에 필요한\n내용을 작성해 주세요`}
      bottomText="다음"
      withScrollView
      isDisabled={isDisabled}
      scrollViewRef={scrollViewRef}
      subHeaderText={
        <View>
          {HANOWL_APPLY.CONTENT_SUBTEXTS.map((item, index) => (
            <Text key={index} size={14} color={theme.placeholder}>
              {item}
            </Text>
          ))}
          <Text size={14} color={theme.danger}>
            이 페이지를 벗어나면 작성한 모든 내용이 사라져요.
          </Text>
        </View>
      }
      onPress={onPressSubmitButton}
    >
      {HANOWL_APPLY.CONTENTS.map(({ height, placeholder }, index) => (
        <ApplyInput
          key={index}
          height={height}
          placeholder={placeholder}
          value={value[index]}
          onChangeText={(text) => onChange(text, index)}
          onLayout={(e) => onLayout(e, index)}
          onFocus={() => onFocused(index)}
          maxLength={500}
        />
      ))}
    </AppLayout>
  );
};
