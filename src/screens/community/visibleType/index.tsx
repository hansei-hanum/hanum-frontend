import React, { useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useRecoilState } from 'recoil';

import { CreatePostSettingForm, VisibleTypeCard } from 'src/components';
import { VISIBLE_TYPE_LIST } from 'src/constants';
import { visibleTypeAtom } from 'src/atoms';
import { useFilteredVisibleType } from 'src/hooks';

export const VisibleTypeScreen: React.FC = () => {
  const { filteredVisibleType } = useFilteredVisibleType();

  const [visibleType, setVisibleType] = useRecoilState(visibleTypeAtom);

  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState(
    VISIBLE_TYPE_LIST.map((item) => item.text === visibleType),
  );

  const onPressCategory = (index: number) => {
    setSelectedCategory((prev) => prev.map((_, i) => (i === index ? true : false)));
  };

  const onComplete = () => {
    const selectedType = VISIBLE_TYPE_LIST.find((_, index) => selectedCategory[index]);
    if (selectedType) {
      setVisibleType(selectedType.text);
    }
    navigation.goBack();
  };

  return (
    <CreatePostSettingForm headerTitle="공개 범위" onButtonPress={onComplete}>
      {VISIBLE_TYPE_LIST.map((props, index) => (
        <View
          style={{
            opacity: filteredVisibleType(props.text) ? 1 : 0.3,
          }}
          key={index}
        >
          <VisibleTypeCard
            key={index}
            index={index}
            isActive={filteredVisibleType(props.text) && selectedCategory[index]}
            onOptionClick={() => filteredVisibleType(props.text) && onPressCategory(index)}
            {...props}
          />
        </View>
      ))}
    </CreatePostSettingForm>
  );
};
