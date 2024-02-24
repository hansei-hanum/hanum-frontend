import React, { useState } from 'react';
import { View } from 'react-native';

import { useRecoilState } from 'recoil';

import { hanowlApplyAtom, isDisableAtom } from 'src/atoms';
import { AppLayout, ApplyInput, Text } from 'src/components';
import { HANOWL_APPLY } from 'src/constants';

export const ApplyContentsScreen: React.FC = () => {
  const [isDisabled, setIsDisabled] = useRecoilState(isDisableAtom);
  const [hanowlApply, setHanowlApply] = useRecoilState(hanowlApplyAtom);

  const [value, setValue] = useState<string[]>(['', '', '']);

  const onChange = (text: string, index: number) => {
    const newValue = [...value];
    newValue[index] = text;
    setValue(newValue);
    setIsDisabled(newValue.some((item) => item === ''));
  };

  return (
    <AppLayout
      headerText={`${hanowlApply.team} 지원에 필요한\n내용을 작성해 주세요`}
      bottomText="다음"
      isLoading={false}
      onPress={() => {
        const [introduce, motive, aspiration] = value;
        setHanowlApply((prev) => ({
          ...prev,
          introduce,
          motive,
          aspiration,
        }));
      }}
      scrollEnabled
      isDisabled={isDisabled}
      subHeaderText={
        <View>
          {HANOWL_APPLY.APPLY_DETAIL_SUBTEXTS.map((item, index) => (
            <Text key={index} size={14} color="gray">
              {item}
            </Text>
          ))}
        </View>
      }
    >
      {HANOWL_APPLY.DETAIL_CONTENTS.map(({ height, placeholder }, index) => (
        <ApplyInput
          key={index}
          height={height}
          placeholder={placeholder}
          value={value[index]}
          onChangeText={(text) => onChange(text, index)}
        />
      ))}
    </AppLayout>
  );
};
