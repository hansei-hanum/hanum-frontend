import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useRecoilState } from 'recoil';

import { CreatePostSettingForm, VisibleTypeCard } from 'src/components';
import { VISIBLE_TYPE_LIST } from 'src/constants';
import { visibleTypeAtom } from 'src/atoms';

export const VisibleTypeScreen: React.FC = () => {
  const [visibleType, setVisibleType] = useRecoilState(visibleTypeAtom);

  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState(
    VISIBLE_TYPE_LIST.map((text) => text.text === visibleType),
  );
  console.log(selectedCategory, 'selectedCategory');
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
        <VisibleTypeCard
          key={index}
          index={index}
          isActive={selectedCategory[index]}
          onOptionClick={() => onPressCategory(index)}
          {...props}
        />
      ))}
    </CreatePostSettingForm>
  );
};
